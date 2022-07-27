let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan nama aplikasi', m)

  await m.reply('Searching...')
    let res = await fetch(`https://caliphapi.com/api/playstore/search?apikey=ELYASXD&q=${text}`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = json.result[0].icon
    let hasil = `*── 「 PLAY STORE 」 ──*

▢ *NAMA*: ${json.result[0].title}
▢ *APP ID*: ${json.result[0].appId}
▢ *DEVELOPER*: ${json.result[0].developer}
▢ *STATUS*: ${json.result[0].priceText}
▢ *HARGA*: ${json.result[0].price}
▢ *RATING*: ${json.result[0].scoreText}
▢ *DESKRIPSI*: ${json.result[0].summary}
▢ *LINK*:  
${json.result[0].url}
`

    conn.sendButtonImg(m.chat, thumb, hasil, wm, 'Pencet', 'huuu', m)
}
handler.help = ['playstore'].map(v => v + ' <nama apk>')
handler.tags = ['internet']
handler.command = /^(playstore)$/i
handler.limit = true

module.exports = handler

/*let hxz = require('hxz-api')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text }) => {
    if (!text) throw 'Masukkan Link\n\nContoh: .playstore coc'
  let res = await hxz.playstore(text)
conn.sendBut(m.chat, `*PLAY STORE*

NAMA: ${res[0].name}
DEVELOPER: ${res[0].developer}
LINK: ${res[0].link}`, wm, 'ok', 'huuu', m)

}
handler.help = ['playstore' <apk>]
handler.tags = ['internet']
handler.command = /^playstore$/i


module.exports = handlerhandler
*/
