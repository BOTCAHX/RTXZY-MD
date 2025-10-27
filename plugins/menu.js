const { 
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    areJidsSameUser, 
    getContentType 
} = require('@adiwajshing/baileys')

process.env.TZ = 'Asia/Jakarta'
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')
let arrayMenu = [
  'all', 
  'ai', 
  'main', 
  'downloader', 
  'database', 
  'rpg',
  'rpgG', 
  'sticker', 
  'advanced', 
  'xp', 
  'fun', 
  'game', 
  'github', 
  'group', 
  'image', 
  'nsfw', 
  'info', 
  'internet', 
  'islam', 
  'kerang', 
  'maker', 
  'news', 
  'owner', 
  'voice', 
  'quotes', 
  'store', 
  'stalk', 
  'shortlink', 
  'tools', 
  'anonymous',
  ''
  ];


const allTags = {
    'all': 'SEMUA MENU',
    'ai': 'MENU AI',
    'main': 'MENU UTAMA',
    'downloader': 'MENU DOWNLOADER',
    'database': 'MENU DATABASE',
    'rpg': 'MENU RPG',
    'rpgG': 'MENU RPG GUILD',
    'sticker': 'MENU CONVERT',
    'advanced': 'ADVANCED',
    'xp': 'MENU EXP',
    'fun': 'MENU FUN',
    'game': 'MENU GAME',
    'github': 'MENU GITHUB',
    'group': 'MENU GROUP',
    'image': 'MENU IMAGE',
    'nsfw': 'MENU NSFW',
    'info': 'MENU INFO',
    'internet': 'INTERNET',
    'islam': 'MENU ISLAMI',
    'kerang': 'MENU KERANG',
    'maker': 'MENU MAKER',
    'news': 'MENU NEWS',
    'owner': 'MENU OWNER',
    'voice': 'PENGUBAH SUARA',
    'quotes': 'MENU QUOTES',
    'store': 'MENU STORE',
    'stalk': 'MENU STALK',
    'shortlink': 'SHORT LINK',
    'tools': 'MENU TOOLS',
    'anonymous': 'ANONYMOUS CHAT',
    '': 'NO CATEGORY'
}

const defaultMenu = {
    before: `

🌟 Hai %name! Aku Irene, bot WhatsApp yang pintar, stylish, dan penuh cinta 🤖💅  
Aku bisa bantu cari info, main game, dan download konten dari IG, TikTok, YouTube, dll — langsung lewat WhatsApp! 📲✨

🎮 Main game? Ketik aja, aku punya banyak pilihan seru!  
📥 Download konten? Kirim link, aku unduhin cepat dan rapi 😎  
🧠 Dibuat oleh Hansamu Ryuga Alvarez, pakai teknologi WhatsApp API + AI, aktif 24/7 berkat VPS Max 💻⚡

💌 Aku hormat pada Hans, Farhan, Ani, Ma’aruf, dan mengenang Kevin Alfabet 🙏  
👑 Penerus Alexa Bot, tapi lebih modern dan fleksibel 💪  
📲 Versi Telegram juga tersedia di 👉 t.me/unduhaja_bot 🚀

🫶 Kalau kamu cari bot yang pintar, bergaya, dan asik diajak ngobrol, Irene siap nemenin kapan aja! 😄💬


✧༺♥༻∞ ∞༺♥༻✧
   💝 IRENE INFO 💝
✧༺♥༻∞ ∞༺♥༻✧
  ♡ Uptime   : %uptime
  ♡ Tanggal  : %date
  ♡ Waktu    : %time
  ♡ Prefix   : *[ %pmenu ]*
  ♡ *Library:* Baileys
  ♡ *Function:* Assistant
 🔗 *Follow Channel:*  
  https://whatsapp.com/channel/0029VaGpjVw002TG5u8KXd1k
✧༺♥༻∞ ∞༺♥༻✧
   ©hansalrldigitalcloud
✧༺♥༻∞ ∞༺♥༻✧
`.trimStart(),
    header: '╔═━━━〔 %category 〕━━━═╗',
    body: '║  ✦ %cmd %islimit %isPremium',
    footer: '╚═━━━〔©hansalrldigitalcloud l〕━━━═╝',
    after: `*Note:* Ketik .menu <category> untuk melihat menu spesifik\nContoh: .menu tools`
}

