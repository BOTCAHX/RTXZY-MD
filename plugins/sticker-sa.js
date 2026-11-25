import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { proto } from '../lib/simple.js'
import { addExif } from '../lib/sticker.js'

const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg'
const AUDIO_LIMIT = 10
const VIDEO_LIMIT = 10
const WEBP_LIMIT = 1024 * 1024
const DRAFT_TTL = 10 * 60 * 1000
const DRAFT_LIMIT = 200
const SCRATCH_DIR = path.join(process.cwd(), 'tmp', 'stca')
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

const drafts = global._stcaDrafts || (global._stcaDrafts = new Map())

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
  return Uint8Array.from([...varint(id << 3 | 2), ...varint(payload.length), ...payload])
}

function sweepDrafts() {
  const deadline = Date.now() - DRAFT_TTL
  for (const [owner, entry] of drafts) {
    if (!entry || entry.touched < deadline) drafts.delete(owner)
  }
  for (const owner of drafts.keys()) {
    if (drafts.size <= DRAFT_LIMIT) break
    drafts.delete(owner)
  }
}

function draftOf(owner) {
  sweepDrafts()
  const entry = drafts.get(owner)
  if (!entry) return null
  if (Date.now() - entry.touched > DRAFT_TTL) {
    drafts.delete(owner)
    return null
  }
  return entry
}

function keepDraft(owner, fields) {
  const entry = { ...(draftOf(owner) || {}), ...fields, touched: Date.now() }
  drafts.delete(owner)
  drafts.set(owner, entry)
  return entry
}

function dropDraft(owner) {
  drafts.delete(owner)
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
        try { fs.unlinkSync(file) } catch { /* sudah bersih */ }
      }
      if (error) reject(error)
      else resolve(output)
    }

    guard = setTimeout(() => {
      try { worker.kill('SIGKILL') } catch { /* proses selesai */ }
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

function stillRecipe() {
  return [
    '-frames:v', '1',
    '-vf', `format=rgba,${PAD_FILTER}`,
    '-c:v', 'libwebp',
    '-lossless', '0',
    '-q:v', '80',
    '-f', 'webp'
  ]
}

function motionRecipe(quality, fps) {
  return [
    '-t', String(VIDEO_LIMIT),
    '-fs', '0.7M',
    '-an',
    '-vf', `fps=${fps},${PAD_FILTER},format=yuva420p`,
    '-c:v', 'libwebp',
    '-lossless', '0',
    '-q:v', String(quality),
    '-loop', '0',
    '-f', 'webp'
  ]
}

const toOpus = (source) => transcode(source, ['-t', String(AUDIO_LIMIT), ...OPUS_ARGS], 'ogg')
const toStill = (source) => transcode(source, stillRecipe(), 'webp')
const toMotion = (source, quality, fps) => transcode(source, motionRecipe(quality, fps), 'webp', 45000)

async function siftAudio(source) {
  try {
    const output = await transcode(source, ['-t', String(VIDEO_LIMIT), ...OPUS_ARGS], 'ogg')
    return output?.length ? output : null
  } catch {
    return null
  }
}

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
    const stamped = await addExif(buffer, packname, author)
    return looksWebp(stamped) ? stamped : buffer
  } catch {
    return buffer
  }
}

