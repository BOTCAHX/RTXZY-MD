let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, 'Harap Masukan Username', m)

  await m.reply('Searching...')
    var res = await fetch('https://botcahx.ddns.net/api/info/githubstalk?user=${text}')
    var json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    var thumb = await (await fetch(json.result.avatar_url)).buffer()
    var hasil = `*── 「 GITHUB STALK 」 ──*

➸ *Bio*: ${json.result.bio}
➸ *Perusahaan*: ${json.result.company}
➸ *Email:* ${json.result.email}
➸ *Twitter:* ${json.result.twiter_username}
➸ *Repo Publik:* ${json.result.public_repos}
➸ *Gists Publik:* ${json.result.public_gists}
➸ *Follower:* ${json.result.followers}
➸ *Following:* ${json.result.following}
➸ *Lokasi:* ${json.result.location}
➸ *Type:* ${json.result.type}
➸ *Url:* ${json.result.url}
`

    conn.sendFile(m.chat, thumb, 'githubstalk.jpg', hasil, m)
}
handler.help = ['githubstalk'].map(v => v + ' <query>')
handler.tags = ['stalk']
handler.command = /^(githubstalk)$/i

module.exports = handler
