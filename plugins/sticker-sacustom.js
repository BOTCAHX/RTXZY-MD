import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { proto } from '../lib/simple.js'
import { addExif } from '../lib/sticker.js'

const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg'
const SESSION_TIMEOUT = 30_000 // 30 detik
const AUDIO_LIMIT = 10
const VIDEO_LIMIT = 10
const WEBP_LIMIT = 1024 * 1024
const SCRATCH_DIR = path.join(process.cwd(), 'tmp', 'sacustom')
const OPUS_MIME = 'audio/ogg; codecs=opus'
const WEBP_MIME = 'image/webp'
const PAD_FILTER = 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000'
const OPUS_ARGS = [
  '-vn',
  '-map_metadata', '-1',
  '-c:a', 'libopus',
  '-b:a', '64k',
  '-ar', '48000',
  '-ac', '1',
  '-f', 'ogg'
]

const store = (conn) => (conn.sacustom = conn.sacustom && typeof conn.sacustom === 'object' ? conn.sacustom : {})

const cleanup = (conn, key) => {
  const s = conn.sacustom?.[key]
  if (!s) return
  if (s.timeout) clearTimeout(s.timeout)
  delete conn.sacustom[key]
}

const arm = (conn, key, chatId, ms, note) => {
  const s = conn.sacustom[key]
  if (s.timeout) clearTimeout(s.timeout)
  s.timeout = setTimeout(() => {
    if (!conn.sacustom?.[key]) return
    delete conn.sacustom[key]
    conn.reply(chatId, note)
  }, ms)
}

function varint(value) {
  const bytes = []
  let rest = value
  do {
    const chunk = rest & 0x7f
    rest = Math.floor(rest / 128)
    bytes.push(rest ? chunk | 0x80 : chunk)
  } while (rest)
  return bytes
}

function lengthDelimited(id, payload) {
  return Uint8Array.from([...varint((id << 3) | 2), ...varint(payload.length), ...payload])
}

function transcode(source, recipe, extension, timeout = 30000) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true })
  const tag = randomUUID()
  const inFile = path.join(SCRATCH_DIR, `${tag}.src`)
  const outFile = path.join(SCRATCH_DIR, `${tag}.${extension}`)
  fs.writeFileSync(inFile, source)

  return new Promise((resolve, reject) => {
    const worker = spawn(FFMPEG, [
      '-hide_banner', '-loglevel', 'error', '-nostdin', '-y',
      '-threads', '1',
      '-i', inFile,
      ...recipe,
      outFile
    ])

    let log = ''
    let settled = false
    let guard

    const settle = (error, output) => {
      if (settled) return
      settled = true
      clearTimeout(guard)
      for (const file of [inFile, outFile]) {
        try { fs.unlinkSync(file) } catch {}
      }
      if (error) reject(error)
      else resolve(output)
    }

    guard = setTimeout(() => {
      try { worker.kill('SIGKILL') } catch {}
    }, timeout)

    worker.stderr?.on('data', (chunk) => { log += chunk.toString() })
    worker.once('error', (error) => settle(error))
    worker.once('close', (code) => {
      if (code !== 0) {
        const tail = log.trim().slice(-180)
        return settle(new Error(`ffmpeg exit ${code}${tail ? ': ' + tail : ''}`))
      }
      try {
        if (!fs.existsSync(outFile)) return settle(new Error('ffmpeg tidak menghasilkan berkas'))
        settle(null, fs.readFileSync(outFile))
      } catch (error) {
        settle(error)
      }
    })
  })
}

const toOpus = (source) => transcode(source, ['-t', String(AUDIO_LIMIT), ...OPUS_ARGS], 'ogg')

const toStill = (source) => transcode(source, [
  '-frames:v', '1',
  '-vf', `format=rgba,${PAD_FILTER}`,
  '-c:v', 'libwebp',
  '-lossless', '0',
  '-q:v', '80',
  '-f', 'webp'
], 'webp')

const toMotion = (source, quality, fps) => transcode(source, [
  '-t', String(VIDEO_LIMIT),
  '-fs', '0.7M',
  '-an',
  '-vf', `fps=${fps},${PAD_FILTER},format=yuva420p`,
  '-c:v', 'libwebp',
  '-lossless', '0',
  '-q:v', String(quality),
  '-loop', '0',
  '-f', 'webp'
], 'webp', 45000)

function looksWebp(buffer) {
  return Buffer.isBuffer(buffer) &&
    buffer.length > 29 &&
    buffer.toString('latin1', 0, 4) === 'RIFF' &&
    buffer.toString('latin1', 8, 12) === 'WEBP'
}

function inspectWebp(buffer) {
  if (!looksWebp(buffer)) throw new Error('Hasil konversi bukan WebP yang sah')
  switch (buffer.toString('latin1', 12, 16)) {
    case 'VP8 ':
      return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff, animated: false }
    case 'VP8L':
      return {
        width: 1 + (buffer[21] | ((buffer[22] & 0x3f) << 8)),
        height: 1 + ((buffer[22] >> 6) | (buffer[23] << 2) | ((buffer[24] & 0x0f) << 10)),
        animated: false
      }
    case 'VP8X':
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
        animated: (buffer[20] & 2) !== 0
      }
    default:
      throw new Error('Chunk WebP tidak dikenali')
  }
}

async function stampExif(buffer) {
  try {
    if (!looksWebp(buffer)) return buffer
    const stamped = await addExif(buffer, global.packname, global.author)
    return looksWebp(stamped) ? stamped : buffer
  } catch {
    return buffer
  }
}

