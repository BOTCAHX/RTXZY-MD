let fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} botcahx`   
    try {     
        let json = await fetch(`https://api.botcahx.live/api/stalk/github?username=${text}&apikey=${btc}`).then(res => res.json());
        let caption = `⦿  *G H - S T A L K*\n\n`
        caption += `	◦  *Name* : ${json.result.user.username}\n`
        caption += `	◦  *ID* : ${json.result.user.idUser}\n`
        caption += `	◦  *NodeId* : ${json.result.user.nodeId}\n`
        caption += `	◦  *Name* : ${json.result.user.username}\n`
        caption += `	◦  *Followers* : ${json.result.user.followers}\n`
        caption += `	◦  *Following* : ${json.result.user.following}\n`
        caption += `	◦  *Bio* : ${json.result.user.bio}\n`
        caption += `	◦  *Type* : ${json.result.user.type}\n`
        caption += `	◦  *Company* : ${json.result.user.company}\n`
        caption += `	◦  *Repo* : ${json.result.user.publicRepos}\n`
        caption += `	◦  *Create At* : ${json.result.user.createdAt}\n`
        caption += `	◦  *Update At* : ${json.result.user.updatedAt}\n`
        caption += `	◦  *Url* : ${json.result.user.githubUrl}\n`    
        conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: json.result.user.avatarUrl,
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
            }
        }, {})
    } catch (e) {     
        throw `Error: ${error}`
    }
}
handler.help = ['ghstalk <username>']
handler.tags = ['stalk']
handler.command = /^(ghstalk|githubstalk)$/i
handler.limit = true

module.exports = handler
