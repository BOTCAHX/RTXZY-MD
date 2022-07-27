let axios = require("axios");
let handler = async(m, { conn, text }) => {

  await m.reply('Searching...')
	axios.get(`https://leyscoders-api.herokuapp.com/api/cerpen?apikey=MIMINGANZ`).then ((res) => {
	 	let hasil = `*Judul :${res.data.result.title}*
*Pengarang*: ${res.data.result.pengarang}
*Kategori*: ${res.data.result.kategori}
*Story*:
${res.data.result.story}`
    const ftroli = {
    key : {
    remoteJid: '6283136505591-1614953337@g.us',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 26-9999, 
    status: 1,
    surface : 1,
    message: 'Random Cerita Pendek', 
    orderTitle: `▮Menu ▸`,
    thumbnail: 'https://telegra.ph/file/5ecbec3e82e247671a18e.jpg', 
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
    conn.reply(m.chat, hasil, ftroli)
	})
}
handler.help = ['cerpen']
handler.tags = ['fun', 'internet']
handler.command = /^(cerpen)$/i

module.exports = handler
