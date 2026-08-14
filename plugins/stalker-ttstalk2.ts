import fetch from 'node-fetch'

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} chikaku`
    await m.reply(wait)
    try {     
        let json = await fetch(`https://api.botcahx.eu.org/api/stalk/tt-v2?username=${text}&apikey=${btc}`).then(res => res.json());
        let res = json.result;
        
        let caption = `⦿  *T I K T O K - S T A L K*\n\n`
        caption += `	◦  *Nickname* : ${res.profile.Nickname || 'N/A'}\n`
        caption += `	◦  *Username* : ${res.profile.Username || 'N/A'}\n`
        caption += `	◦  *User ID* : ${res.profile['User ID'] || 'N/A'}\n`
        caption += `	◦  *About* : ${res.profile.About || 'N/A'}\n`
        caption += `	◦  *Country* : ${res.profile.Country || 'N/A'}\n`
        caption += `	◦  *Language* : ${res.profile.Language || 'N/A'}\n`
        caption += `	◦  *Bio Link* : ${res.profile['Bio Link'] || 'N/A'}\n`
        caption += `	◦  *Account Created* : ${res.profile['Account Created'] || 'N/A'}\n`
        caption += `	◦  *Followers* : ${res.stats.Followers || '0'}\n`
        caption += `	◦  *Following* : ${res.stats.Following || '0'}\n`
        caption += `	◦  *Hearts* : ${res.stats.Hearts || '0'}\n`
        caption += `	◦  *Videos* : ${res.stats.Videos || '0'}\n`
        caption += `	◦  *Friends* : ${res.stats.Friends || '0'}\n`
        caption += `	◦  *Region* : ${res.region.region.flag || ''} ${res.region.region.name || 'N/A'}\n\n`
        
        if (res.profile['Avatar URL']) {
            await conn.sendMessage(m.chat, { image: { url: res.profile['Avatar URL'] }, caption: caption, mentions: [m.sender] }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender] }, { quoted: m });
        }
    } catch (e) {     
        throw `Error: ${eror}`
    }
}

handler.help = ['ttstalk2 <username>']
handler.tags = ['stalk']
handler.command = /^(ttstalk2|tiktokstalk2)$/i
handler.limit = true

export default handler
