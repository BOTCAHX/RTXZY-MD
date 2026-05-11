let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
const { createHash } = require('crypto')

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who = m.sender

  if (m.quoted) {
    who = m.quoted.sender
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    who = m.mentionedJid[0]
  } else if (text) {
    let input = text.replace(/[^0-9]/g, '').trim()
    if (input.length > 5 && input.length < 20) {
      who = input + '@s.whatsapp.net'
    }
  }

  if (!who.includes('@s.whatsapp.net')) {
    who = who.replace('@', '') + '@s.whatsapp.net'
  }

  if (!global.db.data.users[who]) {
    global.db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      registered: false,
      name: '',
      age: -1,
      regTime: -1,
      premium: false,
      premiumDate: 0,
      level: 0,
      money: 0,
      pasangan: '',
      role: 'Newbie',
      banned: false
    }
  }

  let user = global.db.data.users[who]
  let { name, limit, exp, money, lastclaim, premiumDate, premium, registered, regTime, age, level, pasangan } = user

  let about = ''
  try {
    let status = await conn.fetchStatus(who)
    about = status.status || ''
  } catch {}

  let username = await conn.getName(who) || 'User'
  let number = who.split('@')[0]

  let role = (level <= 2) ? 'Newbie'
    : (level <= 4) ? 'Beginner Grade 1'
    : (level <= 6) ? 'Beginner Grade 2'
    : (level <= 8) ? 'Beginner Grade 3'
    : (level <= 10) ? 'Beginner Grade 4'
    : (level <= 20) ? 'Private Grade 1'
    : (level <= 30) ? 'Private Grade 2'
    : (level <= 40) ? 'Private Grade 3'
    : (level <= 50) ? 'Private Grade 4'
    : (level <= 60) ? 'Private Grade 5'
    : (level <= 70) ? 'Corporal Grade 1'
    : (level <= 80) ? 'Corporal Grade 2'
    : (level <= 90) ? 'Corporal Grade 3'
    : (level <= 100) ? 'Corporal Grade 4'
    : (level <= 110) ? 'Corporal Grade 5'
    : (level <= 120) ? 'Sergeant Grade 1'
    : (level <= 130) ? 'Sergeant Grade 2'
    : (level <= 140) ? 'Sergeant Grade 3'
    : (level <= 150) ? 'Sergeant Grade 4'
    : (level <= 160) ? 'Sergeant Grade 5'
    : (level <= 170) ? 'Staff Grade 1'
    : (level <= 180) ? 'Staff Grade 2'
    : (level <= 190) ? 'Staff Grade 3'
    : (level <= 200) ? 'Staff Grade 4'
    : (level <= 210) ? 'Staff Grade 5'
    : (level <= 220) ? 'Sergeant Major Grade 1'
    : (level <= 230) ? 'Sergeant Major Grade 2'
    : (level <= 240) ? 'Sergeant Major Grade 3'
    : (level <= 250) ? 'Sergeant Major Grade 4'
    : (level <= 260) ? 'Sergeant Major Grade 5'
    : (level <= 270) ? '2nd Lt. Grade 1'
    : (level <= 280) ? '2nd Lt. Grade 2'
    : (level <= 290) ? '2nd Lt. Grade 3'
    : (level <= 300) ? '2nd Lt. Grade 4'
    : (level <= 310) ? '2nd Lt. Grade 5'
    : (level <= 320) ? '1st Lt. Grade 1'
    : (level <= 330) ? '1st Lt. Grade 2'
    : (level <= 340) ? '1st Lt. Grade 3'
    : (level <= 350) ? '1st Lt. Grade 4'
    : (level <= 360) ? '1st Lt. Grade 5'
    : (level <= 370) ? 'Major Grade 1'
    : (level <= 380) ? 'Major Grade 2'
    : (level <= 390) ? 'Major Grade 3'
    : (level <= 400) ? 'Major Grade 4'
    : (level <= 410) ? 'Major Grade 5'
    : (level <= 420) ? 'Colonel Grade 1'
    : (level <= 430) ? 'Colonel Grade 2'
    : (level <= 440) ? 'Colonel Grade 3'
    : (level <= 450) ? 'Colonel Grade 4'
    : (level <= 460) ? 'Colonel Grade 5'
    : (level <= 470) ? 'Brigadier Early'
    : (level <= 480) ? 'Brigadier Silver'
    : (level <= 490) ? 'Brigadier Gold'
    : (level <= 500) ? 'Brigadier Platinum'
    : (level <= 600) ? 'Brigadier Diamond'
    : (level <= 700) ? 'Legendary'
    : (level <= 800) ? 'Legendary'
    : (level <= 900) ? 'Legendary'
    : (level <= 1000) ? 'Legendary'
    : 'Master Legendary'

  let { min, xp, max } = levelling.xpRange(level, global.multiplier)
  let math = max - xp
  let sn = createHash('md5').update(who).digest('hex')

  let str = `
┌─⊷ *PROFILE*
┃👤 • *Name:* ${username} ${registered ? `(${name})` : ''}
┃@${number}
┃📝 • *About:* ${about || 'Tidak ada bio'}
┃❤️ • *Pasangan:* ${pasangan ? `@${pasangan.split('@')[0]}` : 'Jomblo'}
┃📞 • *Number:* ${PhoneNumber('+' + number).getNumber('international')}
┃🔗 • *Link:* https://wa.me/${number}
┃🔢 • *Serial:* ${sn}
┃🎂 • *Umur:* ${registered ? age + ' tahun' : '-'}
└──────────────

┌─⊷ *RPG INFO*
┃📊 • *Level:* ${level}
┃🔰 • *Role:* ${role}
┃✨ • *XP:* ${exp} (${exp - min} / ${xp})
┃   ${math <= 0 ? 'Siap *levelup*' : `${math} XP lagi`}
┃💰 • *Money:* ${money}
┃💎 • *Limit:* ${limit}
└──────────────

┌─⊷ *STATUS*
┃📌 • *Registered:* ${registered ? 'Yes' : 'No'}
┃⭐ • *Premium:* ${premium ? 'Yes' : 'No'}
┃⏳ • *Premium Expired:* ${premium && premiumDate ? msToDate(premiumDate - Date.now()) : '-'}
┃🕐 • *Last Claim:* ${lastclaim > 0 ? new Date(lastclaim).toLocaleString('id-ID') : '-'}
└──────────────
`.trim()

  let mentionedJid = [who]
  if (pasangan) mentionedJid.push(pasangan)

  await conn.sendMessage(m.chat, { 
    text: str,
    mentions: mentionedJid 
  }, { quoted: m })
}

handler.help = ['profile', 'profil [@user]']
handler.tags = ['info']
handler.command = /^profile?|profil$/i

module.exports = handler

function msToDate(ms) {
  if (!ms || ms < 0) return 'Permanent'
  let days = Math.floor(ms / 86400000)
  let hours = Math.floor((ms % 86400000) / 3600000)
  let minutes = Math.floor((ms % 3600000) / 60000)
  return `${days} hari ${hours} jam ${minutes} menit`
}
