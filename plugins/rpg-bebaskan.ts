let handler: WaPlugin = async (m, { conn, text }) => {
    if (!text) throw '• *Contoh :* .bebaskan 62×××'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag orang yang ingin dibebaskan dari penjara'
    
    let users = global.db.data.users
    
    // Only police can request a release
    if (users[m.sender].job !== 'polisi') throw 'Anda harus menjadi polisi untuk melakukan tindakan ini.'
    
    users[who].jail = false
    conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key }})
}
handler.help = ['bebaskan']
handler.tags = ['rpg']
handler.command = /^bebaskan$/i
handler.owner = false
handler.admin = false
handler.rpg = true

export default handler