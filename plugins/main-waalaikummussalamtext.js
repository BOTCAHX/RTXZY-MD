let handler = async (m, { conn }) => {
let ye = `@${m.sender.split`@`[0]}`
let esce = `
Hi Kak ${ye} Ada Yang Bisa Bot Bantu?\n\nKetik *.menu atau /menu, #menu* Untuk Melihat Menu Bot Nya :)\n\n> *Contoh : .menu*
`
let footer= 'Saya Adalah Salah Satu Bot WhatsApp.\n\nSilahkan Gunakan Sebijak Mungkin Demi kenyamanan Bersama :)\n\nHarap Untuk Tidak Menelpon, Meminta Save, Atau Spam Dalam Penggunaan Bot\n\nJika Ada Kendala Hubungi Owner / Creator'
conn.send2But(m.chat, esce, footer, 'Menu', '.menu', 'Thanks', 'iya', m,)
}
handler.customPrefix = /^(alive)$/i 
handler.command = new RegExp
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler
