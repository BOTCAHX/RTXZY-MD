let handler = m => m
handler.before = async function (m) {
  this.suit = this.suit ? this.suit : {}
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0

  let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
  if (room) {
    let win = ''
    let tie = false

    if (m.sender == room.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
      if (/^(tolak|gamau|nanti|ga(k.)?bisa)/i.test(m.text)) {
        this.reply(m.chat, `@${room.p2.split('@')[0]} menolak suit, suit dibatalkan`, m, { mentions: [room.p2] })
        delete this.suit[room.id]
        return !0
      }

      room.status = 'play'
      room.asal = m.chat
      clearTimeout(room.waktu)

      this.reply(m.chat, `Suit dimulai!\nPilihan telah dikirim ke PM masing-masing`, m, { mentions: [room.p, room.p2] })

      const pm = `Silahkan pilih suit!\n\nMenang +${room.poin} XP\nKalah -${room.poin_lose} XP\n\nPilih salah satu:\n• Batu\n• Kertas\n• Gunting`

      if (!room.pilih) this.reply(room.p, pm, m, null, ['Batu', 'Kertas', 'Gunting'])
      if (!room.pilih2) this.reply(room.p2, pm, m, null, ['Batu', 'Kertas', 'Gunting'])

      room.waktu_milih = setTimeout(() => {
        if (!room.pilih && !room.pilih2) this.reply(m.chat, 'Kedua pemain tidak memilih, suit dibatalkan', m)
        else if (!room.pilih || !room.pilih2) {
          const afk = !room.pilih ? room.p : room.p2
          const winner = !room.pilih ? room.p2 : room.p
          this.reply(m.chat, `@${afk.split('@')[0]} tidak memilih suit\n@${winner.split('@')[0]} menang +${room.poin} XP`, m, { mentions: [afk, winner] })
          db.data.users[winner].exp += room.poin
          db.data.users[afk].exp -= room.poin_lose
        }
        delete this.suit[room.id]
      }, room.timeout || 60000)
    }

    let reg = /^(batu|kertas|gunting)/i
    if (m.sender == room.p && reg.test(m.text) && !room.pilih && !m.isGroup) {
      room.pilih = reg.exec(m.text.toLowerCase())[0]
      room.text = m.text
      this.reply(m.chat, `Kamu memilih ${m.text}\nMenunggu lawan...`, m)
      if (!room.pilih2) this.reply(room.p2, 'Lawan sudah memilih\nSekarang giliran kamu!', m)
    }
    if (m.sender == room.p2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
      room.pilih2 = reg.exec(m.text.toLowerCase())[0]
      room.text2 = m.text
      this.reply(m.chat, `Kamu memilih ${m.text}\nMenunggu lawan...`, m)
      if (!room.pilih) this.reply(room.p, 'Lawan sudah memilih\nSekarang giliran kamu!', m)
    }

    if (room.pilih && room.pilih2) {
      clearTimeout(room.waktu_milih)
      if (room.pilih === room.pilih2) tie = true
      else if ((room.pilih === 'batu' && room.pilih2 === 'gunting') || 
               (room.pilih === 'gunting' && room.pilih2 === 'kertas') || 
               (room.pilih === 'kertas' && room.pilih2 === 'batu')) win = room.p
      else win = room.p2

      this.reply(room.asal, `
Hasil Suit${tie ? '\nSeri!' : ''}

@${room.p.split('@')[0]} (${room.text}) ${tie ? '' : room.p === win ? `Menang +${room.poin} XP` : `Kalah -${room.poin_lose} XP`}
@${room.p2.split('@')[0]} (${room.text2}) ${tie ? '' : room.p2 === win ? `Menang +${room.poin} XP` : `Kalah -${room.poin_lose} XP`}
`.trim(), m, { mentions: [room.p, room.p2] })

      if (!tie) {
        db.data.users[win].exp += room.poin
        db.data.users[win === room.p ? room.p2 : room.p].exp -= room.poin_lose
      }
      delete this.suit[room.id]
    }
  }
  return !0
}

handler.exp = 0
module.exports = handler