let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw 'teksnya?'
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5 } detik`)
    for (let i of anu) {
    await delay(500)
    
    await conn.sendMessage(i, { image: { url: 'https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg' }, caption: pesan, mentions: [m.sender] }, { quoted: m }).catch(_ => _)
    }
  m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgcbot <teks>']
handler.tags = ['owner']
handler.command = /^((broadcastgc|bcgc)bot)$/i

handler.owner = true

module.exports = handler
