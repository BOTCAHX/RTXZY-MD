let handler = async (m, { conn }) => {
    let __timers = (new Date() - (global.db.data.users[m.sender].lastngewe || 0))
    let _timers = (7200000 - __timers) // 2 jam dalam milidetik
    let timers = _timers >= 0 ? clockString(_timers) : "waktu sudah habis"
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let kerja = 'ewe-paksa'
    conn.misi = conn.misi ? conn.misi : {}
    if (id in conn.misi) {
        conn.reply(m.chat, `Selesaikan Misi ${conn.misi[id][0]} Terlebih Dahulu`, m)
        throw false
    }
    if (new Date() - user.lastngewe > 7200000 || !user.lastngewe) { // Ubah kondisi cooldown
        let randomaku1 = Math.floor(Math.random() * 1000000)
        let randomaku2 = Math.floor(Math.random() * 10000)
        
        var dimas = `
👙 kamu paksa
     dia buka baju🤭
`.trim()

        var dimas2 = `
🥵💦 sszz Ahhhh.....
`.trim()

        var dimas3 = `
🥵Ahhhh, Sakitttt!! >////<
 💦Crotttt.....
  💦Crottt lagi
`.trim()

        var dimas4 = `
🥵💦💦Ahhhhhh😫
`.trim()

        var hsl = `
*—[ Hasil Ewe Paksa ${name} ]—*
➤ 💰 Uang = [ ${randomaku1} ]
➤ ✨ Exp = [ ${randomaku2} ]
➤ 😍 Order Selesai = +1
`.trim()

        user.money += randomaku1
        user.exp += randomaku2
        
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
            m.reply('🤭mulai ewe paksa..')
        }, 0)
        
        setTimeout(() => {
            m.reply(`⏳ Waktu untuk *Ewe-paksa* selanjutnya sudah tiba! Gunakan *ewe-paksa* sekarang untuk mendapatkan lebih banyak hadiah!`)
        }, _timers)
        
        user.lastngewe = new Date() * 1
    } else m.reply(`Silahkan Menunggu Selama ${timers} lagi untuk melakukan *Ewe-paksa* kembali`)
}

handler.help = ['ewe-paksa @tag']
handler.tags = ['rpg']
handler.command = /^(ewe-paksa)$/i
handler.register = true
handler.group = true
module.exports = handler 

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    let result = []
    if (h > 0) result.push(`${h} jam`)
    if (m > 0) result.push(`${m} menit`)
    if (s > 0) result.push(`${s} detik`)
    if (result.length === 0) result.push('kurang dari 1 detik')
    return result.join(' ')
}