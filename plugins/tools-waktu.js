let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Masukan Nama Daerahnya', m)

	axios.get(`https://tobz-api.herokuapp.com/api/jamdunia?lokasi=${text}&apikey=BotWeA`).then ((res) => {
	 	let hasil = `Waktu Daerah *${text}*\n\nJam : ${res.data.time}\nTanggal : ${res.data.date}\nInfo : ${res.data.title}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['waktu'].map(v => v + ' <daerah>')
handler.tags = ['tools']
handler.command = /^(waktu)$/i
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