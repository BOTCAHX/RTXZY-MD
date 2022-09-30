const xpperlimit = 350 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buy/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xpperlimit * count
    global.db.data.users[m.sender].limit += count
    conn.sendBut(m.chat, `-${xpperlimit * count} XP\n+ ${count} Limit`, wm, 'Buy All', '.buyall', m)
  } else conn.sendBut(m.chat, `Limit Anda Hanya Bisa Di Beli Dengan Cheat Game!! \n\n Abaikan Pesan Ini Bila Ingin Bermain Bersih Tanpa Curang.`, wm4, 'Setuju Cheat', '.cheat', m)
  m.reply('```Bot Tidak Bisa Menambah Limit User, Namun Bot Bisa Memasang Cheat Limit Dan Cheat All Game```\n\n「 *Hanya User Premium!* 」')
  let footer= 'Silahkan Pilih Salah Satu Opsi Di Bawah Ini'
conn.send2But(m.chat, wm4, footer, 'Daily', '.daily', 'Weekly', '.weekly  ', m,)
}
handler.help = ['buy<jumlah limit>', 'buy <jumlah limit>', 'buyall']
handler.tags = ['xp']
handler.command = /^buy([0-9]+)|buy|buyall$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler 
