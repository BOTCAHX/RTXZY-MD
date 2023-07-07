let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} prm2.0`
    try {
        let api = await fetch(`https://api.botcahx.live/api/stalk/ig?username=${text}&apikey=${btc}`)
        let x = await api.json()
        let caption = `▢ *Username*: ${x.result.username}\n▢ *Full Name*: ${x.result.fullName}\n▢ *Bio*: ${x.result.bio}\n▢ *Followers*: ${x.result.followers}\n▢ *Following*: ${x.result.following}\n▢ *Post*: ${x.result.postsCount}
        `
        return conn.sendFile(m.chat, x.result.profilePicHD, 'pp.png', caption, m)
    } catch (e) {
        m.reply('Sistem Sedang Bermasalah!')
    }
}

handler.help = ['igstalk <username>']
handler.tags = ['stalk']
handler.command = /^(igstalk)$/i
handler.limit = true

module.exports = handler
