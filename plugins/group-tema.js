import crypto from 'crypto'
import sharp from 'sharp'
import { proto, writeRandomPadMax16 } from 'zapo-js'
import { parseMediaConnResponse } from 'zapo-js/media'

const PRESETS = {
  pink: 'ff69b4',
  biru: '1e90ff',
  biru_muda: '87ceeb',
  ungu: '9b59b6',
  hitam: '121212',
  hijau: '2ecc71',
  merah: 'e74c3c',
  kuning: 'f1c40f',
  oren: 'e67e22',
  putih: 'f5f6fa',
  abu: '808080',
  coklat: '8b5a2b',
  tosca: '40e0d0'
}

const SCHEMES = {
  default: 'Default',
  'whatsapp-green': 'WhatsApp-Green',
  'pearl-indigo': 'Pearl-Indigo',
  'tyrian-purple': 'Tyrian-Purple',
  'sunset-orange': 'Sunset-Orange',
  'merino-teal': 'Merino-Teal',
  'royal-blue': 'Royal-Blue',
  'dark-cerulean': 'Dark-Cerulean',
  'charcoal-green': 'Charcoal-Green',
  'persian-plum': 'Persian-Plum',
  'dune-mono': 'Dune-Mono',
  'default-blue': 'Default-Blue',
  'default-mono': 'Default-Mono',
  'sky-blue': 'Sky-Blue',
  brown: 'Brown',
  cream: 'Cream',
  emerald: 'Emerald',
  lemon: 'Lemon',
  lime: 'Lime',
  pink: 'Pink',
  red: 'Red',
  'sunrise-orange': 'Sunrise-Orange',
  'warm-yellow': 'Warm-Yellow',
  'whatsapp-green-tonal': 'WhatsApp-Green@Tonal',
  'pearl-indigo-tonal': 'Pearl-Indigo@Tonal',
  'pearl-indigo-minimal': 'Pearl-Indigo@Minimal',
  'tyrian-purple-tonal': 'Tyrian-Purple@Tonal',
  'sunset-orange-tonal': 'Sunset-Orange@Tonal',
  'merino-teal-tonal': 'Merino-Teal@Tonal',
  'royal-blue-tonal': 'Royal-Blue@Tonal',
  'dark-cerulean-tonal': 'Dark-Cerulean@Tonal',
  'charcoal-green-tonal': 'Charcoal-Green@Tonal',
  'persian-plum-tonal': 'Persian-Plum@Tonal',
  'dune-mono-tonal': 'Dune-Mono@Tonal',
  'default-blue-tonal': 'Default-Blue@Tonal',
  'default-blue-minimal': 'Default-Blue@Minimal',
  'default-mono-tonal': 'Default-Mono@Tonal',
  'default-mono-minimal': 'Default-Mono@Minimal',
  'sky-blue-tonal': 'Sky-Blue@Tonal',
  'sky-blue-minimal': 'Sky-Blue@Minimal',
  'brown-tonal': 'Brown@Tonal',
  'cream-tonal': 'Cream@Tonal',
  'emerald-tonal': 'Emerald@Tonal',
  'lemon-tonal': 'Lemon@Tonal',
  'lime-tonal': 'Lime@Tonal',
  'pink-tonal': 'Pink@Tonal',
  'red-tonal': 'Red@Tonal',
  'sunrise-orange-tonal': 'Sunrise-Orange@Tonal',
  'warm-yellow-tonal': 'Warm-Yellow@Tonal'
}

const THEME_TIMESTAMP = () => Date.now()

function bubbleList() {
  let list = ''
  for (const [key, id] of Object.entries(SCHEMES)) list += `◦ *${key}* : ${id}\n`
  return list
}

function colorList() {
  let list = ''
  for (const [name, hex] of Object.entries(PRESETS)) list += `◦ *${name}* : #${hex.toUpperCase()}\n`
  return list
}

function usage(prefix, command) {
  const cmd = `${prefix}${command}`
  let capt = `乂 *T E M A  G R U P*\n\n`
  capt += `*Warna wallpaper*\n`
  capt += colorList()
  capt += `\n*Skema bubble*\n`
  capt += bubbleList()
  capt += `\n*Contoh*\n`
  capt += `◦ ${cmd} pink\n`
  capt += `◦ ${cmd} #FF69B4\n`
  capt += `◦ ${cmd} bubble royal-blue-tonal\n`
  capt += `◦ ${cmd} pink | royal-blue-tonal\n`
  capt += `◦ ${cmd} reset\n`
  capt += `◦ Reply gambar + ${cmd}\n`
  capt += `◦ ${cmd} https://link-gambar.jpg`
  return capt
}

function hexToArgb(hex) {
  return (0xff000000 | parseInt(hex, 16)) >>> 0
}

function normalizeBubble(value) {
  const raw = String(value || '').trim()
  if (!raw) return null
  if (raw.includes('@')) return raw
  const key = raw.toLowerCase().replace(/[\s_]+/g, '-')
  if (SCHEMES[key]) return SCHEMES[key]
  return key.split('-').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join('-')
}

