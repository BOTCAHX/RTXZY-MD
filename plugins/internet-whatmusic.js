let FormData = require('form-data')
let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `Balas music yang ingin dicari dengan caption *${usedPrefix + command}*`
 m.reply('Wait Ngap, Lagi Cari....')
				const bodyForm = new FormData()
			        bodyForm.append('audio', await q.download(), 'music.mp3')
           			bodyForm.append('apikey', 'caliph_71')
           			axios('https://api.zeks.me/api/searchmusic', {
                		method: 'POST',
                		headers: {
				"Content-Type": "multipart/form-data",
        			...bodyForm.getHeaders()
                		},
                		data: bodyForm
            			})
                		.then(({data}) =>{
				  m.reply(`*Lagu Ditemukan!*\n\n*Judul* : ${data.data.title}\n*Artist* : ${data.data.artists}\n*Genre* : ${data.data.genre}\n*Album* : ${data.data.album}\n*Release* : ${data.data.release_date}`)
				}).catch(() => {
				m.reply('Lagu Tidak Ditemukan!\nLu Nyari DJ Remix ya?')
				})
				
}
handler.help = ['whatmusic', 'judullagu']
handler.tags = ['tools', 'internet']

handler.command = /^(whatmusic|judullagu)$/i

module.exports = handler