async function buildVisualSticker(source, kind) {
  const raw = Buffer.from(source)

  if (kind === 'sticker') {
    const bytes = await stampExif(raw)
    return { bytes, meta: inspectWebp(bytes) }
  }

  if (kind === 'video') {
    let bytes = await stampExif(await toMotion(raw, 50, 10))
    if (bytes.length > WEBP_LIMIT) {
      const lean = await toMotion(raw, 35, 8)
      const stamped = await stampExif(lean)
      bytes = stamped.length <= WEBP_LIMIT ? stamped : lean
    }
    return { bytes, meta: inspectWebp(bytes) }
  }

  const base = looksWebp(raw) ? raw : await toStill(raw)
  const bytes = await stampExif(base)
  return { bytes, meta: inspectWebp(bytes) }
}

async function deliverStickerAudio(conn, chat, origin, sticker) {
  const bridge = conn._client
  const [sound, visual] = await Promise.all([
    bridge.message.upload(sticker.track, { type: 'audio' }),
    bridge.message.upload(sticker.bytes, { type: 'image' })
  ])

  const soundMessage = proto.Message.AudioMessage.encode({
    ...sound,
    mimetype: OPUS_MIME,
    ptt: true
  }).finish()

  await conn.sendMessage(chat, {
    stickerMessage: {
      ...visual,
      mimetype: WEBP_MIME,
      width: sticker.meta.width,
      height: sticker.meta.height,
      isAnimated: sticker.meta.animated,
      $unknowns: [lengthDelimited(26, soundMessage)]
    }
  }, { quoted: origin })
}

function getVisualMedia(m) {
  const source = m.quoted ? m.quoted : m
  const payload = source.msg || source
  const mime = payload.mimetype || ''
  const mtype = source.mtype || ''

  if (mtype === 'stickerMessage' || mime.includes('webp')) return { source, kind: 'sticker', payload }
  if (mtype === 'videoMessage' || mime.startsWith('video/')) return { source, kind: 'video', payload }
  if (mtype === 'imageMessage' || mime.startsWith('image/')) return { source, kind: 'image', payload }
  return { source: null, kind: null, payload }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  store(conn)
  const key = `${m.chat}:${m.sender}`
  const px = usedPrefix + command
  const opt = String(text || '').trim().toLowerCase()

  if (['batal', 'reset', 'cancel'].includes(opt)) {
    if (!conn.sacustom[key]) return m.reply('Tidak ada sesi stiker audio custom yang aktif.')
    cleanup(conn, key)
    return m.reply('✅ Sesi stiker audio custom berhasil dibatalkan.')
  }

  const { source, kind, payload } = getVisualMedia(m)

  if (!kind) {
    return m.reply(
      `*Cara pakai ${px}:*\n` +
      `1. Kirim atau balas *gambar / stiker / video* dengan caption *${px}*\n` +
      `2. Kirim file *audio* biasa (MP3/M4A/OGG/VN) dalam waktu *${SESSION_TIMEOUT / 1000} detik*\n` +
      `3. Audio yang panjang akan otomatis dipotong maksimal *${AUDIO_LIMIT} detik*\n\n` +
      `_Ketik *${px} batal* untuk membatalkan sesi._`
    )
  }

  if (kind === 'video' && Number(payload.seconds || 0) > 15) {
    return m.reply('Maksimal durasi video adalah 15 detik!')
  }

  try {
    const raw = await source.download()
    if (!raw?.length) throw new Error('Gagal mengunduh media.')

    const sticker = await buildVisualSticker(raw, kind)

    cleanup(conn, key)
    conn.sacustom[key] = {
      bytes: sticker.bytes,
      meta: sticker.meta,
      kind,
      processing: false
    }

    arm(
      conn,
      key,
      m.chat,
      SESSION_TIMEOUT,
      `⏱️ Sesi *${command}* dibatalkan (waktu ${SESSION_TIMEOUT / 1000} detik habis, tidak ada audio masuk).`
    )

    const label = kind === 'video' ? 'Video (suara akan diganti)' : kind === 'sticker' ? 'Stiker' : 'Gambar'
    return m.reply(
      `✅ *${label} diterima!*\n` +
      `Sekarang kirim *audio* (MP3/audio biasa) dalam *${SESSION_TIMEOUT / 1000} detik*.\n` +
      `_Jika audio lebih dari ${AUDIO_LIMIT} detik, akan otomatis terpotong._`
    )
  } catch (e) {
    cleanup(conn, key)
    console.log(e);
    throw e;
  }
}

handler.before = async (m, { conn }) => {
  if (m.isZapo || m.fromMe) return
  const key = `${m.chat}:${m.sender}`
  const session = conn.sacustom?.[key]
  if (!session || session.processing) return

  const body = String(m.text || '').trim()
  if (/^[.!#/]/.test(body)) return

  const q = m.quoted ? m.quoted : m
  const payload = q.msg || q
  const mime = payload.mimetype || ''
  const mtype = q.mtype || ''

  const isAudio = mtype === 'audioMessage' || mime.startsWith('audio/')
  if (!isAudio) return

  session.processing = true
  try {
    const audioRaw = await q.download()
    if (!audioRaw?.length) throw new Error('Audio gagal diunduh.')

    const opusTrack = await toOpus(audioRaw)
    await deliverStickerAudio(conn, m.chat, m, {
      bytes: session.bytes,
      meta: session.meta,
      track: opusTrack
    })

    cleanup(conn, key)
  } catch (e) {
    cleanup(conn, key)
    console.error('[SACUSTOM AUDIO]', e)
    m.reply(`❌ Gagal menggabungkan audio ke stiker: ${e?.message || e}`)
  }
}

handler.help = ['sacustom']
handler.tags = ['sticker']
handler.command = /^(sacustom|customsa|stikercustom)$/i
handler.limit = true

export default handler