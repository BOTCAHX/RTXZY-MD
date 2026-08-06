import webp2mp4 from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `Balas stiker bergerak (animated) dengan perintah *${usedPrefix + command}*`
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw `Balas stiker dengan perintah *${usedPrefix + command}*`
    
    m.reply('Sedang mengonversi...')
    let media = await m.quoted.download()
    try {
        let out = await webp2mp4.webp2mp4(media)
        if (!out) throw 'Gagal melakukan konversi.'
        await conn.sendMessage(m.chat, { video: { url: out }, caption: 'Sukses Konversi Webp Ke Video!', mimetype: 'video/mp4' }, { quoted: m })
    } catch (e) {
        console.error(e)
        throw 'Terjadi kesalahan saat mengonversi stiker.'
    }
}
handler.help = ['tomp4 (reply sticker)']
handler.tags = ['tools']
handler.command = /^to(mp4|video)$/i

export default handler
