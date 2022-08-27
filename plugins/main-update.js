//nyoba doang

let { execSync } = require('child_process')
let handler = async (m, { conn, text, isROwner }) => {
  if (global.conn.user.jid == conn.user.jid) {
    let stdout = execSync('git remote set-url origin https://github.com/BOTCAHX/RTXZY-MD.git && git pull' + (isROwner && text ? ' ' + text : ''))
    if (isROwner) require('fs').readdirSync('plugins').map(v => global.reload('', v))
    m.reply(stdout.toString())
  }
}
handler.help = ['update']
handler.tags = ['owner']
handler.command = /^update$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler
