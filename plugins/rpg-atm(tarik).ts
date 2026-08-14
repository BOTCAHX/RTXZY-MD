const moneymins = 1
let handler: WaPlugin = async (m, { conn, command, args }) => {
  let count = command.replace(/^pull/i, '')
  count = String(count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].bank / moneymins) : parseInt(count) : args[0] ? parseInt(args[0]) : 1)
  const countN = Math.max(1, +count || 1)
  if (global.db.data.users[m.sender].bank >= moneymins * countN) {
    global.db.data.users[m.sender].bank -= moneymins * countN
    global.db.data.users[m.sender].money += countN
    conn.reply(m.chat, `🚩 -${moneymins * countN} ATM\n+ ${countN} Money`, m)
  } else conn.reply(m.chat, `🚩 ATM you are left ${countN} !!`, m)
}
handler.help = ['pull *<amount>*', 'pullall']
handler.tags = ['rpg']
handler.command = /^pull([0-9]+)|pull|pullall$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.limit = true
handler.admin = false
handler.botAdmin = false
handler.rpg = true

handler.fail = null
handler.exp = 0

export default handler