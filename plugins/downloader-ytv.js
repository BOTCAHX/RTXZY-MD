const fetch = require('node-fetch')
const { servers, ytv } = require('../scraper/youtube')
const limit = 30

async function shortlink(url) {
  const isUrl = /https?:\/\//.test(url)
  return isUrl ? (await require('axios').get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url))).data : ''
}

async function handler(m, { conn, args, isPrems, isOwner }) {
  if (!args || !args[0]) {
    throw 'Uhm... urlnya mana?'
  }

  const chat = db.data.chats[m.chat]
  const server = (args[1] || servers[0]).toLowerCase()
  const { dl_link, thumb, title, filesize, filesizeF } = await ytv(args[0], servers.includes(server) ? server : servers[0])
  
  const isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*Title:* ${title}
*${isLimit ? 'Pakai ' : ''}Link:* ${await shortlink(dl_link)}
`.trim(), m)
  
  let _thumb = {}
  try { 
    _thumb = { thumbnail: await (await fetch(thumb)).buffer() } 
  } catch (e) { }
  
  if (!isLimit) {
    conn.sendFile(
      m.chat, 
      dl_link, 
      title + '.mp4', 
      `*Title:* ${title}`.trim(), 
      m, 
      false, 
      {
        ..._thumb,
        asDocument: chat.useDocument
      }
    )
  }
}

handler.help = ['ytv <url> [server: ' + servers.join(', ') + ']']
handler.tags = ['downloader']
handler.command = /^ytv?$/i


handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler



