const fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {

	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://soundcloud.com/issabella-marchelina/sisa-rasa-mahalini-official-audio?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let res = await fetch(`https://botcahx-rest-api.herokuapp.com/api/dowloader/soundcloud?url=${text}`)
		let anu = await res.json()
		anu = anu.result
		let ini_txt = `*${anu.title}*\n\n`
		ini_txt += `⭔ Duration : ${anu.duration}\n`
		ini_txt += `⭔ Quality : *${anu.quality}*`
		await conn.sendFile(m.chat, anu.thumbnail, 'scloud.jpg', ini_txt, m)
		await conn.sendMessage(m.chat, {document: { url: anu.download }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3`}, { quoted : m })
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Soundcloud URL / terjadi kesalahan.`)
	}
}

handler.help = ['soundcloud <url>']
handler.tags = ['download']
handler.command = /^(s(ound)?cloud)$/i

module.exports = handler