function parseThemeInput(text) {
  const q = String(text || '').trim()
  if (!q) return null
  if (/^(reset|hapus|clear|default|bawaan)$/i.test(q)) return { clearTheme: true }
  const [bg, bubblePart] = q.split('|').map(v => v.trim())
  const lower = (bg || '').toLowerCase()
  const payload = {}
  const hex = PRESETS[lower] || (/^#?[0-9a-f]{6}$/i.test(bg || '') ? bg.replace(/^#/, '') : null)
  if (hex) payload.hex = hex
  else if (bubblePart === undefined && bg && lower !== 'bubble') payload.bubble = normalizeBubble(bg)
  if (bubblePart) payload.bubble = normalizeBubble(bubblePart)
  return payload.hex || payload.bubble ? payload : null
}

function buildThemeSetting(payload) {
  if (payload.clearTheme) {
    return { settingTimestampMs: THEME_TIMESTAMP(), clearTheme: true }
  }
  const setting = { settingTimestampMs: THEME_TIMESTAMP() }
  if (payload.bubble) setting.colorSchemeId = payload.bubble
  if (payload.hex) {
    const argb = hexToArgb(payload.hex)
    setting.wallpaper = 'solidColor'
    setting.solidColor = {
      backgroundLightArgb: argb,
      backgroundDarkArgb: argb,
      isDoodleEnabled: true
    }
  }
  if (payload.bubble || payload.hex) return setting
  if (payload.image) {
    return {
      settingTimestampMs: THEME_TIMESTAMP(),
      wallpaper: 'customImage',
      customImage: { ...payload.image, dimLevel: 0 }
    }
  }
  throw new Error('Tema tidak dikenali')
}

function findImageMedia(obj, depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 6) return null
  const mtype = String(obj.mtype || '')
  const inner = obj.msg && typeof obj.msg === 'object' ? obj.msg : obj
  if (/image/i.test(mtype)) return { holder: obj, media: inner, type: 'image' }
  if (/document/i.test(mtype) && /^image\//i.test(inner.mimetype || obj.mimetype || '')) {
    return { holder: obj, media: inner, type: 'document' }
  }
  if (obj.imageMessage) return { holder: obj, media: obj.imageMessage, type: 'image' }
  if (obj.documentMessage && /^image\//i.test(obj.documentMessage.mimetype || '')) {
    return { holder: obj, media: obj.documentMessage, type: 'document' }
  }
  if (obj.viewOnceMessage?.message) return findImageMedia(obj.viewOnceMessage.message, depth + 1)
  if (obj.viewOnceMessageV2?.message) return findImageMedia(obj.viewOnceMessageV2.message, depth + 1)
  if (obj.viewOnceMessageV2Extension?.message) return findImageMedia(obj.viewOnceMessageV2Extension.message, depth + 1)
  if (obj.ephemeralMessage?.message) return findImageMedia(obj.ephemeralMessage.message, depth + 1)
  if (obj.documentWithCaptionMessage?.message) return findImageMedia(obj.documentWithCaptionMessage.message, depth + 1)
  if (obj.editedMessage?.message) return findImageMedia(obj.editedMessage.message, depth + 1)
  if (obj.message && typeof obj.message === 'object') return findImageMedia(obj.message, depth + 1)
  if (obj.msg && typeof obj.msg === 'object' && obj.msg !== obj) return findImageMedia(obj.msg, depth + 1)
  return null
}

async function fetchUrlImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const type = res.headers.get('content-type') || ''
  if (!/^image\//i.test(type)) throw new Error('URL bukan gambar')
  return Buffer.from(await res.arrayBuffer())
}

function encryptWallpaper(buffer) {
  const mediaKey = crypto.randomBytes(32)
  const expanded = Buffer.from(
    crypto.hkdfSync('sha256', mediaKey, Buffer.alloc(32), Buffer.from('WhatsApp Chat Wallpaper Keys'), 112)
  )
  const iv = expanded.subarray(0, 16)
  const cipherKey = expanded.subarray(16, 48)
  const macKey = expanded.subarray(48, 80)
  const cipher = crypto.createCipheriv('aes-256-cbc', cipherKey, iv)
  const enc = Buffer.concat([cipher.update(buffer), cipher.final()])
  const mac = crypto.createHmac('sha256', macKey).update(Buffer.concat([iv, enc])).digest().subarray(0, 10)
  const encFile = Buffer.concat([enc, mac])
  return {
    encFile,
    mediaKey,
    fileSha256: crypto.createHash('sha256').update(buffer).digest(),
    fileEncSha256: crypto.createHash('sha256').update(encFile).digest()
  }
}

async function resolveMediaConn(client) {
  const cached = client?.message?.mediaUploadOptions?.getMediaConnCache?.()
  if (cached?.auth && cached?.hosts?.length) return cached
  const iq = await client.lowlevel.query({
    tag: 'iq',
    attrs: { to: 's.whatsapp.net', type: 'set', xmlns: 'w:m' },
    content: [{ tag: 'media_conn', attrs: {} }]
  })
  return parseMediaConnResponse(iq, Date.now())
}

