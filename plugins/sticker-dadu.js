const dir = [
  'https://storage.caliph71.xyz/dadu/v2/5.webp',
  'https://storage.caliph71.xyz/dadu/v2/4.webp',
  'https://storage.caliph71.xyz/dadu/v2/3.webp',
  'https://storage.caliph71.xyz/dadu/v2/2.webp',
  'https://storage.caliph71.xyz/dadu/v2/1.webp',
  'https://storage.caliph71.xyz/dadu/v2/6.webp'
];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dadu.webp', '', m)
}
handler.help = ['dadu']
handler.tags = ['sticker', 'fun']
handler.command = /^dadu$/i

module.exports = handler