async function buildSticker(source, mode) {
  const raw = Buffer.from(source)

  if (mode === 'webp') {
    const bytes = await stampExif(raw)
    return { bytes, meta: inspectWebp(bytes) }
  }

  if (mode === 'motion') {
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
  if (!sticker.track?.length) {
    await conn.sendMessage(chat, { sticker: sticker.bytes, mimetype: WEBP_MIME }, { quoted: origin })
    return
  }

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

function describeMedia(m) {
  const source = m.quoted || m
  const payload = source.msg || source
  const mime = payload.mimetype || ''
  const type = source.mtype || m.mtype || ''

  let kind = null
  if (type === 'stickerMessage' || mime.includes('webp')) kind = 'sticker'
  else if (type === 'videoMessage' || mime.startsWith('video/')) kind = 'video'
  else if (type === 'audioMessage' || mime.startsWith('audio/')) kind = 'audio'
  else if (type === 'imageMessage' || mime.startsWith('image/')) kind = 'image'

  return { source, kind, once: Boolean(payload.viewOnce) }
}

const VISUAL_MODES = { sticker: 'webp', image: 'still', video: 'motion' }

function guide(hint) {
  return `Stiker Audio (audio maksimal ${AUDIO_LIMIT} detik). Balas video bersuara dengan *${hint}* untuk langsung jadi stiker audio, atau balas foto/stiker lalu balas audio/VN pakai *${hint}*. Ketik *${hint} reset* untuk membatalkan simpanan.`
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const hint = `${usedPrefix}${command || 'sa'}`
  const option = String(args?.[0] || '').toLowerCase().trim()
  const owner = m.sender
  const media = describeMedia(m)
  const saved = draftOf(owner)
  const roomy = media.kind && media.kind !== 'audio'

  if (['reset', 'clear', 'hapus'].includes(option)) {
    dropDraft(owner)
    return m.reply('Simpanan stiker dan audio kamu sudah dibersihkan.')
  }

  if (!media.kind && !(saved?.stickerBytes && saved?.audioBytes)) {
    return m.reply(guide(hint))
  }

  if (media.once) return m.reply('Media sekali lihat tidak bisa dijadikan stiker.')

  const visualOnly = option === 'set'

  try {
    if (media.kind === 'video' && !visualOnly) {
      const raw = await media.source.download()
      if (!raw?.length) throw new Error('video gagal diunduh')

      const sticker = await buildSticker(raw, 'motion')
      const track = (await siftAudio(raw)) || saved?.audioBytes || null

      await deliverStickerAudio(conn, m.chat, m, { bytes: sticker.bytes, meta: sticker.meta, track })
      if (track) dropDraft(owner)
      if (!track) await m.reply('Video ini tanpa suara, jadi dikirim sebagai stiker biasa.')
      return
    }

    let draft = saved || {}

    if (roomy) {
      const raw = await media.source.download()
      if (!raw?.length) throw new Error('media gagal diunduh')

      const sticker = await buildSticker(raw, VISUAL_MODES[media.kind])
      draft = keepDraft(owner, { stickerBytes: sticker.bytes, stickerMeta: sticker.meta })

      if (visualOnly) return m.reply(`Stiker sudah disimpan. Balas audio atau VN dengan *${hint}* untuk menyatukannya.`)
      if (!draft.audioBytes) return m.reply(`Stiker sudah disimpan. Sekarang balas audio atau VN dengan *${hint}* untuk menyatukannya.`)
    } else if (media.kind === 'audio') {
      const raw = await media.source.download()
      if (!raw?.length) throw new Error('audio gagal diunduh')

      draft = keepDraft(owner, { audioBytes: await toOpus(raw) })
      if (!draft.stickerBytes) return m.reply(`Audio sudah disimpan. Sekarang balas foto atau stiker dengan *${hint}* untuk menyatukannya.`)
    }

    if (!draft?.stickerBytes || !draft?.audioBytes) throw new Error('bagian stiker atau audio belum lengkap')

    await deliverStickerAudio(conn, m.chat, m, {
      bytes: draft.stickerBytes,
      meta: draft.stickerMeta,
      track: draft.audioBytes
    })
    dropDraft(owner)
  } catch (error) {
    console.error('[STCA]', error)
    await m.reply(`Gagal membuat stiker audio: ${error?.message || 'kesalahan tidak diketahui'}`)
  }
}

handler.help = ['sa', 'stcaudio', 'saudio', 'stikeraudio']
handler.tags = ['sticker']
handler.command = /^(sa|stcaudio|saudio|stikeraudio)$/i
handler.limit = true

export default handler
