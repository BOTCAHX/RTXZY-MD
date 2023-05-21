let handler = async(m, { conn }) => {
  const asupan = [
    `https://api.botcahx.live/api/asupan/rikagusriani?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/santuy?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/ukhty?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/bocil?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/gheayubi?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/gheayubi?apikey=${btc}`,
    `https://api.botcahx.live/api/asupan/euni?apikey=${btc}`
  ]
  await conn.sendFile(m.chat, pickRandom(asupan), 'asupan.mp4', '', m)
}
handler.help = ['asupan']
handler.tags = ['asupan']
handler.command = /^asupan$/i
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

module.exports = handler
