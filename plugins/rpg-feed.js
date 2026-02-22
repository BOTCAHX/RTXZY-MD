let handler = async (m, { conn, args, usedPrefix }) => {
	let info = `
乂 List Pet:
🐈 • kucing
🐕 • anjing
🦊 • rubah
🐺 • serigala
🐦‍🔥 • phonix

*➠ Example:* ${usedPrefix}feed kucing
`.trim()
let pesan = pickRandom(['ɴʏᴜᴍᴍᴍ~', 'ᴛʜᴀɴᴋs', 'ᴛʜᴀɴᴋʏᴏᴜ ^-^', 'ᴛʜᴀɴᴋ ʏᴏᴜ~', 'ᴀʀɪɢᴀᴛᴏᴜ ^-^'])
    let type = (args[0] || '').toLowerCase()
    let emo = (type == 'rubah' ? '🦊':'' || type == 'kucing' ? '🐈':'' || type == 'anjing' ? '🐕':'' || type == 'serigala' ? '🐺':'' || type == 'phonix'? '🐦‍🔥':'' ) 
    let user = global.db.data.users[m.sender]
    let rubah = global.db.data.users[m.sender].rubah
    let kucing = global.db.data.users[m.sender].kucing
    let anjing = global.db.data.users[m.sender].anjing
    let serigala = global.db.data.users[m.sender].serigala
    let phonix = global.db.data.users[m.sender].phonix
    switch (type) {
        case 'rubah':
            if (rubah == 0) return m.reply('*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet')
            if (rubah == 10) return m.reply('ʏᴏᴜʀ ᴘᴇᴛ ɪs ᴍᴀx ʟᴇᴠᴇʟ !')
            let __waktur = (new Date - user.rubahlastclaim)
            let _waktur = (600000 - __waktur)
            let waktur = clockString(_waktur)
            if (new Date - user.rubahlastclaim > 600000) {
                if (user.makananpet > 0) {
                    user.makananpet -= 1
                    user.rubahexp += 20
                    user.rubahlastclaim = new Date * 1
                    m.reply(`ғᴇᴇᴅɪɴɢ *${type}*...\n*${emo} :* ${pesan}`)
                    if (rubah > 0) {
                        let naiklvl = ((rubah * 100) - 1)
                        if (user.rubahexp > naiklvl) {
                            user.rubah += 1
                            user.rubahexp -= (rubah * 100)
                            m.reply(`*ᴄᴏɴɢʀᴀᴛs!* , ʏᴏᴜʀ ᴘᴇᴛ ʟᴇᴠᴇʟᴜᴘ`)
                        }
                    }
                } else m.reply(`*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet`)
            } else m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ɪs ғᴜʟʟ, ᴛʀʏ ғᴇᴇᴅɪɴɢ ɪᴛ ᴀɢᴀɪɴ ɪɴ\n➞ *${waktur}*`)
            break
        case 'kucing':
            if (kucing == 0) return m.reply('*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet')
            if (kucing == 10) return m.reply('ʏᴏᴜʀ ᴘᴇᴛ ɪs ᴍᴀx ʟᴇᴠᴇʟ !')
            let __waktuc = (new Date - user.kucinglastclaim)
            let _waktuc = (600000 - __waktuc)
            let waktuc = clockString(_waktuc)
            if (new Date - user.kucinglastclaim > 600000) {
                if (user.makananpet > 0) {
                    user.makananpet -= 1
                    user.kucingexp += 20
                    user.kucinglastclaim = new Date * 1
                    m.reply(`ғᴇᴇᴅɪɴɢ *${type}*...\n*${emo} :* ${pesan}`)
            
                    if (kucing > 0) {
                        let naiklvl = ((kucing * 100) - 1)
                        if (user.kucingexp > naiklvl) {
                            user.kucing += 1
                            user.kucingexp -= (kucing * 100)
                            m.reply(`*ᴄᴏɴɢʀᴀᴛs!* , ʏᴏᴜʀ ᴘᴇᴛ ʟᴇᴠᴇʟᴜᴘ`)
                        }
                    }
                } else m.reply(`*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet`)
            } else m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ɪs ғᴜʟʟ, ᴛʀʏ ғᴇᴇᴅɪɴɢ ɪᴛ ᴀɢᴀɪɴ ɪɴ\n➞ *${waktuc}*`)
            break
         case 'serigala':
            if (serigala == 0) return m.reply('*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet')
            if (serigala == 10) return m.reply('ʏᴏᴜʀ ᴘᴇᴛ ɪs ᴍᴀx ʟᴇᴠᴇʟ !')
            let __waktub = (new Date - user.serigalalastclaim)
            let _waktub = (600000 - __waktub)
            let waktub = clockString(_waktub)
            if (new Date - user.serigalalastclaim > 600000) {
                if (user.makananpet > 0) {
                    user.makananpet -= 1
                    user.serigalaexp += 20
                    user.serigalalastclaim = new Date * 1
                    m.reply(`ғᴇᴇᴅɪɴɢ *${type}*...\n*${emo} :* ${pesan}`)
            
                    if (serigala > 0) {
                        let naiklvl = ((serigala * 100) - 1)
                        if (user.serigalaexp > naiklvl) {
                            user.serigala += 1
                            user.serigalaexp -= (serigala * 100)
                            m.reply(`*ᴄᴏɴɢʀᴀᴛs!* , ʏᴏᴜʀ ᴘᴇᴛ ʟᴇᴠᴇʟᴜᴘ`)
                        }
                    }
                } else m.reply(`*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet`)
            } else m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ɪs ғᴜʟʟ, ᴛʀʏ ғᴇᴇᴅɪɴɢ ɪᴛ ᴀɢᴀɪɴ ɪɴ\n➞ *${waktub}*`)
            break
        case 'anjing':
            if (anjing == 0) return m.reply('*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet')
            if (anjing == 10) return m.reply('ʏᴏᴜʀ ᴘᴇᴛ ɪs ᴍᴀx ʟᴇᴠᴇʟ !')
            let __waktua = (new Date - user.anjinglastclaim)
            let _waktua = (600000 - __waktua)
            let waktua = clockString(_waktua)
            if (new Date - user.anjinglastclaim > 600000) {
                if (user.makananpet > 0) {
                    user.makananpet -= 1
                    user.anjingexp += 20
                    user.anjinglastclaim = new Date * 1
                    m.reply(`ғᴇᴇᴅɪɴɢ *${type}*...\n*${emo} :* ${pesan}`)
                    if (anjing > 0) {
                        let naiklvl = ((anjing * 100) - 1)
                        if (user.anjingexp > naiklvl) {
                            user.anjing += 1
                            user.anjingexp -= (anjing * 100)
                            m.reply(`*ᴄᴏɴɢʀᴀᴛs!* , ʏᴏᴜʀ ᴘᴇᴛ ʟᴇᴠᴇʟᴜᴘ`)
                        }
                    }
                } else m.reply(`*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet`)
            } else m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ɪs ғᴜʟʟ, ᴛʀʏ ғᴇᴇᴅɪɴɢ ɪᴛ ᴀɢᴀɪɴ ɪɴ\n➞ *${waktua}*`)
            break
        case 'phonix':
            if (phonix == 0) return m.reply('*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet')
            if (phonix == 10) return m.reply('ʏᴏᴜʀ ᴘᴇᴛ ɪs ᴍᴀx ʟᴇᴠᴇʟ !')
            let __waktuk = (new Date - user.phonixlastclaim)
            let _waktuk = (600000 - __waktuk)
            let waktuk = clockString(_waktuk)
            if (new Date - user.phonixlastclaim > 600000) {
                if (user.makananpet > 0) {
                    user.makananpet -= 1
                    user.phonixexp += 20
                    user.phonixlastclaim = new Date * 1
                    m.reply(`ғᴇᴇᴅɪɴɢ *${type}*...\n*${emo} :* ${pesan}`)
                    if (phonix > 0) {
                        let naiklvl = ((phonix * 100) - 1)
                        if (user.phonixexp > naiklvl) {
                            user.phonix += 1
                            user.phonixexp -= (phonix * 100)
                            m.reply(`*ᴄᴏɴɢʀᴀᴛs!* , ʏᴏᴜʀ ᴘᴇᴛ ʟᴇᴠᴇʟᴜᴘ`)
                        }
                    }
                } else m.reply(`*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet`)
            } else m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ɪs ғᴜʟʟ, ᴛʀʏ ғᴇᴇᴅɪɴɢ ɪᴛ ᴀɢᴀɪɴ ɪɴ\n➞ *${waktuk}*`)
            break
            case 'robo':
            if (robot == 0) return m.reply('*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet')
            if (robot == 10) return m.reply('ʏᴏᴜʀ ᴘᴇᴛ ɪs ᴍᴀx ʟᴇᴠᴇʟ !')
            let __wakturb = (new Date - user.robolastfeed)
            let _wakturb = (600000 - __wakturb)
            let wakturb = clockString(_wakturb)
            if (new Date - user.robolastfeed > 600000) {
                if (user.makananpet > 0) {
                    user.makananpet -= 1
                    user.roboexp += 20
                    user.robolastfeed = new Date * 1
                    m.reply(`ғᴇᴇᴅɪɴɢ *${type}*...\n*${emo} :* ${pesan}`)
                    if (robot > 0) {
                        let naiklvl = ((robot * 100) - 1)
                        if (user.roboexp > naiklvl) {
                            user.robo += 1
                            user.roboexp -= (robot * 100)
                            m.reply(`*ᴄᴏɴɢʀᴀᴛs!* , ʏᴏᴜʀ ᴘᴇᴛ ʟᴇᴠᴇʟᴜᴘ`)
                        }
                    }
                } else m.reply(`*kamu tidak memiliki makanan pet*\n\n> ketik .shop buy makananpet\nuntuk memberi makan pet`)
            } else m.reply(`ʏᴏᴜʀ ᴘᴇᴛ ɪs ғᴜʟʟ, ᴛʀʏ ғᴇᴇᴅɪɴɢ ɪᴛ ᴀɢᴀɪɴ ɪɴ\n➞ *${wakturb}*`)
            break
        default:
            return m.reply(info)
    }
}
handler.help = ['feed']
handler.tags = ['rpg']
handler.command = /^(feed(ing)?)$/i

handler.register = true
handler.rpg = true
module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S'].map(v => v.toString().padStart(2, 0)).join('')
}
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}