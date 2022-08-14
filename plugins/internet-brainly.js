let fetch = require('node-fetch')
let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} membaca`
    let res = await fetch(`https://api.xteam.xyz/brainly?soal=${text}&APIKEY=cristian9407`)
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    m.reply(json.jawaban)
}
handler.help = ['Brainly <teks>']
handler.tags = ['internet']
handler.command = /^brainly$/i
module.exports = handler
