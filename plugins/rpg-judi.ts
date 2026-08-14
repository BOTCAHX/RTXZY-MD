import type { WaGameRoom } from '../types/connection.js';
let buatall = 1
let handler: WaPlugin = async (m, { conn, args, usedPrefix, isOwner }) => {
    conn.judi = conn.judi ? conn.judi : {}
    if (m.chat in conn.judi) return conn.reply (m.chat, 'Masih ada yang melakukan judi disini, tunggu sampai selesai!!', m)
    else conn.judi[m.chat] = true as unknown as WaGameRoom
    try {
    	let __waktutionskh = (Date.now() - global.db.data.users[m.sender].judilast)
        let _waktutionskh = (5000 - __waktutionskh)
        let waktutionskh = clockString(_waktutionskh)
        if (Date.now() - global.db.data.users[m.sender].judilast > 5000) {
        global.db.data.users[m.sender].judilast = Date.now()
        let randomaku = `${Math.floor(Math.random() * 350)}`.trim()
        let randomkamu = `${Math.floor(Math.random() * 50)}`.trim()                // narrower roll range makes winning hard for the player
        let Aku = (+randomaku)
        let Kamu = (+randomkamu)
        let count = args[0]
        count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
        const countN = Math.max(1, +count || 1)
        if (args.length < 1) return conn.reply(m.chat, '• *Example :* .judi 1000', m)
        if (global.db.data.users[m.sender].money >= +countN) {
            global.db.data.users[m.sender].money -= +countN
            if (Aku > Kamu) {
                conn.reply(m.chat, `aku roll:${Aku}\nKamu roll: ${Kamu}\n\nkamu *Kalah*, kamu kehilangan ${countN} money`.trim(), m)
            } else if (Aku < Kamu) {
                global.db.data.users[m.sender].money += countN * 2
                conn.reply(m.chat, `aku roll:${Aku}\nKamu roll: ${Kamu}\n\nkamu *Menang*, kamu Mendapatkan ${countN * 2} money`.trim(), m)
            } else {
                global.db.data.users[m.sender].money += +countN
                conn.reply(m.chat, `aku roll:${Aku}\nKamu roll: ${Kamu}\n\nkamu *Seri*, kamu Mendapatkan ${+countN} money`.trim(), m)
            }
        } else conn.reply(m.chat, `Money kamu tidak cukup untuk melakukan judi sebesar ${countN} money`.trim(), m)
      } else conn.reply(m.chat, `Kamu sudah judi, tidak bisa judi kembali..\nMohon tunggu ${waktutionskh} lagi untuk judi kembali `, m)
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Error!!', m)
   } finally {
        delete conn.judi[m.chat]
    }
 }
handler.help = ['judi']
handler.tags = ['rpg']
handler.command = /^(judi)$/i
handler.group = true
handler.rpg = true

handler.fail = null

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, '0') ).join(':')
}