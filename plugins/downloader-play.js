const { servers, yta, ytv } = require('../lib/y2mate')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} dj tiktok`
  m.reply(wait)
  let chat = global.db.data.chats[m.chat]
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Konten Tidak ditemukan'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
  if (yt === false) throw 'semua server gagal'
  if (yt2 === false) throw 'semua server gagal'
  let { dl_link, thumb, title, filesize, filesizeF } = yt
  await conn.send2ButtonImg(m.chat, await (await fetch(thumb)).buffer(), `
*Judul:* ${title}
*Ukuran File Audio:* ${filesizeF}
*Ukuran File Video:* ${yt2.filesizeF}
*Server y2mate:* ${usedServer}
*Link Sumber:* 
${vid.url}
`.trim(), wm, 'Audio', `.yta ${vid.url}`, 'Video', `.yt ${vid.url}`, m)
}
handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^(p|play)$/i

handler.exp = 0

module.exports = handler
