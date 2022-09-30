let axios = require("axios");
let handler = async(m, { conn, text }) => {
    let [email, pesan] = text.split `|`

    if (!email) return conn.reply(m.chat, 'Silahkan masukan nama email yang akan dispam', m)
    if (!pesan) return conn.reply(m.chat, 'Silahkan masukan pesan yang akan dispam', m)

    axios.get(`https://videfikri.com/api/spamemail/?email=${email}&subjek=SPAM%20GMAIL%20BOT&pesan=${pesan}`).then ((res) => {
         let hasil = `${res.data.result.log_lengkap}`

    conn.reply(m.chat, hasil, m)
    })
}
handler.help = ['spamgmail'].map(v => v + ' <@email|pesan>')
handler.tags = ['tools']
handler.command = /^(spamgmail)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler
