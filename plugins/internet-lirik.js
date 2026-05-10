let fetch = require("node-fetch");
let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `Ex: ${usedPrefix}${command} Jiwa yang bersedih`
    await m.reply(wait)
    try {
        let data = await (await fetch(`https://api.botcahx.eu.org/api/search/lirik?lirik=${text}&apikey=${btc}`)).json()
        let caption = `
${data.result.lyrics}

ℹ️ More info:
🔗 ${data.result.image}
🎤 Artist: ${data.result.artist}`
await conn.sendMessage(m.chat, { image: { url: data.result.image }, caption: caption, mentions: [m.sender] }, { quoted: m });
    } catch (e) {
        console.log(e)
        m.reply('Terjadi kesalahan, silahkan coba lagi nanti')
    }
}

handler.help = ['lirik'].map(v => v + ' <Title>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler
