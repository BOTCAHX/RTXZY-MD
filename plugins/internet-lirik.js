var {
	lyrics,
	lyricsv2
} = require('@bochilteam/scraper');

var handler = async (m, {
	conn,
	text,
	usedPrefix,
	command
}) => {
	var teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
	if (!teks) throw `Use example ${usedPrefix}${command} hallo`
	var result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
	m.reply(`
Lyrics *${result.title}*
Author ${result.author}
${result.lyrics}
Url ${result.link}
`.trim())
};

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet'];
handler.command = /^(lirik|lyrics|lyric)$/i
module.exports = handler;
