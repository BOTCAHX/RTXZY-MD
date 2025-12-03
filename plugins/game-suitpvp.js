let timeout = 60000
let poin = 500
let poin_lose = -100

let handler = async (m, { conn, usedPrefix }) => {
  conn.suit = conn.suit || {}

  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) {
    throw 'Selesaikan suit kamu yang sebelumnya!'
  }

  if (!m.mentionedJid?.[0]) {
    return m.reply(`Tag orang yang mau kamu tantang!\nContoh: ${usedPrefix}suit @tag`)
  }

  let target = m.mentionedJid[0]

  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(target))) {
    throw 'Orang itu sedang bermain suit dengan orang lain!'
  }

  let id = 'suit_' + Date.now()

  const text = `*SUIT PvP*

@${m.sender.split('@')[0]} menantangmu @${target.split('@')[0]} untuk bermain Suit!

Ketik *terima* / *gas* / *ok* untuk mulai
Ketik *tolak* / *gabisa* untuk menolak`

  conn.suit[id] = {
    id,
    p: m.sender,
    p2: target,
    status: 'wait',
    poin,
    poin_lose,
    timeout,
    waktu: setTimeout(() => {
      if (conn.suit[id]) {
        conn.reply(m.chat, `Tantangan ditarik, @${target.split('@')[0]} tidak merespon`, m, { mentions: [target] })
        delete conn.suit[id]
      }
    }, timeout)
  }

  await conn.reply(m.chat, text, m, { mentions: [m.sender, target] })
}

handler.help = ['suit @tag', 'suitpvp @tag']
handler.tags = ['game']
handler.command = /^suit(pvp|2)?$/i
handler.group = true

module.exports = handler