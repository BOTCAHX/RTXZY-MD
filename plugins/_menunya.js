// Menu Configuration by TioXd 
// //default//
// let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
// let levelling = require('../lib/levelling')
// let fs = require('fs')
// const util = require('util')
// const os = require('os')
// let path = require('path')
// let { createHash} = require('crypto')
// let fetch = require('node-fetch')
// let { perfomance } = require('perf_hooks')
// let moment = require('moment-timezone')

// //default style//
// const defaultMenu = {
  // before:`
// ┌────「 *${global.namebot}* 」
// ├◇ Hai, %name!
// ├◇ Tersisa %limit Limit
// ├◇ Role %role
// ├◇ Level %level (%exp / %maxexp)
// ├◇ [%xp4levelup]
// ├◇ %totalexp XP secara Total
// │ 
// ├◇ Tanggal: %date
// ├◇ Hari : %week %weton
// ├◇ Tanggal Islam: %dateIslamic
// ├◇ Waktu: %time
// │
// ├◇ Uptime: %uptime / (%muptime)
// ├◇ Database: %rtotalreg dari %totalreg
// ├◇ Memory Used : 
// ├◇ ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
// ├◇ Version : %version
// ├◇ Lib : Baileys-MD
// ├◇ Mode : ${global.opts['self'] ? 'Self' : 'publik'}
// ├◇ Upload Server : %uptime Ago 
// ├◇ Deskripsi : ${'%npmdesc'} 
// └────       
// ┌─「 *USER INFO* 」
// ├◇ Pengguna :  %name 
// ├◇ Status Ⓛ : %limit / day
// ├◇ Status : User
// ├◇ Money : %money
// ├◇ Exp : %totalexp
// ├◇ Level : %level
// ├◇ Role : %role
// ├◇ Premium : ${global.prem ? 'Ya' : 'Tidak'}
// └───────────

// `.trimStart(), 
  // header: '┌─「 %category 」',
  // body: '├◇%cmd %islimit %isPremium',
  // footer: '└────\n', 
  // after: ``,
// }

