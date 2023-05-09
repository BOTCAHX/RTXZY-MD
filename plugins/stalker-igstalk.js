const axios = require('axios')
const cheerio = require('cheerio')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `Gunakan format ${usedPrefix}${command} [username]
Contoh: ${usedPrefix}${command} jokowi
`.trim()
  let res = await igstalk(args[0])
  let json = JSON.parse(JSON.stringify(res))
  let iggs = `
▢ *Username:* ${json.username}
▢ *Nickname:* ${json.fullName}
▢ *Followers:* ${json.followersM}
▢ *Following:* ${json.followingM}
▢ *Posting:* ${json.postsCountM}
▢ *Link:* https://instagram.com/${json.username}
▢ *Bio:* ${json.bio}
`.trim() // tambahin sendiri json.blablabla :)
  conn.sendFile(m.chat, json.profilePicHD, 'error.jpg', iggs, m)
}
handler.help = ['igstalk <username>']
handler.tags = ['stalk']
handler.command = /^(igstalk)$/i
handler.limit = true

module.exports = handler

async function igstalk(username) {
  try {
    const { data } = await axios.get(`https://dumpor.com/v/${username}`, {
      headers: {
        "user-agent": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYT3dzSXI2YWR6SG1fNFdmTllfZnFIZ1Ra.5Og9VRy7gUy9IsCwUeYW8O8qvHbndaus-cqBRaZ7jcg; __gads=ID=f8ead4404e6a0e16-2206b4189ace0028:T=1636352226:RT=1636352226:S=ALNI_MbsEYYwp3U-9PJHoUHPA0mj4zn3uQ; _ym_uid=1636352226596108095; _ym_d=1636352226; _ym_isad=2; __atssc=google%3B1; FCNEC=[[\"AKsRol8BmQbGXTRP_1wzoi3Qg8PSMr7FFU0k- LGYROfG4nmvg - yFq6fARCalcofDHQIoyhwlo75582yk2a5WLTZakmPZu - SIkkXQNAePmtpVXwaPISfK8HC1pJ8tUjrRWRiFfjPaZh3rC - _6nkHQN25c - 1YR- NJtDQ == \"],null,[]]; FCCDCF=[null,null,[\"[[], [], [], [], null, null, true]\",1636352300969],null,null,null,[]]; __atuvc=3%7C45; __atuvs=6188c0df986e798b002"
      }
    })
    const $ = cheerio.load(data)
    const results = {
      username: ($('#user-page > div.user > div.row > div > div.user__title > h4').text() || '').replace(/@/gi, '').trim(),
      fullName: $('#user-page > div.user > div.row > div > div.user__title > a > h1').text(),
      profilePicHD: ($('#user-page > div.user > div.row > div > div.user__img').attr('style') || '').replace(/(background-image: url\(\'|\'\);)/gi, '').trim(),
      bio: $('#user-page > div.user > div.row > div > div.user__info-desc').text(),
      followers: ($('#user-page > div.user > div.row > div > ul > li').eq(1).text() || '').replace(/Followers/gi, '').trim(),
      followersM: ($('#user-page > div.container > div > div > div:nth-child(1) > div > a').eq(2).text() || '').replace(/Followers/gi, '').trim(),
      following: ($('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li').eq(2).text() || '').replace(/Following/gi, '').trim(),
      followingM: ($('#user-page > div.container > div > div > div:nth-child(1) > div > a').eq(3).text() || '').replace(/Following/gi, '').trim(),
      postsCount: ($('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li').eq(0).text() || '').replace(/Posts/gi, '').trim(),
      postsCountM: ($('#user-page > div.container > div > div > div:nth-child(1) > div > a').eq(0).text() || '').replace(/Posts/gi, '').trim()
    }
    return results
  } catch (e) {
    console.error(e)
    throw 'Not found ;-;'
  }
}
