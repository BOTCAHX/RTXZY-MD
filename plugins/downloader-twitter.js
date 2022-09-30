const fetch = require('node-fetch')
let handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} https://twitter.com/gofoodindonesia/status/1229369819511709697`
  let res = await twitter(args[0])
  let result = res.result.reverse().filter(({ mime }) => /video/i.test(mime)), video, index
  for (let vid of result) {
    try {
      video = await (await fetch(vid.link)).buffer()
      index = result.indexOf(vid)
      break
    } catch (e) {
      err = e
      continue
    }
  }
  if (!video) throw 'Can\'t get video/image'
  let ress = result[index]
  conn.sendFile(m.chat, video, 'twitter' + /video/.test(ress.mime) ? '.mp4' : '.png', `
*Name:* ${res.name}
*Mime:* ${ress.mime}
`.trim(), m)
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^twitter$/i

module.exports = handler

const cheerio = require('cheerio')
const FormData = require('form-data')
async function twitter(url) {
  if (!/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i) throw 'Link invalid!'
  let form = new FormData()
  form.append('url', encodeURI(url))
  form.append('submit', '')
  let res = await fetch('https://www.expertsphp.com/instagram-reels-downloader.php', {
    method: 'POST',
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'cookie': '_ga=GA1.2.783835709.1637038175; _gid=GA1.2.880188214.1637038175; __gads=ID=5b4991618655cd86-22e2c7aeadce00ae:T=1637038176:RT=1637038176:S=ALNI_MaCe3McPrVVswzBEqcQlgnVZXtZ1g',
      'origin': 'https://www.expertsphp.com',
      'referer': 'https://www.expertsphp.com/twitter-video-downloader.html',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      ...form.getHeaders()
    },
    body: form
  })
  let html = await res.text()
  const $ = cheerio.load(html)
  let thumbnail = $('#showdata > img').attr('src')
  let result = []
  $('#showdata > div > table > tbody > tr').each(function () {
    result.push({
      link: $(this).find('td:nth-child(1) > a').attr('href'),
      mime: $(this).find('td:nth-child(2) > strong').text()
    })
  })
  let name = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/g
  name = [...url.matchAll(name)][0][1]
  return {
    name,
    thumbnail,
    result
  }
}
