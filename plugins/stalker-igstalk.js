let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} prm2.0`
    try {
        let api = await fetch(`https://api.botcahx.eu.org/api/stalk/ig?username=${text}&apikey=${btc}`)
        let x = await api.json()
        let caption = `▢ *Username*: ${x.result.username}
▢ *Full Name*: ${x.result.full_name}
▢ *Followers*: ${x.result.followers}
▢ *Followings*: ${x.result.followings}
▢ *Biography*: ${x.result.biography}
▢ *External URL*: ${x.result.external_url}
▢ *Business Account*: ${x.result.is_business_account ? 'Yes' : 'No'}
▢ *Professional Account*: ${x.result.is_professional_account ? 'Yes' : 'No'}
▢ *Private Account*: ${x.result.is_private ? 'Yes' : 'No'}
▢ *Verified Account*: ${x.result.is_verified ? 'Yes' : 'No'}
▢ *Verified by MV4B*: ${x.result.is_verified_by_mv4b ? 'Yes' : 'No'}
▢ *Pronouns*: ${x.result.pronouns.join(', ')}
▢ *Post Count*: ${x.result.post_count}
▢ *EIMU ID*: ${x.result.eimu_id}`
        return conn.sendFile(m.chat, x.result.profile_pic_url_hd, 'pp.png', caption, m)
    } catch (e) {
        m.reply('Sistem Sedang Bermasalah!')
    }
}

handler.help = ['igstalk <username>']
handler.tags = ['stalk']
handler.command = /^(igstalk)$/i
handler.limit = true

module.exports = handler
