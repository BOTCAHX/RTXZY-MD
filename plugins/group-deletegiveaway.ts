let handler: WaPlugin = async (m, { conn, participants, usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) throw `_*Tidak ada GIVEAWAY berlangsung digrup ini!*_\n\n*${usedPrefix}mulaigiveaway* - untuk memulai giveaway`
    delete conn.giveway[id]
    conn.sendMessage(m.chat, { text: '*GIVEAWAY* telah selesai', mentions: participants.map(a => a.id) })
}
handler.help = ['hapusgiveaway']
handler.tags = ['group']
handler.command = /^(delete|hapus)giveaway$/i
handler.group = true
handler.admin = true
export default handler