// //|kategori|//
// let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  // let tags
  // let teks = `${args[0]}`.toLowerCase()
  // let arrayMenu = ['all', 'absen', 'rpg', 'anime', 'downloader', 'game', 'fun', 'xp', 'github', 'group', 'image', 'quotes', 'admin', 'info', 'internet', 'islam', 'kerang', 'maker', 'owner', 'suara', 'premium', 'quotes', 'info', 'stalk', 'shortlink', 'sticker', 'tools', 'text', 'nsfw', 'asupan', 'random', 'textpro', 'photooxy']
  // if (!arrayMenu.includes(teks)) teks = '404'
  // if (teks == 'all') tags = {
  // 'main': 'MENU UTAMA',
  // 'advanced': 'ADVANCED',
  // 'absen': 'MENU ABSEN',
  // 'anime': 'MENU ANIME',
  // 'sticker': 'MENU CONVERT',
  // 'downloader': 'MENU DOWNLOADER',
  // 'xp': 'MENU EXP',
  // 'fun': 'MENU FUN',
  // 'game': 'MENU GAME',
  // 'github': 'MENU GITHUB',
  // 'group': 'MENU GROUP',
  // 'image': 'MENU IMAGE',
  // 'info': 'MENU INFO',
  // 'internet': 'INTERNET',
  // 'islam' : 'MENU ISLAMI',
  // 'kerang': 'MENU KERANG',
  // 'maker': 'MENU MAKER',
  // 'owner': 'MENU OWNER',
  // 'Pengubah Suara': 'PENGUBAH SUARA',
  // 'premium': 'PREMIUM MENU',
  // 'quotes' : 'MENU QUOTES',
  // 'rpg': 'MENU RPG',
  // 'stalk': 'MENU STALK',
  // 'shortlink': 'SHORT LINK',
  // 'tools': 'MENU TOOLS',
  // 'vote': 'MENU VOTING',
  // 'nsfw': 'NSFW MENU', 
  // 'asupan': 'ASUPAN MENU', 
  // 'random': 'RANDOM MENU', 
  // 'textpro': 'TEXT PRO MENU', 
  // 'photooxy': 'PHOTO OXY MENU', 
  // }
  // if (teks == 'absen') tags = {
    // 'absen': 'MENU ABSEN',
    // 'vote': 'MENU VOTING',
  // }
  // if (teks == 'anime') tags = {
  // 'anime': 'MENU ANIME',
  // }
  // if (teks == 'sticker') tags = {
  // 'sticker': 'MENU CONVERT',
  // }
  // if (teks == 'downloader') tags = {
  // 'downloader': 'MENU DOWNLOADER',
  // }
  // if (teks == 'xp') tags = {
  // 'xp': 'MENU EXP',
  // }
  // if (teks == 'fun') tags = {
  // 'fun': 'MENU FUN',
  // }
  // if (teks == 'game') tags = {
  // 'game': 'MENU GAME',
  // }
  // if (teks == 'github') tags = {
  // 'github': 'MENU GITHUB',
  // }
  // if (teks == 'group') tags = {
  // 'group': 'MENU GROUP',
  // }
  // if (teks == 'image') tags = {
  // 'image': 'MENU IMAGE',
  // }
  // if (teks == 'info') tags = {
  // 'info': 'MENU INFO',
  // }
  // if (teks == 'internet') tags = {
  // 'internet': 'INTERNET',
  // }
  // if (teks == 'islam') tags = {
  // 'islam' : 'MENU ISLAMI',
  // }
  // if (teks == 'kerang') tags = {
  // 'kerang': 'MENU KERANG',
  // }
  // if (teks == 'maker') tags = {
  // 'maker': 'MENU MAKER',
  // }
  // if (teks == 'owner') tags = {
    // 'owner': 'Owner',
    // 'host': 'Host',
    // 'advanced': 'Advanced'
  // }
  // if (teks == 'suara') tags = {
  // 'Pengubah Suara': 'PENGUBAH SUARA',
  // }
  // if (teks == 'text') tags = {
  // 'text': 'MAKER TEXT',
  // }
  // if (teks == 'premium') tags = {
  // 'premium': 'PREMIUM MENU',
  // }
  // if (teks == 'quotes') tags = {
  // 'quotes' : 'MENU QUOTES',
  // }
  // if (teks == 'rpg') tags = {
  // 'rpg': 'MENU RPG',
  // }
  // if (teks == 'stalk') tags = {
  // 'stalk': 'MENU STALK',
  // }
  // if (teks == 'shortlink') tags = {
  // 'shortlink': 'SHORT LINK',
  // }
  // if (teks == 'tools') tags = {
  // 'tools': 'MENU TOOLS',
  // }
  // if (teks == 'nsfw') tags = {
  // 'nsfw': 'NSFW MENU', 
  // }
  // if (teks == 'asupan') tags = {
  // 'asupan': 'ASUPAN MENU', 
  // }
  // if (teks == 'random') tags = {
  // 'random': 'RANDOM MENU', 
  // }
  // if (teks == 'textpro') tags = {
  // 'textpro': 'TEXT PRO MENU', 
  // }
  // if (teks == 'photooxy') tags = {
  // 'photooxy': 'PHOTO OXY MENU', 
  // }

// //db usernya/
  // try {
    // let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    // let who
    // if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    // else who = m.sender 
    // let name = conn.getName(m.sender)
    // let totalreg = Object.keys(global.db.data.users).length
    // let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    // let premium = global.db.data.users[m.sender].premium
    // let user = global.db.data.users[who]
    // let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    // let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    // let tag = `wa.me/${m.sender.split('@')[0]}`
 // m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}

// //Timer bot//
    // let d = new Date(new Date + 3600000)
    // let locale = 'id'
    // let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    // let week = d.toLocaleDateString(locale, { weekday: 'long' })
    // let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    // let date = d.toLocaleDateString(locale, {
      // day: 'numeric',
      // month: 'long',
      // year: 'numeric'
    // })
    // let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      // day: 'numeric',
      // month: 'long',
      // year: 'numeric'
    // }).format(d)
    // let time = d.toLocaleTimeString(locale, {
      // hour: 'numeric',
      // minute: 'numeric',
      // second: 'numeric'
    // })
    // let _uptime = process.uptime() * 1000
    // let _muptime
    // if (process.send) {
      // process.send('uptime')
      // _muptime = await new Promise(resolve => {
        // process.once('message', resolve)
        // setTimeout(resolve, 1000)
      // }) * 1000
    // }
    // let muptime = clockString(_muptime)
    // let uptime = clockString(_uptime)
    // let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

