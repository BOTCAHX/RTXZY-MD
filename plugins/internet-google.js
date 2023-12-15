let fetch = require('node-fetch')
let googleIt = require('google-it')
let handler = async (m, { conn, command, args }) => {
  let full = /f$/i.test(command)
  let text = args.join` `
  if (!text) return conn.reply(m.chat, 'Tidak ada teks untuk di cari', m)
  let url = 'https://google.com/search?q=' + encodeURIComponent(text)
  let search = await googleIt({ query: text })
  let msg = search.map(({ title, link, snippet}) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n`
  try {
    var logos = 'https://telegra.ph/file/cf62f2b8648a352548978.jpg'
	conn.sendFile(m.chat, logos, 'logos.jpg', url + '\n\n' + msg, m)
  } catch (e) {
    m.reply(msg)
  }
}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.fail = null

module.exports = handler