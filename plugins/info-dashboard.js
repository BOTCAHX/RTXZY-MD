let handler = async (m, { conn }) => {
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    var name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  var handlers = stats.slice(0, 100).map(({
   name, 
   total, 
   last
 }, i) => {
    return `▪️ *${i+1}. Command* : *${name}*\n   • *Global HIT* : ${total}`
  }).join`\n\n`
  conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: handlers, 
      contextInfo: {
        externalAdReply: {
          title: "",
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://telegra.ph/file/c43ee155efc11b774bee3.jpg',
          sourceUrl: ''
        }
      },
      mentions: [m.sender]
    }
  }, {})
};

handler.command = handler.help = ['dashboard']
handler.tags = ['info']
module.exports = handler; 