async function centerCrop(buffer) {
  try {
    return await sharp(buffer)
      .rotate()
      .resize(1080, 2340, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 92 })
      .toBuffer()
  } catch {
    return buffer
  }
}

async function uploadWallpaper(client, rawBuffer) {
  const buffer = await centerCrop(rawBuffer)
  const { encFile, mediaKey, fileSha256, fileEncSha256 } = encryptWallpaper(buffer)
  const mediaConn = await resolveMediaConn(client)
  const token = fileEncSha256.toString('base64url')
  for (const entry of mediaConn.hosts) {
    const host = entry.hostname || entry
    const url = `https://${host}/mms/chat-wallpaper-image/${encodeURIComponent(token)}?auth=${encodeURIComponent(mediaConn.auth)}&token=${encodeURIComponent(token)}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream', Origin: 'https://web.whatsapp.com' },
      body: encFile
    }).catch(() => null)
    if (!res?.ok) continue
    const json = await res.json().catch(() => null)
    const directPath = json?.direct_path || json?.directPath
    if (directPath) {
      return { directPath, mediaKey, fileEncSha256, fileSha256 }
    }
  }
  throw new Error('Gagal upload wallpaper ke server WhatsApp')
}

function requireDispatch(conn) {
  const dispatch = conn._client?.message?.messageDispatch
  if (!dispatch?.publishGroupSenderKeyMessage) {
    throw new Error('zapo-js tidak punya jalur kirim tema grup')
  }
  return dispatch
}

async function sendChatTheme(conn, jid, themeSetting) {
  const dispatch = requireDispatch(conn)
  const message = { protocolMessage: { type: 34, chatThemeSetting: themeSetting } }
  const plaintext = await writeRandomPadMax16(proto.Message.encode(message).finish())
  const sendOptions = await dispatch.withResolvedMessageId({})
  return dispatch.publishGroupSenderKeyMessage(jid, {
    message,
    plaintext,
    type: 'media',
    mediatype: 'chat_theme',
    sendOptions
  })
}

async function downloadImage(conn, found) {
  if (typeof found.holder?.download === 'function') {
    try {
      const buffer = await found.holder.download()
      if (buffer?.length) return Buffer.from(buffer)
    } catch {}
  }
  const wrapped = { [found.type === 'document' ? 'documentMessage' : 'imageMessage']: found.media }
  const buffer = await conn._client.message.downloadBytes(wrapped)
  return Buffer.from(buffer)
}

async function getThemeImage(conn, m, text) {
  const found = findImageMedia(m.quoted) || findImageMedia(m)
  if (found) return downloadImage(conn, found)
  const url = String(text || '').trim().match(/^https?:\/\/\S+$/i)
  if (url) return fetchUrlImage(url[0])
  return null
}

let handler = async (m, { conn, command, usedPrefix, text }) => {
  if (!m.isGroup) throw 'Perintah ini hanya untuk grup'
  const meta = await conn.groupMetadata(m.chat)
  const sender = (m.sender || '').split('@')[0].split(':')[0]
  const senderAdmin = meta.participants?.some(
    p => (String(p.id || '').split('@')[0].split(':')[0] === sender) && (p.admin === 'admin' || p.admin === 'superadmin')
  )
  if (!senderAdmin) throw 'Khusus admin grup'

  const raw = String(text || '').trim()
  if (/^(list|warna|daftar)$/i.test(raw)) return m.reply(usage(usedPrefix, command))

  const bubbleOnly = raw.match(/^bubble\s+(.+)$/i)
  const wantsImage = /^https?:\/\/\S+$/i.test(raw) || !!findImageMedia(m.quoted) || !!findImageMedia(m)
  const parsed = bubbleOnly ? { bubble: normalizeBubble(bubbleOnly[1]) } : parseThemeInput(text)

  if (!parsed && !wantsImage) {
    return m.reply(usage(usedPrefix, command))
  }

  let payload = parsed
  if (!payload && wantsImage) {
    const buffer = await getThemeImage(conn, m, text)
    if (!buffer?.length) throw 'Gambar tidak bisa dibaca'
    m.reply('Mengunggah wallpaper...')
    payload = { image: await uploadWallpaper(conn._client, buffer) }
  }

  await sendChatTheme(conn, m.chat, buildThemeSetting(payload))
  const parts = []
  if (payload.hex) parts.push(`#${payload.hex.toUpperCase()}`)
  if (payload.bubble) parts.push(`bubble ${payload.bubble}`)
  if (payload.image) parts.push('wallpaper gambar')
  if (payload.clearTheme) parts.push('tema bawaan')
  m.reply(`Tema grup diubah: ${parts.join(' + ') || 'ok'}`)
}

handler.before = m => {
  const theme = m?.message?.protocolMessage?.chatThemeSetting
  if (theme) {
    console.log('[tema] chatThemeSetting masuk:', JSON.stringify(theme, (k, v) => (v?.type === 'Buffer' ? `base64:${Buffer.from(v.data).toString('base64')}` : v)))
  }
}

handler.help = ['tema <warna|reset>']
handler.tags = ['group']
handler.command = /^(tema|settema|theme|temagc)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = false
handler.admin = true
handler.botAdmin = false

export default handler
