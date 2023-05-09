let axios = require("axios");

let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Masukan Teksnya', m)

	axios.get(`https://some-random-api.ml/binary?text=${text}`).then ((res) => {
	 	let hasil = `Teks : ${text}\nBinary : ${res.data.binary}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['binary'].map(v => v + ' <teks>')
handler.tags = ['tools']
handler.command = /^(binary)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler
