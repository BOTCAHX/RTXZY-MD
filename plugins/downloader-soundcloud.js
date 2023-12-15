const fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://soundcloud.com/issabella-marchelina/sisa-rasa-mahalini-official-audio?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let res = await fetch(`https://api.botcahx.eu.org/api/dowloader/soundcloud?url=${text}&apikey=${btc}`)
		let anu = await res.json()
		anu = anu.result
		let ini_txt = `*${anu.title}*\n\n`
		ini_txt += `⭔ Duration : ${anu.duration}\n`
		ini_txt += `⭔ Quality : *${anu.quality}*`
		await conn.sendFile(m.chat, anu.thumbnail, 'scloud.jpg', ini_txt, m)
		conn.sendMessage(m.chat, {
                audio: {
                    url: anu.download
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: anu.title,
                        body: "",
                        thumbnailUrl: anu.thumbnail,
                        sourceUrl: anu.download,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
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
