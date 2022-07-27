let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan Username', m)

  await m.reply('Searching...')
    let res = await fetch(`https://x-restapi.herokuapp.com/api/tiktok-stalk?username=${text}&apikey=BETA`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.avatarLarger)).buffer()
    let hasil = `*── 「 TIK-TOK STALK 」 ──*

▢ *Nama*: ${json.username}
▢ *Follower*: ${json.followerCount}
▢ *Following*: ${json.followingCount}
▢ *Private*: ${json.isprivate}
▢ *Id*: ${json.id}
`

    conn.sendFile(m.chat, thumb, 'tiktokstalk.jpg', hasil, m)
}
handler.help = ['tiktokstalk'].map(v => v + ' <username>')
handler.tags = ['stalk']
handler.command = /^(tiktokstalk)$/i

module.exports = handler
