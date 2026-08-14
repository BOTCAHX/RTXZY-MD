const xpperdiamond = 1000000 
let handler: WaPlugin = async (m, { conn, command, args }) => {
  let count = command.replace(/^buydm/i, '')
  count = String(count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperdiamond) : parseInt(count) : args[0] ? parseInt(args[0]) : 1)
  const countN = Math.max(1, +count || 1)
  if (global.db.data.users[m.sender].exp >= xpperdiamond * countN) {
    global.db.data.users[m.sender].exp -= xpperdiamond * countN
    global.db.data.users[m.sender].diamond += countN
    conn.reply(m.chat, `
┌─「 *NOTA PEMBAYARAN* 」
‣ *Nominal pembelian* : + ${countN}💎 
‣ *Usang* : -${xpperdiamond * countN} XP
└──────────────`, m)
  } else conn.reply(m.chat, `❎ Maaf, Anda tidak memiliki cukup *XP* untuk membeli *${countN}* Berlian 1.000.000 xp\n\nAnda bisa mendapatkan *XP* dengan .daily bermain game atau cek di *.balance* \n\nAtau anda bisa top up ke *.DONATE* dan mengirimkan bukti ke *.OWNER*`, m)
}
handler.help = ['buydm', 'buyalldm']
handler.tags = ['econ']
handler.command = ['buydm', 'buyalldm'] 
handler.group = true
handler.rpg = true
export default handler;