var { 
sticker5 
} = require('../lib/sticker')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `🚩 *Contoh:* ${usedPrefix + command} 🗿`
     await conn.reply(m.chat, wait, m)
     try {
        if (command == 'stikapple') {
        const res = `https://api.botcahx.eu.org/api/emoji/apple?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikgoogle') {
        const res = `https://api.botcahx.eu.org/api/emoji/google?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stiksamsung') {
        const res = `https://api.botcahx.eu.org/api/emoji/samsung?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikmicrosoft') {
        const res = `https://api.botcahx.eu.org/api/emoji/microsoft?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikwhatsapp') {
        const res = `https://api.botcahx.eu.org/api/emoji/whatsapp?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stiktwitter') {
        const res = `https://api.botcahx.eu.org/api/emoji/twitter?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikfacebook') {
        const res = `https://api.botcahx.eu.org/api/emoji/facebook?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikskype') {
        const res = `https://api.botcahx.eu.org/api/emoji/skype?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikjoypixels') {
        const res = `https://api.botcahx.eu.org/api/emoji/joypixels?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikopenmoji') {
        const res = `https://api.botcahx.eu.org/api/emoji/openmoji?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikemojipedia') {
        const res = `https://api.botcahx.eu.org/api/emoji/emojipedia?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stiklg') {
        const res = `https://api.botcahx.eu.org/api/emoji/lg?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikjoypixels') {
        const res = `https://api.botcahx.eu.org/api/emoji/joypixels?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikhtc') {
        const res = `https://api.botcahx.eu.org/api/emoji/htc?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikmozilla') {
        const res = `https://api.botcahx.eu.org/api/emoji/mozilla?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stiksoftbank') {
        const res = `https://api.botcahx.eu.org/api/emoji/softbank?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikdocomo') {
        const res = `https://api.botcahx.eu.org/api/emoji/docomo?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
        else if (command == 'stikkddi') {
        const res = `https://api.botcahx.eu.org/api/emoji/kddi?emoji=${encodeURIComponent(text)}&apikey=${btc}`
            var stiker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
    } catch (e) {
        console.log(e)
        throw '*🚩 Stiker tidak di temukan!*'
    }
}

handler.command = handler.help = ['stikapple', 'stikkddi', 'stikgoogle', 'stikdocomo', 'stiksoftbank', 'stikhtc', 'stikmozilla', 'stiklg', 'stikopenmoji', 'stikemojipedia', 'stikjoypixels', 'stikopenmoji', 'stikfacebook', 'stikskype', 'stikwhatsapp', 'stiktwitter', 'stiksamsung', 'stikmicrosoft']
handler.tags = ['sticker'] 
handler.limit = true
module.exports = handler
