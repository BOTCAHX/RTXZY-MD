const moneyplus = 1
let handler: WaPlugin = async (m, { conn, command, args }) => {
  let count = command.replace(/^atm/i, '')
  count = String(count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / moneyplus) : parseInt(count) : args[0] ? parseInt(args[0]) : 1)
  const countN = Math.max(1, +count || 1)
  if (global.db.data.users[m.sender].money >= moneyplus * countN) {
    global.db.data.users[m.sender].money -= moneyplus * countN
    global.db.data.users[m.sender].bank += countN
    conn.reply(m.chat, `🚩 -${moneyplus * countN} Money\n+ ${countN} ATM`, m)
  } else conn.reply(m.chat, `🚩 Money not enough to save ${countN} ATM`, m)
}
handler.help = ['atm *<amount>*', 'atmall']
handler.tags = ['rpg']
handler.command = /^(atm([0-9]+)|atm|atmall)$/i
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