// //bytioxd//
// let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    // return {
      // help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      // tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      // prefix: 'customPrefix' in plugin,
      // limit: plugin.limit,
      // premium: plugin.premium,
      // enabled: !plugin.disabled,
    // }
  // })

// //fake reply//
// const fkontak = {
	// "key": {
    // "participants":"0@s.whatsapp.net",
		// "remoteJid": "status@broadcast",
		// "fromMe": false,
		// "id": "Halo"
	// },
	// "message": {
		// "contactMessage": {
			// "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		// }
	// },
	// "participant": "0@s.whatsapp.net"
// }
// const ftroli = {
    // key : {
    // remoteJid: 'status@broadcast',
    // participant : '0@s.whatsapp.net'
    // },
    // message: {
    // orderMessage: {
    // itemCount : 2022,
    // status: 1,
    // surface : 1,
    // message: `Hai Kak ${name}!`, 
    // orderTitle: `▮Menu ▸`,
    // thumbnail: await (await fetch(fla + 'Menu')).buffer(), //Gambarnye
    // sellerJid: '0@s.whatsapp.net' 
    // }
    // }
    // }
// const fdoc = {
   // key : {
   // remoteJid: 'status@broadcast',
   // participant : '0@s.whatsapp.net'
   // },
   // message: {
   // documentMessage: {
   // title: wm, 
   // }
   // }
   // }

