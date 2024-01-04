const { spawn } = require('child_process')
const { format } = require('util')

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted
	if (q && /sticker/.test(q.mtype)) {
		if (q.isAnimated) return m.reply(`Gunakan *${usedPrefix}togif* untuk stiker bergerak`)
		let img = await m.quoted.download()
		try {
			let bufs = []
			const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []), 'convert', 'webp:-', 'png:-']
			let im = spawn(_spawnprocess, _spawnargs)
			im.on('error', e => m.reply(format(e)))
			im.stdout.on('data', chunk => bufs.push(chunk))
			im.stdin.write(img)
			im.stdin.end()
			im.on('exit', async () => {
				await conn.sendFile(m.chat, Buffer.concat(bufs), 'image.png', '*DONE*', m)
			})
		} catch (e) {
			console.log(e)
			await conn.sendMsg(m.chat, { image: img, jpegThumbnail: img, caption: '*DONE*' }, { quoted: m })
		}
	} else return m.reply('Reply / tag Sticker')
}

handler.help = ['toimg']
handler.tags = ['sticker']
handler.command = /^(toim(g|age))$/i

module.exports = handler
