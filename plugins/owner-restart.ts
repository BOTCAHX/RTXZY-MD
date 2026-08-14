import { spawn } from 'child_process';
let handler: WaPlugin = async (m, { conn, isROwner, text }) => {
  if (!process.send) throw 'Dont: node main.ts\nDo: node index.ts'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Sedang Merestart Bot...\nMohon tunggu sekitar 1 menit')
    process.send('reset')
  } else throw '_eeeeeiiittsssss..._'
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(srvrestart|restart)$/i

handler.rowner = true

export default handler