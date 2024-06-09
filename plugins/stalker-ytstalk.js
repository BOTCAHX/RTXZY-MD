let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Contoh:\n${usedPrefix + command} deaafrizal`
    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/stalk/yt?username=${text}&apikey=${btc}`)).json()
        
        if (res.status && res.result && res.result.data && res.result.data.length > 0) {
            let data = res.result.data[0];
            let { channelId, url, channelName, avatar, isVerified, subscriberH, subscriber, description } = data;
            
            let capt;
            capt = `乂 *Y O U T U B E   S T A L K*\n\n`;
            capt += `◦ *ID* : ${channelId}\n`;
            capt += `◦ *Name* : ${channelName}\n`;
            capt += `◦ *Subscriber* : ${subscriberH}\n`;
            capt += `◦ *Verified* : ${isVerified}\n`;
            capt += `◦ *URL* : ${url}\n`;
            if (description) capt += `◦ *Description* : ${description}\n`;
            
            return conn.relayMessage(m.chat, {
extendedTextMessage:{
                text: capt, 
                contextInfo: {
                     externalAdReply: {
                        title: ('Channel ' + text).toUpperCase(),
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: avatar,
                        sourceUrl: url
                    }
                }, mentions: [m.sender]
}}, {})
        } else {
            throw 'Channel tidak ditemukan!'
        }
    } catch (e) {
        m.reply('Sistem Sedang Bermasalah!')
    }
}

handler.help = ['ytstalk']
handler.tags = ['stalk']
handler.command = /^(youtubestalk|ytstalk)$/i
handler.limit = true

module.exports = handler
