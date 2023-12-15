let { groupsSettingUpdate } = require('@adiwajshing/baileys')
let handler = async (m, { isAdmin, isOwner, isBotAdmin, conn, args, usedPrefix, command }) => {
	if (!(isAdmin || isOwner)) {
		global.dfail('admin', m, conn)
		throw false
	}
	if (!isBotAdmin) {
		global.dfail('botAdmin', m, conn)
		throw false
	}
let prefix = usedPrefix
let bu = `Group telah di buka oleh @${m.sender.split`@`[0]} dan sekarang  semua member dapat mengirim pesan
ketik *${usedPrefix}group buka*
Untuk membuka grup!`.trim()            
    
	let isClose = {
		'open': 'not_announcement',
		'buka': 'not_announcement',
		'on': 'not_announcement',
		'1': 'not_announcement',
		'close': 'announcement',
		'tutup': 'announcement',
		'off': 'announcement',
		'0': 'announcement',
	}[(args[0] || '')]
	if (isClose === undefined) {
var text5 = `contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka
	`
m.reply(text5)

		throw false
	} else if (isClose === 'announcement') {
	await conn.groupSettingUpdate(m.chat, isClose)
	let teks = `Group telah di tutup oleh @${m.sender.split`@`[0]} dan sekarang hanya admin yang dapat mengirim pesan
ketik *${usedPrefix}group buka*
Untuk membuka grup!`.trim()
	await m.reply(teks)
	} else if (isClose === 'not_announcement') {
	await conn.groupSettingUpdate(m.chat, isClose)
	await m.reply(bu)
	} else if (isClose === undefined) {

var te = `
contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka`

m.reply(te)

	}
}

handler.help = ['grup <open/close>']
handler.tags = ['group']
handler.command = /^(g(ro?up|c?)?)$/i
handler.group = true
handler.botAdmin = false

module.exports = handler
