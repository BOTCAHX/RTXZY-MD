var handler = async (m, {
 conn
 }) => {
  var stats = Object.entries(db.data.stats).map(([key, val]) => {
    var name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  var handlers = stats.slice(0, 100).map(({
   name, 
   total, 
   last
 }) => {
    return `乂 *Command* : *${name}*\n• *Global HIT* : ${total}`
  }).join`\n\n`
 conn.sendMessage(m.chat, {
text: handlers,
contextInfo: {
externalAdReply: {
title: "",
body: "",
thumbnailUrl: "https://telegra.ph/file/c43ee155efc11b774bee3.jpg",
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}})
};
handler.command = handler.help = ['dashboard', 'dash', 'views']
handler.tags = ['main']
module.exports = handler;