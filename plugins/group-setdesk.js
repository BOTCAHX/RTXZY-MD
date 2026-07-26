let handler = async (m, { conn, command, usedPrefix, text }) => {
 if (!text) throw `*Example:* ${usedPrefix + command} teks`
 await conn.groupUpdateDescription(m.chat, text);
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