// //Listmenu//
// if (teks == '404') {
// let menuu = `*© RTXZY-MD*`
// const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        // listMessage: {
            // title: `${ucapan()} ${name}`,
            // description: menuu,
            // buttonText: 'LIST MENU',
            // listType: 1,
            // footerText: "Jika menemukan bug,error atau kesulitan dalam penggunaan silahkan laporkan/tanyakan kepada owner.",
            // mtype: 'listMessage',
            // sections: [
              // {
                // "rows": [{
                  // "title": `SPEEDTEST`,
                  // "description": "Untuk Melihat Kecepatan Download Bot",
                  // "rowId": `.speedtest`
                // },{
                  // "title": `OWNER`,
                  // "description": "Nomor Pemilik Bot Chat P/Meminta Save Tidak Akan Di Respon",
                  // "rowId": `.owner`
                // },{
                  // "title": "INFO BOT",
                  // "description": "Menampilkan Menu Info",
                  // "rowId": `${_p}? info`
                // },{
                  // "title": "GROUP BOT",
                  // "description": "Join Grup Bot Untuk Mengetahui Update Terbaru",
                  // "rowId": `#gcbot`
                // }],
                // "title": "━━━━━━━━━━[ MENU UTAMA ]━━━━━━━━━━"
              // }, {
                // "rows": [{
                  // "title": `TEXTPRO`,
                  // "description": "Untuk MemBuat logo Text, Menu Tambahan",
                  // "rowId": `.textpro`
                // },{
                  // "title": `REFERAL`,
                  // "description": "Untuk Mendapatkan Hadiah Exp",
                  // "rowId": `.ref`
                // }],
                // "title": "━━━━━━━━━[ MENU TAMBAHAN ]━━━━━━━━━"
              // }, {
                // "rows": [{
                  // "title": `[01] SEMUA PERINTAH`,
                  // "description": "Menampilkan Menu All",
                  // "rowId": '.? all'
                  // }, {
                  // "title": "[02] ABSEN & VOTING",
                  // "description": "Menampilkan Menu Absen",
                  // "rowId": `${_p}? absen`
                // }, {
                  // "title": "[03] ANIME",
                  // "description": "Menampilkan Menu Anime",
                  // "rowId": `${_p}? anime`
                // }, {
                  // "title": "[04] STICKER & CONVERTER",
                  // "description": "Menampilkan Menu Sticker",
                  // "rowId": `${_p}? sticker`
                // }, {
                  // "title": "[05] DOWNLOADER",
                  // "description": "Menampilkan Menu Downloader",
                  // "rowId": `${_p}? downloader`
                // }, {
                  // "title": "[06] EXP & LIMIT",
                  // "description": "Menampilkan Menu Exp",
                  // "rowId": `${_p}? xp`
                // }, {
                  // "title": "[07] FUN",
                  // "description": "Menampilkan Menu Fun",
                  // "rowId": `${_p}? fun`
                // }, {
                  // "title": "[08] GAME",
                  // "description": "Menampilkan Menu Game",
                  // "rowId": `${_p}? game`
                // }, {
                  // "title": "[09] GITHUB",
                  // "description": "Menampilkan Menu Github",
                  // "rowId": `${_p}? github`
                // }, {
                  // "title": "[10] GROUP",
                  // "description": "Menampilkan Menu Group",
                  // "rowId": `${_p}? group`
                // }, {
                  // "title": "[11] IMAGE",
                  // "description": "Menampilkan Menu Image",
                  // "rowId": `${_p}? image`
                // }, {
                  // "title": "[12] INTERNET",
                  // "description": "Menampilkan Menu Internet",
                  // "rowId": `${_p}? internet`
                // }, {
                  // "title": "[13] ISLAMIC",
                  // "description": "Menampilkan Menu Islam",
                  // "rowId": `${_p}? islam`
                // }, {
                  // "title": "[14] KERANG",
                  // "description": "Menampilkan Menu Kerang",
                  // "rowId": `${_p}? kerang`
                // }, {
                  // "title": "[15] MAKER",
                  // "description": "Menampilkan Menu Maker",
                  // "rowId": `${_p}? maker`
                // }, {
                  // "title": "[16] OWNER",
                  // "description": "Menampilkan Menu Owner",
                  // "rowId": `${_p}? owner`
                // }, {
                  // "title": "[17] PENGUBAH SUARA",
                  // "description": "Menampilkan Menu Voice Changer",
                  // "rowId": `${_p}? suara`
                // }, {
                  // "title": "[18] PREMIUM",
                  // "description": "Menampilkan Menu Premium",
                  // "rowId": `${_p}? premium`
                // }, {
                  // "title": "[19] QUOTES",
                  // "description": "Menampilkan Menu Quotes",
                  // "rowId": `${_p}? quotes`
                // }, {
                  // "title": "[20] RPG",
                  // "description": "Menampilkan Menu Rpg",
                  // "rowId": `${_p}? rpg`
                // }, {
                  // "title": "[21] STALKER",
                  // "description": "Menampilkan Menu Stalker",
                  // "rowId": `${_p}? stalk`
                // }, {
                  // "title": "[22] SHORT LINK",
                  // "description": "Menampilkan Menu Short Link",
                  // "rowId": `${_p}? shortlink`
                // }, {
                  // "title": "[23] TOOLS MENU",
                  // "description": "Menampilkan Menu Tools",
                  // "rowId": `${_p}? tools`
                // }, {
                  // "title": "[24] TEXT MAKER",
                  // "description": "Menampilkan Maker Text",
                  // "rowId": `${_p}? text`
                // }, {
                  // "title": "[25] HENTAI",
                  // "description": "Menampilkan Menu Hentai",
                  // "rowId": `${_p}? nsfw`
                // }, {
                  // "title": "[26] RANDOM",
                  // "description": "Menampilkan Menu Random/Gabut",
                  // "rowId": `${_p}? random`
                // }, {
                  // "title": "[27] TEXT PRO",
                  // "description": "Menampilkan Text Pro Menu",
                  // "rowId": `${_p}? textpro`
                // }, {
                  // "title": "[28] PHOTO OXY",
                  // "description": "Menampilkan Photo Oxy Menu",
                  // "rowId": `${_p}? textpro`
                // }
                  // ],
                // "title": "━━━━━━━━━━━[ LIST MENU ]━━━━━━━━━━━"
              // }
            // ], "contextInfo": {
              // "stanzaId": m.key.id,
              // "participant": m.sender,
              // "quotedMessage": m.message
            // }
    // }}), { userJid: m.participant || m.key.remoteJid, quoted: fkontak });
    // return await conn.relayMessage(
        // m.key.remoteJid,
        // template.message,
        // { messageId: template.key.id }
    // )
    // }
    // let groups = {}
    // for (let tag in tags) {
      // groups[tag] = []
      // for (let plugin of help)
        // if (plugin.tags && plugin.tags.includes(tag))
          // if (plugin.help) groups[tag].push(plugin)
    // }
    // conn.menu = conn.menu ? conn.menu : {}
    // let before = conn.menu.before || defaultMenu.before
    // let header = conn.menu.header || defaultMenu.header
    // let body = conn.menu.body || defaultMenu.body
    // let footer = conn.menu.footer || defaultMenu.footer
    // let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    // let _text = [
        // before,
        // ...Object.keys(tags).map(tag => {
          // return header.replace(/%category/g, tags[tag]) + '\n' + [
            // ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              // return menu.help.map(help => {
                // return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  // .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                  // .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                  // .trim()
              // }).join('\n')
            // }),
            // footer
          // ].join('\n')
        // }),
        // after
      // ].join('\n')
      // text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    // let replace = {
      // '%': '%',
      // p: _p, uptime, muptime,
      // me: conn.user.name,
      // npmname: package.name,
      // npmdesc: package.description,
      // version: package.version,
      // exp: exp - min,
      // maxexp: xp,
      // totalexp: exp,
      // xp4levelup: max - exp,
      // github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      // name,
      // ucapan: ucapan(),
      // level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      // readmore: readMore
    // }
    
