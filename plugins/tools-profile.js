let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
const { createHash } = require('crypto')
const fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix }) => {
  function sanitizeNumber(number) {
    return number.replace(/\s/g, '').replace(/[@+-]/g, '')
  }

  function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000))
    let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
    return `${days} Hari ${hours} Jam ${minutes} Menit`
  }

  text = sanitizeNumber(text)
  let number = isNaN(text) ? text.split`@`[1] : text

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `*❏ GET NUMBER*

• Tag user: *${usedPrefix}profile @Tag*
• Type number: *${usedPrefix}profile 6289654360447*
• Check my profile: *(Balas / Reply Pesan Anda Sendiri)*`, m)
  }

  if (isNaN(number) || number.length > 15) {
    return conn.reply(m.chat, `*❏ INVALID NUMBER*

• Tag user: *${usedPrefix}profile @Tag*
• Type number: *${usedPrefix}profile 6289654360447*`, m)
  }

  let who = m.quoted ? m.quoted.sender : number + '@s.whatsapp.net'
  let pp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIdvC1Q4WL7_zA6cJm3yileyBT2OsWhBb9Q&usqp=CAU'

  try {
    pp = await conn.profilePictureUrl(who, 'image')
  } catch (e) {}

  if (typeof global.db.data.users[who] === 'undefined') {
    throw 'Pengguna tidak ada di dalam database'
  }

  let user = global.db.data.users[who]
  let now = Date.now()
  let premiumTimeLeft = user.premiumTime > now ? msToDate(user.premiumTime - now) : '*Tidak diatur expired premium!*'

  let { name, pasangan, limit, exp, money, bank, age, level, role, registered, regTime, premium } = user
  let { min, xp, max } = levelling.xpRange(level, global.multiplier)
  let username = conn.getName(who)
  let about = (await conn.fetchStatus(who).catch(() => ({}))).status || ''
  let sn = createHash('md5').update(who).digest('hex')
  let math = max - xp
  let jodoh = pasangan ? `Berpacaran @${pasangan.split`@`[0]}` : 'Jomblo'

  let profileText = `
┌─⊷ *PROFILE*
👤 • Username: ${username} ${registered ? `(${name})` : ''} (@${who.split`@`[0]})
👥 • About: ${about}
🏷 • Status: ${jodoh}
📞 • Number: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
🔢 • Serial Number: ${sn}
🔗 • Link: https://wa.me/${who.split`@`[0]}
👥 • Umur: ${registered ? age : ''}
└──────────────

┌─⊷ *PROFILE RPG*
▢ XP: TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Ready to *${usedPrefix}levelup*` : `${math} XP left to levelup`}]
▢ Level: ${level}
▢ Role: ${role}
▢ Limit: ${limit}
▢ Money: ${money}
└──────────────

┌─⊷ *STATUS*
📑 • Registered: ${registered ? `Yes (${new Date(regTime).toLocaleString()})` : 'No'}
🌟 • Premium: ${premium ? 'Yes' : 'No'}
⏰ • PremiumTime: ${premiumTimeLeft}
└──────────────`.trim()

  let mentionedJid = [who]
  conn.sendFile(m.chat, pp, 'pp.jpg', profileText, m, false, {
    contextInfo: { mentionedJid: conn.parseMention(profileText) }
  })
}

handler.help = ['profile [@user]']
handler.tags = ['info']
handler.command = /^profile$/i
handler.limit = true
handler.register = false
handler.group = true

module.exports = handler
