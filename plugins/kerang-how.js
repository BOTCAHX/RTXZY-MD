let handler = async (m, { conn, command, text }) => {
  if (!text) throw `Siapa Yang *${command.replace('how', '').toUpperCase()}*`

  let who = m.mentionedJid?.[0]
  let displayText = text

  if (who && who.endsWith('@s.whatsapp.net')) {
    let number = who.split('@')[0]
    displayText = `@${number}`
  } else if (!who) {
    who = m.sender
    displayText = text.trim() || 'kamu'
  }

  let mentions = who && who.endsWith('@s.whatsapp.net') ? [who] : []

  let percent = Math.floor(Math.random() * 101)
  let result = `
${command} *${displayText}*
*${displayText}* is *${percent}%* ${command.replace('how', '').toUpperCase()}
  `.trim()

  conn.reply(m.chat, result, m, {
    contextInfo: {
      mentionedJid: mentions
    }
  })
}

handler.help = ['gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => 'how' + v + ' siapa?')
handler.tags = ['kerang']
handler.command = /^how(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)/i

handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
