let handler = async (m, { conn, usedPrefix }) => {
	let user = global.db.data.users[m.sender]
	let cap = `*━ ❨ Karung Hasil Mulung ❩ ━*

=> *Berikut Karung :*  @${m.sender.split`@`[0]}

*Kaleng = [ ${user.kaleng} ]*
*Botol = [ ${user.botol} ]*
*Kardus = [ ${user.kardus} ]*
*Sampah = [ ${user.sampah} ]*

Gunakan *${usedPrefix}sell* untuk dijual`

	conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) } )
}

handler.help = ['karung']
handler.tags = ['rpg']
handler.command = /^(karung)$/i

module.exports = handler