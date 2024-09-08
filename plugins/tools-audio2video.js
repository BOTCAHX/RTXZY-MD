const fetch = require('node-fetch');
const uploader = require('../lib/uploadFile');

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/audio/.test(mime)) {
		let buffer = await q.download()
		await m.reply(wait)
		try {
		let media = await uploader(buffer)
		let json = await (await fetch(`https://api.botcahx.eu.org/api/tools/audio2video?url=${media}&apikey=${btc}`)).json()		
        await conn.sendFile(m.chat, json.result, "video.mp4", "*DONE*", m)
        } catch (err) {
      throw eror
    }
 } else throw `Reply audio with command ${usedPrefix + command}`
}
handler.help = ['audio2video']
handler.tags = ['tools']
handler.command = /^(audio2video)$/i
handler.limit = true;

module.exports = handler
