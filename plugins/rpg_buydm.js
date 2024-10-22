const xpperdiamond = 1000000 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buydm/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperdiamond) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperdiamond * count) {
    global.db.data.users[m.sender].exp -= xpperdiamond * count
    global.db.data.users[m.sender].diamond += count
    conn.reply(m.chat, `
┌─「 *NOTA PEMBAYARAN* 」
‣ *Nominal pembelian* : + ${count}💎 
‣ *Usang* : -${xpperdiamond * count} XP
└──────────────`, m)
  } else conn.reply(m.chat, `❎ Maaf, Anda tidak memiliki cukup *XP* untuk membeli *${count}* Berlian 1.000.000 xp\n\nAnda bisa mendapatkan *XP* dengan .daily bermain game atau cek di *.balance* \n\nAtau anda bisa top up ke *.DONATE* dan mengirimkan bukti ke *.OWNER*`, m)
}
handler.help = ['buydm', 'buyalldm']
handler.tags = ['rpg']
handler.command = ['buydm', 'buyalldm'] 
handler.group = true

module.exports = handler;
