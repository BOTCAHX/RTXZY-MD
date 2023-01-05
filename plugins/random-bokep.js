var handler = async(m, {
conn 
}) => {
  await conn.sendFile(m.chat, pickRandom(bokeps), 'okepcuy.mp4', '', m)
}
handler.help = ['bkp']
handler.tags = ['internet']
handler.command = /^bkp$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.register = true

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const bokeps = [
"https://telegra.ph/file/41be5fe60d941c9a0b011.mp4",
"https://telegra.ph/file/44ca9adce61ad0c934d41.mp4",
"https://telegra.ph/file/be307fb2cf0b5b3ab7858.mp4",
"https://telegra.ph/file/11558a4300c831763a71e.mp4",
"https://telegra.ph/file/44cbb5a08b36a56479060.mp4",
"https://telegra.ph/file/917e68d4cb400052580ad.mp4",
"https://telegra.ph/file/00c77d6da3d87104dbb8c.mp4",
"https://telegra.ph/file/d9908b9008774eab5ae96.mp4",
"https://telegra.ph/file/00b4186855f70f8eed782.mp4",
"https://telegra.ph/file/bb95f9961c59ed978da45.mp4",
"https://telegra.ph/file/bfadd7c8218c10d87f0c5.mp4",
"https://telegra.ph/file/d1720e3eee59b92454884.mp4",
"https://telegra.ph/file/043db102cf9df494a9cc6.mp4",
"https://telegra.ph/file/50eea57dd962bf6c830d2.mp4",
"https://telegra.ph/file/f1f8d6de2cde1e90ea3bc.mp4",
"https://telegra.ph/file/a26a8f1c59cb56a0b8cd0.mp4",
"https://telegra.ph/file/aea0628af892ec4834f0b.mp4",
]
