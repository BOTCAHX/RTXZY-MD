let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) throw `_*Tidak ada *GIVEAWAY berlangsung digrup ini!*_\n\n*${usedPrefix}mulaigiveaway* - untuk memulai giveaway`

    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.giveway[id][1] as unknown as string[]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split('@')[0]}`).join('\n')
    conn.reply(m.chat, `*「 LIST MEMBER 」*

Tanggal: ${date}
${conn.giveway[id][2]}

┌ *Yang sudah ikut:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────

_${global.wm}_`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['cekgiveaway']
handler.tags = ['group']
handler.command = /^cekgiveaway$/i
handler.admin = true
export default handler
