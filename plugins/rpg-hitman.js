let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].kerjaempat)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    let name = await conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
	let kerja = 'Bunuh'
    conn.misi = conn.misi ? conn.misi : {}
    if (id in conn.misi) {
        conn.reply(m.chat, `Selesaikan Misi ${conn.misi[id][0]} Terlebih Dahulu`, m)
        throw false
    }
    if (new Date - global.db.data.users[m.sender].kerjaempat > 3600000) {
        let randomaku4 = Math.floor(Math.random() * 10)
        let randomaku5 = Math.floor(Math.random() * 10)

        let rbrb4 = (randomaku4 * 100000)
        let rbrb5 = (randomaku5 * 1000)

        var dimas = `
🕵️ Mendapatkan Target.....
`.trim()

        var dimas2 = `
⚔️ Menusuk Tubuhnya.....
`.trim()

        var dimas3 = `
☠️ Target meninggal\nDan kamu mengambil barang² nya
`.trim()

        var dimas4 = `
💼 Hasil dari membunuh....
`.trim()

        var hsl = `
*—[ Hasil ${name} ]—*
➕ 💹 Uang = [ ${rbrb4} ]
➕ ✨ Exp = [ ${rbrb5} ]
➕ 👮 Pelanggaran +1
➕ ☑️ Misi Berhasil = +1
`.trim()

		user.money += rbrb4
        user.exp += rbrb5
        user.warn += 1

		conn.misi[id] = [
        	kerja,
        setTimeout(() => {
            delete conn.misi[id]
        }, 27000)
    	]
        setTimeout(() => {
            m.reply(hsl)
        }, 27000)

        setTimeout(() => {
            m.reply(dimas4)
        }, 25000)

        setTimeout(() => {
            m.reply(dimas3)
        }, 20000)

        setTimeout(() => {
            m.reply(dimas2)
        }, 15000)

        setTimeout(() => {
            m.reply(dimas)
        }, 10000)

        setTimeout(() => {
            m.reply('🔍Mencari Target pembunuhan.....')
        }, 0)
        user.kerjaempat = new Date * 1
    } else m.reply(`Silahkan Menunggu Selama ${timers}, Untuk Menyelesaikan Misi Kembali`)
}
handler.help = ['hitman']
handler.tags = ['rpg']
handler.command = /^(bunuh|hitman)$/i
handler.register = true
handler.group = true
handler.level = 10
handler.rpg = true
module.exports = handler

    function clockString(ms) {
        let h = Math.floor(ms / 3600000)
        let m = Math.floor(ms / 60000) % 60
        let s = Math.floor(ms / 1000) % 60
        return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}