let handler = async (m, { conn, args, participants }) => {
        let grup = await conn.getName(m.key.remoteJid)
        let mimin = m.isGroup ? getAdmin(participants) : ''
        let txt = `List Admin Group *${grup}*\n*Total:* ${mimin.length}\n\n`
        for (let min of mimin) {
                txt += `• @${min.split('@')[0]}\n`
        }
        conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
}
handler.help = ['listadmin']
handler.tags = ['group']
handler.command = /^(adminlist|listadmin)$/i
handler.group = true
handler.register = false
module.exports = handler

const getAdmin = (participants) => {
        getAdminAll = []
        for (let b of participants) {
                b.admin === "admin" ? getAdminAll.push(b.id) : ''
                b.admin === "superadmin" ? getAdminAll.push(b.id) : ''
        }
        return getAdminAll
}
