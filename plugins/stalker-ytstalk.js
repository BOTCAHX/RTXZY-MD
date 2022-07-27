let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan Nama channel', m)

  await m.reply('Searching...')
    let res = await fetch(`https://x-restapi.herokuapp.com/api/yt-stalk?username=${text}&apikey=BETA`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.thumb)).buffer()
    let hasil = `*── 「 YOU-TUBE STALK 」 ──*

▢ *Nama*: ${json.channel}
▢ *Subscriber*: ${json.subscriberCount}
▢ *Verivikasi*: ${json.isVerified}
▢ *Link*: ${json.link}
▢ *Deskripsi*: ${json.description}
`

    conn.sendFile(m.chat, thumb, 'ytstalk.jpg', hasil, m)
}
handler.help = ['ytstalk','youtubestalk'].map(v => v + ' <channel>')
handler.tags = ['stalk', 'internet']
handler.command = /^(ytstalk|youtubestalk)$/i

module.exports = handler
