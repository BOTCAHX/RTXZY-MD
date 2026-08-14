let handler: WaPlugin = async (m, { conn, text }) => {
  let monsters = [
    { area: 1, name: "Goblin" },
    { area: 1, name: "Slime" },
    { area: 1, name: "Wolf" },
    { area: 2, name: "Nymph" },
    { area: 2, name: "Skeleton" },
    { area: 2, name: "Wolf" },
    { area: 3, name: "Baby Demon" },
    { area: 3, name: "Ghost" },
    { area: 3, name: "Zombie" },
    { area: 4, name: "Imp" },
    { area: 4, name: "Witch" },
    { area: 4, name: "Zombie" },
    { area: 5, name: "Ghoul" },
    { area: 5, name: "Giant Scorpion" },
    { area: 5, name: "Unicorn" },
    { area: 6, name: "Baby Robot" },
    { area: 6, name: "Sorcerer" },
    { area: 6, name: "Unicorn" },
    { area: 7, name: "Cecaelia" },
    { area: 7, name: "Giant Piranha" },
    { area: 7, name: "Mermaid" },
    { area: 8, name: "Giant Crocodile" },
    { area: 8, name: "Nereid" },
    { area: 8, name: "Mermaid" },
    { area: 9, name: "Demon" },
    { area: 9, name: "Harpy" },
    { area: 9, name: "Killer Robot" },
    { area: 10, name: "Dullahan" },
    { area: 10, name: "Manticore" },
    { area: 10, name: "Killer Robot" },
    { area: 11, name: "Baby Dragon" },
    { area: 11, name: "Young Dragon" },
    { area: 11, name: "Scaled Baby Dragon" },
    { area: 12, name: "Kid Dragon" },
    { area: 12, name: "Not so young Dragon" },
    { area: 12, name: "Scaled Kid Dragon" },
    { area: 13, name: "Definitely not so young Dragon" },
    { area: 13, name: "Teen Dragon" },
    { area: 13, name: "Scaled Teen Dragon" },
  ]
  let player = global.db.data.users[m.sender]
  let pengirim = m.sender.split("@")[0]

  let __timers = (Date.now() - global.db.data.users[m.sender].lasthunt)
 let _timers = (1200000 - __timers) 
 let timers = clockString(_timers)

  let area_monsters = monsters[Math.floor(Math.random() * monsters.length)]
  let monster = area_monsters.name
  let area_monsters_area = area_monsters.area
  let monsterName = monster.toUpperCase()

  if (Date.now() - global.db.data.users[m.sender].lasthunt > 1200000) {
    let coins = parseInt(String(Math.floor(Math.random() * 100000)))
    let exp = parseInt(String(Math.floor(Math.random() * 10000)))
    let _healing = `${Math.floor(Math.random() * 100)}`.trim()
    let healing = (+_healing)
    
    player.health -= healing
    player.lasthunt = Date.now() // 2-minute hunt cooldown

    if (player.health < 0) {
      let msg = `*@${pengirim}* Anda Mati Di Bunuh Oleh ${monsterName}`
      if (player.level > 0) {
      if (player.sword > 0) {
        player.level -= 1
        player.sword -= 5
        player.exp -= +exp
        msg += `\nLevel Anda Turun 1 Karena Mati Saat Berburu!\nSword Anda Berkurang 5 Karena Mati Saat Berburu!`
      }
      }
      player.health = 100
      conn.reply(m.chat, msg, m)
      return
    }

    player.money += +coins
    player.exp += +exp
    global.db.data.users[m.sender].tiketcoin += 1
    
    let pesan = `Berhasil menemukan *${monsterName}*
*@${pengirim}* Kamu sudah membunuhnya
Mendapatkan:
${new Intl.NumberFormat('en-US').format(coins)} Money
${new Intl.NumberFormat('en-US').format(exp)} XP
Berkurang -${healing} Health, Tersisa ${player.health} Health

+1 Tiketcoin`
    conn.reply(m.chat, pesan, m)
  } else return conn.reply(m.chat, `Tunggu *${timers}* Untuk Berburu Lagi`, m)
}

handler.help = ['hunter']
handler.tags = ['rpg']
handler.command = /^hunter/i
handler.limit = true
handler.group = true
handler.rpg = true
handler.fail = null

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, '0') ).join(':')
}