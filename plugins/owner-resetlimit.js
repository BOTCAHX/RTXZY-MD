let handler = async (m, { conn, args }) => {
	let list = Object.entries(global.db.data.users)
	let lim = !args || !args[0] ? 999 : isNumber(args[0]) ? parseInt(args[0]) : 10
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		conn.reply(m.chat, `*Limit berhasil direset ${lim} / user*`, m)
}
handler.help = ['limit'].map(v => 'reset' + v)
handler.tags = ['owner']
handler.command = /^(resetlimit|risetlimit)$/i

handler.owner = true

module.exports = handler

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}
