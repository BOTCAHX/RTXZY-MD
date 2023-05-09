var { 
Brainly
 } = require("brainly-scraper-v2");
var fetch = require("node-fetch");
var brainly = new Brainly('id');
var handler = async (m, { 
 conn,
 text
 }) => {
	if (!text) throw 'Masukan pertanyaan'
	var res = await brainly.search(text, 'id').catch(() => null)
	console.log(res)
	if (res) {
		var answer = res.map(({ question, answers }, i) => `
*Pertanyaan*${question.grade ? ` (${question.grade})` : ''}\n${question.content}${answers.map((v, i) => `
*Jawaban Ke ${i + 1}*${v.verification ? ' (Verified)' : ''}${v.isBest ? ' (Best)' : ''}
${v.content}${v.attachments.length > 0 ? `\n*Media Url*: ${v.attachments.join(', ')}` : ''}`).join``}`).join('\n' + '-'.repeat(45))
		m.reply(answer.trim())
		} else {
		var answer = await (await fetch(API('violetics', '/api/media/brainly', { query: text }, 'apikey'))).json()
		answer = answer.result
		if (!answer.length) throw 'Not found'
		for (var x = 0; x < answer.length; x++) {
			await m.reply(`*${answer[x].pertanyaan}*\n_${answer[x].source}_\n${answer[x].jawaban}`)
			await delay(2000)
		}
	}
};
handler.command = handler.help = ['brainly'];
handler.tags = ['tools'];
handler.limit = true;
module.exports = handler;