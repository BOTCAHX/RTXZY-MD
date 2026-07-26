import fs from 'fs'
import crypto from 'crypto'
let handler  = async (m, { conn, text }) => {
m.reply('Tunggu Sebentar, Proses Getting File database.json')
let db = fs.readFileSync('./database.json')
conn.sendMessage(m.chat, { document: db, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m })
}
handler.help = ['getdb','getdatabase'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(db|getdb)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => crypto.randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
