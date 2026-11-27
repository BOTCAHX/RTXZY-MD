let handler = async (m, { conn, command, usedPrefix, text }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} teks`
  const meta = await conn.groupMetadata(m.chat)
  if ((meta?.desc || '') === text) return m.reply('Deskripsi sama, tidak ada perubahan')
  try {
    await conn.groupUpdateDescription(m.chat, text, meta?.descId)
  } catch (e) {
    const msg = e?.message || String(e)
    if (!/409|conflict/i.test(msg)) throw e
    await new Promise(r => setTimeout(r, 1500))
    try {
      await conn.groupUpdateDescription(m.chat, text)
    } catch (err) {
      return m.reply(`Gagal mengganti deskripsi: ${err?.message || err}`)
    }
  }
  m.reply('Sukses mengganti deskripsi group')
}

handler.help = ['setdeskgroup <text>']
handler.tags = ['group']
handler.command = /^set(desk|deskripsi|deskripsigc|deskripsigroup|deskripsigrup|deskgc)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = false
handler.admin = true
handler.botAdmin = true

export default handler
