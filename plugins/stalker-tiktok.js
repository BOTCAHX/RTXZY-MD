const api = require('api-dylux');
async function handler(m, {
    text,
    usedPrefix,
    command
}) {
    if (!text) return m.reply(`Masukan URL Instagram!\n\n*Example:* ${usedPrefix + command} chenggu_4 `)
    try {
        await m.reply(wait)
        let res = await api.ttStalk(text)
        var txt = `
👤 Name : ${res.name}
📍 Username: ${res.username}
🔵 Followers : ${res.followers}
🔴 Following : ${res.following}
📖 Description : ${res.desc}`

        conn.sendFile(m.chat, res.profile, 'profile.jpg', txt, m)
    } catch (error) {
        m.reply(`Error: ${error}`)
    }
}
handler.command = handler.help = ['tiktokstalk', 'ttstalk'];
handler.tags = ['downloader'];
module.exports = handler;
