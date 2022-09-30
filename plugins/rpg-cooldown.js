let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix }) => {
	
	let { lasthourly, lastberburu, lastbansos, lastadventure, lastfishing, lastwar, lastduel, lastmining, lastdungeon, lastclaim, lastweekly, lastmonthly } = global.db.data.users[m.sender]
	
    let healt = global.db.data.users[m.sender].healt
    let stamina = global.db.data.users[m.sender].stamina
    let armor = global.db.data.users[m.sender].armor 
    let sword = global.db.data.users[m.sender].sword
    let sdurability = global.db.data.users[m.sender].sworddurability
    let warn = global.db.data.users[m.sender].warn
    let tprem = global.db.data.users[m.sender].tprem
    let pancing = global.db.data.users[m.sender].pancing
    let fdurability = global.db.data.users[m.sender].fishingroddurability
    let role = global.db.data.users[m.sender].role
    let pickaxe = global.db.data.users[m.sender].pickaxe
    let pdurability = global.db.data.users[m.sender].pickaxedurability

    let psepick = global.db.data.users[m.sender].psepick
    let psenjata = global.db.data.users[m.sender].psenjata

    let ikan= global.db.data.users[m.sender].ikan
    let nila= global.db.data.users[m.sender].nila
    let bawal= global.db.data.users[m.sender].bawal
    let lele= global.db.data.users[m.sender].lele
    let udangb= global.db.data.users[m.sender].udang

    let apel = global.db.data.users[m.sender].apel
    let ayamg = global.db.data.users[m.sender].ayamg
    let ayamb = global.db.data.users[m.sender].ayamb
    let sapir = global.db.data.users[m.sender].sapir
    let ssapi = global.db.data.users[m.sender].ssapi
    let kayu = global.db.data.users[m.sender].kayu
    let string = global.db.data.users[m.sender].string
    let emas = global.db.data.users[m.sender].emas
    let besi = global.db.data.users[m.sender].iron
    let batu = global.db.data.users[m.sender].batu
    let sapi = global.db.data.users[m.sender].sapi
    let ayam = global.db.data.users[m.sender].ayam
    let babi = global.db.data.users[m.sender].babi
    let banteng = global.db.data.users[m.sender].banteng
    let pet = global.db.data.users[m.sender].pet
    let kucing = global.db.data.users[m.sender].kucing
    let _kucing = global.db.data.users[m.sender].anakkucing
    let rubah = global.db.data.users[m.sender].rubah
    let _rubah = global.db.data.users[m.sender].anakrubah
    let kuda = global.db.data.users[m.sender].kuda
    let _kuda = global.db.data.users[m.sender].anakkuda
    let diamond = global.db.data.users[m.sender].diamond
    let potion = global.db.data.users[m.sender].potion
    let common = global.db.data.users[m.sender].common
    let makananpet = global.db.data.users[m.sender].makananpet
    let uncommon = global.db.data.users[m.sender].uncommon
    let mythic = global.db.data.users[m.sender].mythic
    let legendary = global.db.data.users[m.sender].legendary
    let level = global.db.data.users[m.sender].level
    let money = global.db.data.users[m.sender].money
    let exp = global.db.data.users[m.sender].exp
    let atm = global.db.data.users[m.sender].atm
    let arlok = global.db.data.users[m.sender].arlok
    let limit = global.db.data.users[m.sender].limit
    let glimit = global.db.data.users[m.sender].glimit
    let sampah = global.db.data.users[m.sender].sampah
    let { max } = levelling.xpRange(level, exp, global.multiplier)
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
    let sortedgold = Object.entries(global.db.data.users).sort((a, b) => b[1].gold - a[1].gold)
    let sortedarlok = Object.entries(global.db.data.users).sort((a, b) => b[1].arlok - a[1].arlok)
    let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
    let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
    let usersmoney = sortedmoney.map(v => v[0])
    let usersgold = sortedgold.map(v => v[0])
    let usersarlok = sortedarlok.map(v => v[0])
    let usersdiamond = sorteddiamond.map(v => v[0])
    let userspotion = sortedpotion.map(v => v[0])
    let userssampah = sortedsampah.map(v => v[0])
    let userslevel = sortedlevel.map(v => v[0])
    let userscommon = sortedcommon.map(v => v[0])
    let usersuncommon = sorteduncommon.map(v => v[0])
    let usersmythic = sortedmythic.map(v => v[0])
    let userslegendary = sortedlegendary.map(v => v[0])
    let pp = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=Inventory'
    let str = `
*—「 🕖 Cooldown 」—*
*Last Berburu :* ${lastberburu > 0 ? '❌' : '✅'}
*Last Memancing :* ${lastfishing > 0 ? '❌' : '✅'}
*Last Adventure :* ${lastadventure > 0 ? '❌' : '✅'}
*Last Duel :* ${lastduel > 0 ? '❌' : '✅'}
*Last War :* ${lastwar > 0 ? '❌'  : '✅'}
*Last Dungeon :* ${lastdungeon > 0 ? '❌' : '✅'}
*Last Mining :* ${lastmining > 0 ? '❌' : '✅'}
*Last Bansos :* ${lastbansos > 0 ? '❌' : '✅'}
*Last Hourly :* ${lasthourly > 0 ? '❌' : '✅'}
*Last Claim :* ${lastclaim > 0 ? '❌' : '✅'}
*Last Weekly :* ${lastweekly > 0 ? '❌' : '✅'}
*Last Monthly :* ${lastmonthly > 0 ? '❌' : '✅'}
\n${readMore}
⚠️ *Warn:* ${warn}
⛔ *Banned:* No
`.trim()
    conn.send2But(m.chat, str, wm2, `Inventory`, `.inv`, `Profile`, `.profile`, m)
    conn.reply(str)
}
handler.help = ['cd','cooldown']
handler.tags = ['rpg']
handler.command = /^(cd|cooldown)$/i
handler.register = false
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

