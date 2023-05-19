let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, args }) => {
	let title = `— *S H O R T E D  U R L* —`
    let caption = 'Please select the URL type'
const sections = [
   {
	title: "TYPE URL",
	rows: [
	    {title: "TinyUrl", rowId: ".short " + args[0] + " tinyurl"},
	    {title: "Cuttly", rowId: ".short " + args[0] + " cuttly"},
	    {title: "Bitly", rowId: ".short " + args[0] + " bitly"},
	]
    },
]

const listMessage = {
  text: caption,
  footer: 'select option',
  title: title,
  buttonText: "Option",
  sections
}

if (!args[0]) return m.reply('Wheres the link?')
if (!args[0].startsWith('https://')) throw 'Enter Url With Prefix *https://*'
if (!args[1]) return conn.sendMessage(m.chat, listMessage, { quoted: m })

let tesk = '🚀 *Result link:* '
let pros = '_*Converting Link. . .*_'
//Case Tinyurl 
if (args[1] == "tinyurl") {
	let tiny = await (await fetch(`https://api.botcahx.live/api/linkshort/tinyurl?link=${args[0]}&apikey=${btc}`)).json()
m.reply(pros).then(_ => conn.reply(m.chat, `${tesk}${tiny.result}`,m))
}
//Case Cuttly
if (args[1] == "cuttly") {
	let cuttly = await (await fetch(`https://api.botcahx.live/api/linkshort/cuttly?link=${args[0]}&apikey=${btc}`)).json()
m.reply(pros).then(_ => conn.reply(m.chat, `${tesk}${cuttly.result.shortLink}`,m))
}
//Case Bitly 
if (args[1] == "bitly") {
	let bitly = await (await fetch(`https://api.botcahx.live/api/linkshort/bitly?link=${args[0]}&apikey=${btc}`)).json()
m.reply(pros).then(_ => conn.reply(m.chat, `${tesk}${bitly.result}`,m))
  }
}
handler.help = ['short <url> <type>']
handler.tags = ['internet']
handler.command = /^(short(url)?)$/i

module.exports = handler
