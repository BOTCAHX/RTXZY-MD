let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} prm2.0`
    try {
        let api = await fetch(`https://api.botcahx.eu.org/api/stalk/ig?username=${text}&apikey=${btc}`)
        let response = await api.json()
        if (response.status) {
            let userInfo = response.result.user_info
            let caption = `▢ *Username*: ${userInfo.username}\n▢ *Full Name*: ${userInfo.full_name}\n▢ *Biography*: ${userInfo.biography}\n▢ *Posts*: ${userInfo.posts}\n▢ *Followers*: ${userInfo.followers}\n▢ *Following*: ${userInfo.following}`
            return conn.sendFile(m.chat, userInfo.profile_pic_url, 'pp.png', caption, m)
        } else {
            throw 'Sistem Sedang Bermasalah!'
        }
    } catch (e) {
        m.reply('Sistem Sedang Bermasalah!')
    }
}

handler.help = ['igstalk <username>']
handler.tags = ['stalk']
handler.command = /^(igstalk)$/i
handler.limit = true

module.exports = handler