// //━━━━━━━━[ SETTINGS MENU ]━━━━━━━━//
    // text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    // let message = await prepareWAMessageMedia({ image: await (await require('node-fetch')(fotonya2)).buffer()}, { upload: conn.waUploadToServer }) 
      // const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      // templateMessage: {
          // hydratedTemplate: {
            // imageMessage: message.imageMessage, 
            // hydratedContentText: text, 
            // hydratedFooterText: wm4, 
            // hydratedButtons: [{
            // urlButton: {
               // displayText: 'Website Creator',
               // url: web
             // }

           // },
             // {
             // urlButton: {
               // displayText: 'Group Bot', 
               // url: gc
             // }

           // },
               // {
             // quickReplyButton: {
               // displayText: 'Owner',
               // id: '.owner',
             // }

           // },
               // {
             // quickReplyButton: {
               // displayText: 'Donasi',
               // id: '.donasi',
             // }

           // },
           // {
             // quickReplyButton: {
               // displayText: 'Back',
               // id: '.menu',
             // }
           // }]
         // }
       // }
     // }), { userJid: m.sender, quoted: m });
     // //conn.reply(m.chat, text.trim(), m)
    // return await conn.relayMessage(
         // m.chat,
         // template.message,
         // { messageId: template.key.id }
     // )
// } catch (e) {
    // conn.reply(m.chat, 'Maaf, menu sedang error', m)
    // throw e
  // }
// }
// handler.help = ['menu', 'help', '?']
// handler.tags = ['main']
// handler.command = /^(menu|help|\?)$/i
// handler.owner = false
// handler.mods = false
// handler.premium = false
// handler.group = false
// handler.private = false

// handler.admin = false
// handler.botAdmin = false

// handler.fail = null
// handler.exp = 3

// module.exports = handler

// //━━━━━━━━[  JANGAN DI UBAH  ]━━━━━━━━//
// const more = String.fromCharCode(8206)
// const readMore = more.repeat(4001)

// function pickRandom(list) {
  // return list[Math.floor(Math.random() * list.length)]
// }

// function clockString(ms) {
  // let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  // let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  // let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  // return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
// }
// function ucapan() {
  // const time = moment.tz('Asia/Jakarta').format('HH')
  // res = "Selamat DiniHari"
  // if (time >= 4) {
    // res = "Selamat Pagi"
  // }
  // if (time > 10) {
    // res = "Selamat Siang"
  // }
  // if (time >= 15) {
    // res = "Selamat Sore"
  // }
  // if (time >= 18) {
    // res = "Selamat Malam"
  // }
  // return res
// }





//=============================//
// Ubah sendiri ya ada dua menu
// Yang di bawah adalah menu original 
//=============================//

//DEFAULT SETTINGS //
let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
process.env.TZ = 'Asia/Jakarta'
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')

