let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) throw `_*Tidak ada GIVEAWAY berlangsung digrup ini!*_\n\n*${usedPrefix}mulaigiveaway* - untuk memulai giveaway`

    let absen = conn.giveway[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw '*Kamu sudah ikut!*'
    absen.push(m.sender)
    m.reply(`*Done!*\n\n\`\`\`Total yang sudah ikut GIVEWAY sebanyak\`\`\`\n*${absen.length} Anggota*`)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
}
handler.help = ['ikutgiveaway']
handler.tags = ['group']
handler.command = /^(ikut|ikutgiveaway)$/i
handler.group = true
export default handler
