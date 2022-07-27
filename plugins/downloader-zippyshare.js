let handler = async (m, { conn, command, text, isPrems, isOwner }) => {
  if (!text) throw 'Uhm...urlnya mana?'
  try {
  apii = global.API('lolhuman', '/api/zippyshare', { url: text }, 'apikey')
  apis = await require('axios').get(apii)
  m.reply('Sabar Uhm, Lagi Download...')
  m.reply('Nama File : '+ apis.data.result.name_file)
  buffer = await getBuffer(apis.data.result.download_url)
  let { ext, mime } = await require('file-type').fromBuffer(buffer)
  m.reply('Sabar Uhm, Lagi Upload...')
  conn.sendMessage(m.chat, buffer, 'documentMessage', { mimetype: mime, filename: apis.data.result.name_file, quoted:m })
  } catch {
  throw 'Error!'
  }  
}
handler.help = ['zippyshare', 'zippy'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(zippy|zippyshare)$/i

handler.exp = 0

module.exports = handler

async function getBuffer(url) {
ff = await require('node-fetch')(url)
fff = await ff.buffer()
return fff
}