let handler = async (m, { conn, usedPrefix: _p, args = [], command }) => {
    try {
        let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
        let { exp, limit, level, role } = global.db.data.users[m.sender]
        let { min, xp, max } = levelling.xpRange(level, global.multiplier)
        let name = `@${m.sender.split`@`[0]}`
        let teks = args[0] || ''
        
        let d = new Date(new Date + 3600000)
        let locale = 'id'
        let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        
        let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })

        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        
        let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
            return {
                help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
                tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
                prefix: 'customPrefix' in plugin,
                limit: plugin.limit,
                premium: plugin.premium,
                enabled: !plugin.disabled,
            }
        })

        if (!teks) {
            let menuList = `${defaultMenu.before}\n\n┌  ◦ *DAFTAR MENU*\n`
            for (let tag of arrayMenu) {
                if (tag && allTags[tag]) {
                    menuList += `│  ◦ ${_p}menu ${tag}\n`
                }
            }
            menuList += `└  \n\n${defaultMenu.after}`

            let replace = {
                '%': '%',
                p: _p, 
                uptime,
                name, 
                date,
                time
            }

            let text = menuList.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), 
                (_, name) => '' + replace[name])

            await conn.relayMessage(m.chat, {
            extendedTextMessage:{
                text: text, 
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: date,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://qu.ax/obeFY.mp4',
                        sourceUrl: 'https://whatsapp.com/channel/0029VaGpjVw002TG5u8KXd1k'
                    }
                }, 
                mentions: [m.sender]
            }
        }, {})
            return
        }

        if (!allTags[teks]) {
            return m.reply(`Menu "${teks}" tidak tersedia.\nSilakan ketik ${_p}menu untuk melihat daftar menu.`)
        }

        let menuCategory = defaultMenu.before + '\n\n'
        
        if (teks === 'all') {
            // category all
            for (let tag of arrayMenu) {
                if (tag !== 'all' && allTags[tag]) {
                    menuCategory += defaultMenu.header.replace(/%category/g, allTags[tag]) + '\n'
                    
                    let categoryCommands = help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help)
                    for (let menu of categoryCommands) {
                        for (let help of menu.help) {
                            menuCategory += defaultMenu.body
                                .replace(/%cmd/g, menu.prefix ? help : _p + help)
                                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '') + '\n'
                        }
                    }
                    menuCategory += defaultMenu.footer + '\n'
                }
            }
        } else {
            menuCategory += defaultMenu.header.replace(/%category/g, allTags[teks]) + '\n'
            
            let categoryCommands = help.filter(menu => menu.tags && menu.tags.includes(teks) && menu.help)
            for (let menu of categoryCommands) {
                for (let help of menu.help) {
                    menuCategory += defaultMenu.body
                        .replace(/%cmd/g, menu.prefix ? help : _p + help)
                        .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                        .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '') + '\n'
                }
            }
            menuCategory += defaultMenu.footer + '\n'
        }

        menuCategory += '\n' + defaultMenu.after
        
        let replace = {
            '%': '%',
            p: _p, 
            uptime, 
            name,
            date,
            time
        }

        let text = menuCategory.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), 
            (_, name) => '' + replace[name])

        await conn.relayMessage(m.chat, {
            extendedTextMessage:{
                text: text, 
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: date,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://qu.ax/obeFY.mp4',
                        sourceUrl: 'https://whatsapp.com/channel/0029VaGpjVw002TG5u8KXd1k'
                    }
                }, 
                mentions: [m.sender]
            }
        }, {})
    } catch (e) {
        conn.reply(m.chat, 'Maaf, menu sedang error', m)
        console.error(e)
    }
}

handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(menu|help)$/i
handler.exp = 3
handler.register = true
handler.group = true

module.exports = handler

function clockString(ms) {
    if (isNaN(ms)) return '--'
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
