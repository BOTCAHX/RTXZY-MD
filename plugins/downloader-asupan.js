let handler = async(m, { conn }) => {
  const asupan = [
    `https://api.botcahx.live/api/asupan/rikagusriani?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/santuy?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/ukhty?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/bocil?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/gheayubi?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/natajadeh?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/euni?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/douyin?apikey=${btc}`
  ]
  try {
    const url = pickRandom(asupan);
    await conn.sendFile(m.chat, url, 'asupan.mp4', '', m);
  } catch (e) {
    console.log(e);
    m.reply('Maaf, video asupan tidak ditemukan');
  }
}

handler.help = ['asupan']
handler.tags = ['downloader']
handler.command = /^asupan$/i
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

module.exports = handler
