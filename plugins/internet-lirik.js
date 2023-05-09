var hxz = require('hxz-api')

var handler = async (m, {
	conn,
	text,
	usedPrefix,
	command
}) => {
		var teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
		if (!teks) throw `Use example ${usedPrefix}${command} hallo`
	try {
		var result = await hxz.lirik(text)
		conn.sendFile(m.chat, result.thumb, 'thumb.jpg', result.lirik, m)

	} catch (e) {
		console.log(e)
		m.reply('Terjadi kesalahan, silahkan coba lagi nanti')
	}
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler