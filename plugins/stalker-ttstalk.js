let fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} chenggu_4`   
    try {     
        let json = await fetch(`https://api.botcahx.live/api/stalk/tt?username=${text}&apikey=${btc}`).then(res => res.json());
        let caption = `⦿  *T I K T O K - S T A L K*\n\n`
        caption += `	◦  *Username* : ${json.result.username}\n`
        caption += `	◦  *Description* : ${json.result.description}\n`
        caption += `	◦  *Likes* : ${json.result.likes}\n`
        caption += `	◦  *Followers* : ${json.result.followers}\n`
        caption += `	◦  *Following* : ${json.result.following}\n`
        caption += `	◦  *Totalposts* : ${json.result.totalPosts}\n\n`       
        conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: json.result.profile,
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
            }
        }, {})
    } catch (e) {     
        throw `Error: ${eror}`
    }
}
handler.help = ['ttstalk <username>']
handler.tags = ['stalk']
handler.command = /^(ttstalk|tiktokstalk)$/i
handler.limit = true

module.exports = handler
