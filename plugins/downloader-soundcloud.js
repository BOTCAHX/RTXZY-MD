const fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://soundcloud.com/issabella-marchelina/sisa-rasa-mahalini-official-audio?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	
	await m.reply(wait)
	try {
		let res = await fetch(`https://api.botcahx.eu.org/api/download/soundcloud?url=${text}&apikey=${btc}`)
		let anu = await res.json()
		anu = anu.result
		let ini_txt = `*${anu.title}*\n\n`
		
		await conn.sendFile(m.chat, anu.thumbnail, 'scloud.jpg', ini_txt, m)
		await conn.sendMessage(m.chat, {
            audio: {
                url: anu.url
            },
            mimetype: 'audio/mpeg',
        }, {
            quoted: m
        });
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Soundcloud URL / terjadi kesalahan.`)
	}
}

handler.help = ['soundcloud <url>']
handler.tags = ['downloader']
handler.command = /^(s(ound)?cloud)$/i

module.exports = handler
