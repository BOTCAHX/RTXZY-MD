var fetch = require("node-fetch")
var handler = async(m, { 
conn,
text 
}) => {
  if (!text) return conn.reply(m.chat, 'Harap Masukan Username', m)
  await m.reply('Searching...')
    var res = await fetch(`https://api.tiodevhost.my.id/api/info/githubstalk?user=${text}`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    var thumb = await (await fetch(json.result.avatar_url)).buffer()
    var hasil = `*── 「 GITHUB STALK 」 ──*
➸ *Username*: ${json.result.login}
➸ *ID*: ${json.result.id}
➸ *Node ID:* ${json.result.node_id}
➸ *Repo public:* ${json.result.public_repos}
➸ *Follower:* ${json.result.followers}
➸ *Following:* ${json.result.following}
➸ *Location:* ${json.result.location}
➸ *Type:* ${json.result.type}
➸ *Admin site:* ${json.result.site_admin}
➸ *Name:* ${json.result.name}
➸ *Company:* ${json.result.company}
➸ *Blog:* ${json.result.blog}
➸ *Mail:* ${json.result.email}
➸ *Hireable:* ${json.result.hireable}
➸ *Bio:* ${json.result.bio}
➸ *Twitter:* ${json.result.twitter_username}
➸ *Publik gits:* ${json.result.public_gists}
➸ *Created at:* ${json.result.created_at}
➸ *Update at:* ${json.result.updated_at}
➸ *Link :* ${json.result.html_url}`

    conn.sendFile(m.chat, thumb, 'hasil.jpg', hasil, m)
};
handler.command = handler.help = ['githubstalk', 'ghstalk'];
handler.tags = ['stalk'];
module.exports = handler;