//TAMPILAN DEPAN//
const defaultMenu = {
  before:`
╭─「 *${global.namebot}*」
│ 👋🏻 Hai, %name!
│
│ 🧱 Limit : *%limit Limit*
│ 🦸🏼‍♂️ Role : *%role*
│ 🔼 Level : *%level (%exp / %maxexp)*
│ 💫 Total XP : %totalexp ✨
│ 
│ 📅 Tanggal: *%week, %date*
│ 🕰️ Waktu: *%time*
│
│ 📈 Uptime: *%uptime (%muptime)*
│ 📊 Database: %rtotalreg of %totalreg
╰────
`.trimStart(), 
  header: '╭─「 *%category* 」',
  body: '│ • %cmd %islimit %isPremium',
  footer: '╰────\n', 
  after: ``,
}

//CATEGORY//
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'absen', 'rpg', 'anime', 'downloader', 'game', 'fun', 'xp', 'github', 'group', 'image', 'quotes', 'admin', 'info', 'internet', 'islam', 'kerang', 'maker', 'owner', 'suara', 'premium', 'quotes', 'info', 'stalk', 'shortlink', 'sticker', 'tools', 'text', 'nsfw', 'asupan', 'random', 'textpro', 'photooxy']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': 'MENU UTAMA',
  'downloader': 'MENU DOWNLOADER',
  'sticker': 'MENU CONVERT',
  'advanced': 'ADVANCED',
  'absen': 'MENU ABSEN',
  'anime': 'MENU ANIME',
  'xp': 'MENU EXP',
  'fun': 'MENU FUN',
  'game': 'MENU GAME',
  'github': 'MENU GITHUB',
  'group': 'MENU GROUP',
  'image': 'MENU IMAGE',
  'info': 'MENU INFO',
  'internet': 'INTERNET',
  'islam' : 'MENU ISLAMI',
  'kerang': 'MENU KERANG',
  'maker': 'MENU MAKER',
  'owner': 'MENU OWNER',
  'Pengubah Suara': 'PENGUBAH SUARA',
  'premium': 'PREMIUM MENU',
  'quotes' : 'MENU QUOTES',
  'rpg': 'MENU RPG',
  'stalk': 'MENU STALK',
  'shortlink': 'SHORT LINK',
  'tools': 'MENU TOOLS',
  'vote': 'MENU VOTING',
  'nsfw': 'NSFW MENU', 
  'asupan': 'ASUPAN MENU', 
  'random': 'RANDOM MENU', 
  'textpro': 'TEXT PRO MENU', 
  'photooxy': 'PHOTO OXY MENU', 
  }
  if (teks == 'absen') tags = {
    'absen': 'MENU ABSEN',
    'vote': 'MENU VOTING',
  }
  if (teks == 'anime') tags = {
  'anime': 'MENU ANIME',
  }
  if (teks == 'sticker') tags = {
  'sticker': 'MENU CONVERT',
  }
  if (teks == 'downloader') tags = {
  'downloader': 'MENU DOWNLOADER',
  }
  if (teks == 'xp') tags = {
  'xp': 'MENU EXP',
  }
  if (teks == 'fun') tags = {
  'fun': 'MENU FUN',
  }
  if (teks == 'game') tags = {
  'game': 'MENU GAME',
  }
  if (teks == 'github') tags = {
  'github': 'MENU GITHUB',
  }
  if (teks == 'group') tags = {
  'group': 'MENU GROUP',
  }
  if (teks == 'image') tags = {
  'image': 'MENU IMAGE',
  }
  if (teks == 'info') tags = {
  'info': 'MENU INFO',
  }
  if (teks == 'internet') tags = {
  'internet': 'INTERNET',
  }
  if (teks == 'islam') tags = {
  'islam' : 'MENU ISLAMI',
  }
  if (teks == 'kerang') tags = {
  'kerang': 'MENU KERANG',
  }
  if (teks == 'maker') tags = {
  'maker': 'MENU MAKER',
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
  if (teks == 'suara') tags = {
  'Pengubah Suara': 'PENGUBAH SUARA',
  }
  if (teks == 'text') tags = {
  'text': 'MAKER TEXT',
  }
  if (teks == 'premium') tags = {
  'premium': 'PREMIUM MENU',
  }
  if (teks == 'quotes') tags = {
  'quotes' : 'MENU QUOTES',
  }
  if (teks == 'rpg') tags = {
  'rpg': 'MENU RPG',
  }
  if (teks == 'stalk') tags = {
  'stalk': 'MENU STALK',
  }
  if (teks == 'shortlink') tags = {
  'shortlink': 'SHORT LINK',
  }
  if (teks == 'tools') tags = {
  'tools': 'MENU TOOLS',
  }
  if (teks == 'nsfw') tags = {
  'nsfw': 'NSFW MENU', 
  }
  if (teks == 'asupan') tags = {
  'asupan': 'ASUPAN MENU', 
  }
  if (teks == 'random') tags = {
  'random': 'RANDOM MENU', 
  }
  if (teks == 'textpro') tags = {
  'textpro': 'TEXT PRO MENU', 
  }
  if (teks == 'photooxy') tags = {
  'photooxy': 'PHOTO OXY MENU', 
  }

//DATABASE USER//
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let name = conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let premium = global.db.data.users[m.sender].premium
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let tag = `wa.me/${m.sender.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}

//TIMER / WAKTU//
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

//SETTING HELP MENU//
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })

//FAKE REPLY BOT//
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
const ftroli = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: `Hai Kak ${name}!`, 
    orderTitle: `▮Menu ▸`,
    thumbnail: await (await fetch(fla + 'Menu')).buffer(), //Gambarnye
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
const fdoc = {
   key : {
   remoteJid: 'status@broadcast',
   participant : '0@s.whatsapp.net'
   },
   message: {
   documentMessage: {
   title: wm, 
   }
   }
   }

//BAGIAN MENU KETIKA USER COMMAND/
if (teks == '404') {
let menuu = `*© RTXZY-MD*\n> Runtime : ${uptime}\n> Tanggal : ${week} ${date}\n> Waktu : ${time}\n> Weton : ${weton}\n> Memory : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: `${ucapan()} ${name}`,
            description: menuu,
            buttonText: 'LIST MENU',
            listType: 1,
            footerText: "Note: Ⓛ = Limit Ⓟ = Premium",
            mtype: 'listMessage',
            sections: [
              {
                "rows": [{
                  "title": `SPEEDTEST.NET`,
                  "description": "Untuk Melihat Kecepatan Download Bot, Menu Moderator",
                  "rowId": `.speedtest`
                },{
                  "title": ` OWNER / CREATOR`,
                  "description": "Nomor Pemilik Bot Chat P/Meminta Save Tidak Akan Di Respon!",
                  "rowId": `.owner`
                },{
                  "title": "INFO BOT",
                  "description": "Menampilkan Menu Info",
                  "rowId": `${_p}? info`
                },{
                  "title": "LINK GROUP BOT",
                  "description": "Join Grup Bot Untuk Mengetahui Update Terbaru",
                  "rowId": `#gcbot`
                }],
                "title": " ────────────「 INFORMASI 」───────────"
              }, {
                "rows": [{
                  "title": `🎁 KODE REFERAL`,
                  "description": "Undang Teman Dan Dapatkan Exp",
                  "rowId": `.ref`
                }],
                "title": "────────────「 REFERAL 」─────────────"
              }, {
                "rows": [{
                  "title": `「01」 SEMUA PERINTAH`,
                  "description": "Menampilkan Menu All",
                  "rowId": '.? all'
                  }, {
                  "title": "「02」 ABSEN & VOTING",
                  "description": "Menampilkan Menu Absen",
                  "rowId": `${_p}? absen`
                }, {
                  "title": "「03」 TEXTPRO",
                  "description": "Membuat Logo Text",
                  "rowId": `.textpro`
                }, {
                  "title": "「04」 ANIME",
                  "description": "Menampilkan Menu Anime",
                  "rowId": `${_p}? anime`
                }, {
                  "title": "「05」 STICKER & CONVERTER",
                  "description": "Menampilkan Menu Sticker",
                  "rowId": `${_p}? sticker`
                }, {
                  "title": "「06」 DOWNLOADER",
                  "description": "Menampilkan Menu Downloader",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": "「07」  EXP & LIMIT",
                  "description": "Menampilkan Menu Exp",
                  "rowId": `${_p}? xp`
                }, {
                  "title": "「08」 FUN",
                  "description": "Menampilkan Menu Fun",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "「09」  GAME",
                  "description": "Menampilkan Menu Game",
                  "rowId": `${_p}? game`
                }, {
                  "title": "「10」  GITHUB",
                  "description": "Menampilkan Menu Github",
                  "rowId": `${_p}? github`
                }, {
                  "title": "「11」  GROUP",
                  "description": "Menampilkan Menu Group",
                  "rowId": `${_p}? group`
                }, {
                  "title": "「12」 IMAGE",
                  "description": "Menampilkan Menu Image",
                  "rowId": `${_p}? image`
                }, {
                  "title": "「13」 INTERNET",
                  "description": "Menampilkan Menu Internet",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "「14」 ISLAMIC",
                  "description": "Menampilkan Menu Islam",
                  "rowId": `${_p}? islam`
                }, {
                  "title": "「15」 KERANG",
                  "description": "Menampilkan Menu Kerang",
                  "rowId": `${_p}? kerang`
                }, {
                  "title": "「16」  MAKER",
                  "description": "Menampilkan Menu Maker",
                  "rowId": `${_p}? maker`
                }, {
                  "title": "「17」  OWNER",
                  "description": "Menampilkan Menu Owner",
                  "rowId": `${_p}? owner`
                }, {
                  "title": "「18」 PENGUBAH SUARA",
                  "description": "Menampilkan Menu Voice Changer",
                  "rowId": `${_p}? suara`
                }, {
                  "title": "「19」 PREMIUM",
                  "description": "Menampilkan Menu Premium",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "「20」  QUOTES",
                  "description": "Menampilkan Menu Quotes",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "「21」  RPG",
                  "description": "Menampilkan Menu Rpg",
                  "rowId": `${_p}? rpg`
                }, {
                  "title": "「22」 STALKER",
                  "description": "Menampilkan Menu Stalker",
                  "rowId": `${_p}? stalk`
                }, {
                  "title": "「23」 SHORT LINK",
                  "description": "Menampilkan Menu Short Link",
                  "rowId": `${_p}? shortlink`
                }, {
                  "title": "「24」 TOOLS MENU",
                  "description": "Menampilkan Menu Tools",
                  "rowId": `${_p}? tools`
                }, {
                  "title": "「25」 TEXT MAKER",
                  "description": "Menampilkan Maker Text",
                  "rowId": `${_p}? text`
                }, {
                  "title": "「26」 HENTAI",
                  "description": "Menampilkan Menu Hentai",
                  "rowId": `${_p}? nsfw`
                }, {
                  "title": "「27」 RANDOM",
                  "description": "Menampilkan Menu Random/Gabut",
                  "rowId": `${_p}? random`
                }, {
                  "title": "「28」 TEXT PRO",
                  "description": "Menampilkan Text Pro Menu",
                  "rowId": `${_p}? textpro`
                }, {
                  "title": "「29」 PHOTO OXY",
                  "description": "Menampilkan Photo Oxy Menu",
                  "rowId": `${_p}? textpro`
                }, {
                  "title": "「30」 SCRIPT BOT",
                  "description": "Source Code Yang Di Gunakan Bot",
                  "rowId": `.sc`
                }
                  ],
                "title": "────────────「LIST MENU 」────────────"
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: fkontak });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                  .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    
//SETTING MENU//
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let url = `https://database.tioclkp02.repl.co/TextPro.me_162e2aaeb790ae.jpg`.trim()
    let res = await fetch(url)
    let buffer = await res.buffer()
    let message = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
            const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
            templateMessage: {
            hydratedTemplate: {
            imageMessage: message.imageMessage,
            hydratedContentText: text, 
            hydratedFooterText: wm4, 
            hydratedButtons: [{
            urlButton: {
               displayText: 'Website',
               url: web
             }

           },
             {
             urlButton: {
               displayText: 'Group Bot', 
               url: gc
             }

           },
               {
             quickReplyButton: {
               displayText: 'Owner',
               id: '.owner',
             }

           },
               {
             quickReplyButton: {
               displayText: 'Donasi',
               id: '.donasi',
             }

           },
           {
             quickReplyButton: {
               displayText: 'Back',
               id: '.menu',
             }
           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
     //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
} catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|.menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

//JANGAN DI UBAH BAGIAN INI!!!//
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat DiniHari"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time > 10) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
}

