let handler = async (m, {
	conn
}) => {
	let __timers = (new Date - global.db.data.users[m.sender].lastngewe)
	let _timers = (500000 - __timers)
	let timers = clockString(_timers)
	let user = global.db.data.users[m.sender]
	if (new Date - global.db.data.users[m.sender].lastngewe > 500000) {
		let hsl = `Kamu Terbaring Lemas Karna Melakukan Skidipapap 24 Jam Tetapi Kamu Mendapatkan:
3000 Koin
1000 Exp
10 Limit
Dan Gratis Boba + Nasi Padang
`
		global.db.data.users[m.sender].koin += 3000
		global.db.data.users[m.sender].exp += 1000
		global.db.data.users[m.sender].limit += 10

		setTimeout(() => {
			conn.reply(m.chat, hsl, m)
		}, 20000)

		setTimeout(() => {
		    conn.reply(m.chat, `Kamu Di Paksa Untuk Melayaninya 24 Jam`, m)
		}, 18000)

		setTimeout(() => {
			conn.reply(m.chat, `Kamu Mulai Melakukan Skidipapap Dengannya`, m)
		}, 15000)

		setTimeout(() => {
			conn.reply(m.chat, `Kamu Mendapatkan Pelanggan Dan Pergi Ke Hotel`, m)
		}, 14000)

		setTimeout(() => {
			conn.reply(m.chat, `Sedang Mencari Pelanggan`, m)
		}, 0)
		user.lastngewe = new Date * 1
	} else conn.reply(m.chat, `*Kamu Sudah Kecapekan*\n*Silahkan Istirahat Dulu Selama* ${timers}`, m)
}
handler.help = ['openbo']
handler.tags = ['rpg']
handler.command = /^(openbo)$/i
handler.group = true
module.exports = handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Hari*\n ', h, ' *Jam*\n ', m, ' *Menit*\n ', s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('')
}