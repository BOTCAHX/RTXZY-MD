let handler = m => m

handler.before = async function (m) {
  this.suit = this.suit ? this.suit : {}

  if (!global.db.data.users[m.sender])
    global.db.data.users[m.sender] = { exp: 0, suit: 0 }

  if (global.db.data.users[m.sender].suit < 0)
    global.db.data.users[m.sender].suit = 0

  let text = (m.text || '').toLowerCase()
  let room = Object.values(this.suit).find(room =>
    room.id && room.status && [room.p, room.p2].includes(m.sender)
  )
  if (!room) return !0

  let win = ''
  let tie = false
  if (
    m.sender === room.p2 &&
    /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa)/i.test(text) &&
    m.isGroup &&
    room.status === 'wait'
  ) {

    if (/^(tolak|gamau|nanti|ga(k.)?bisa)/i.test(text)) {
      this.reply(m.chat,
        `@${room.p2.split('@')[0]} menolak suit, suit dibatalkan`,
        m,
        { mentions: [room.p2] }
      )
      delete this.suit[room.id]
      return !0
    }

    room.status = 'play'
    room.asal = m.chat
    clearTimeout(room.waktu)

    this.reply(m.chat,
      `Suit dimulai!\nPilihan dikirim ke private chat masing-masing`,
      m,
      { mentions: [room.p, room.p2] }
    )

    const pm = `Silahkan pilih:\n\nMenang +${room.poin} XP\nKalah -${room.poin_lose} XP\n\n• Batu\n• Kertas\n• Gunting`

    if (!room.pilih) this.reply(room.p, pm, m)
    if (!room.pilih2) this.reply(room.p2, pm, m)

    room.waktu_milih = setTimeout(() => {
      if (!room.pilih && !room.pilih2)
        this.reply(m.chat, 'Kedua pemain tidak memilih, suit dibatalkan', m)
      else if (!room.pilih || !room.pilih2) {
        const afk = !room.pilih ? room.p : room.p2
        const winner = !room.pilih ? room.p2 : room.p

        this.reply(m.chat,
          `@${afk.split('@')[0]} tidak memilih\n@${winner.split('@')[0]} menang +${room.poin} XP`,
          m,
          { mentions: [afk, winner] }
        )

        global.db.data.users[winner].exp += room.poin
        global.db.data.users[afk].exp -= room.poin_lose
      }

      delete this.suit[room.id]
    }, room.timeout || 60000)
  }
  let reg = /^(batu|kertas|gunting)/i

  if (m.sender === room.p && reg.test(text) && !room.pilih && !m.isGroup) {
    room.pilih = reg.exec(text)[0]
    room.text = text
    this.reply(m.chat, `Kamu memilih ${room.pilih}\nMenunggu lawan...`, m)
    if (!room.pilih2)
      this.reply(room.p2, 'Lawan sudah memilih\nSekarang giliran kamu!', m)
  }

  if (m.sender === room.p2 && reg.test(text) && !room.pilih2 && !m.isGroup) {
    room.pilih2 = reg.exec(text)[0]
    room.text2 = text
    this.reply(m.chat, `Kamu memilih ${room.pilih2}\nMenunggu lawan...`, m)
    if (!room.pilih)
      this.reply(room.p, 'Lawan sudah memilih\nSekarang giliran kamu!', m)
  }

  // ====== HASIL ======
  if (room.pilih && room.pilih2) {
    clearTimeout(room.waktu_milih)

    if (room.pilih === room.pilih2) tie = true
    else if (
      (room.pilih === 'batu' && room.pilih2 === 'gunting') ||
      (room.pilih === 'gunting' && room.pilih2 === 'kertas') ||
      (room.pilih === 'kertas' && room.pilih2 === 'batu')
    ) win = room.p
    else win = room.p2

    this.reply(room.asal, `
Hasil Suit${tie ? '\nSeri!' : ''}

@${room.p.split('@')[0]} (${room.pilih})
@${room.p2.split('@')[0]} (${room.pilih2})
`.trim(), m, { mentions: [room.p, room.p2] })

    if (!tie) {
      global.db.data.users[win].exp += room.poin
      global.db.data.users[win === room.p ? room.p2 : room.p].exp -= room.poin_lose
    }

    delete this.suit[room.id]
  }

  return !0
}

handler.exp = 0
module.exports = handler
