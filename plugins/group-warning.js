let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `✳️ Memberi label atau menyebut seseorang\n\n📌 Contoh : ${usedPrefix + command} @user`
        if (!(who in global.db.data.users)) throw `✳️ Pengguna hilang dari database saya`
        let name = await conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
            await conn.sendMessage(m.chat, {
                text: `
⚠️ *Pengguna yang Diperingatkan* ⚠️

▢ *Admin:* ${name}
▢ *Pengguna:* @${who.split`@`[0]}
▢ *Memperingatkan:* ${warn + 1}/${war}
▢ *Alasan:* ${text}`,
                mentions: [who]
            })
            await conn.sendMessage(m.chat, {
                text: `
⚠️ *PERINGATAN* ⚠️
@${who.split`@`[0]} menerima peringatan dari admin

▢ *Memperingatkan:* ${warn + 1}/${war} 
Jika menerima *${war}* Peringatan maka akan dihapus otomatis dari grup`,
                mentions: [who]
            })
        } else if (warn == war) {
            global.db.data.users[who].warn = 0
            await conn.sendMessage(m.chat, {
                text: `⛔ @${who.split`@`[0]} melebihi peringatan *${war}* karena itu akan dihapus`,
                mentions: [who]
            })
            await time(3000)
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
            await conn.sendMessage(m.chat, {
                text: `♻️ @${who.split`@`[0]} tersingkir dari grup *${groupMetadata.subject}* karena telah diperingatkan *${war}* kali`,
                mentions: [who]
            })
        }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['warn'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
