let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    try {
        if (!args || !args[0] || args.length < 1) return m.reply(`[❗] Format salah\nContoh : ${usedPrefix}lirik sad!`)
        let res = await fetch(global.API('bg', '/lirik', { 
            title: args[0],
            artist: args[1] || '' 
        }))
        let json = await res.json()
        if (json.status !== true) throw json
        m.reply(`
〘 *Lirik/Lyrics* 〙
_Song Name_ : *${args[0]}*
Requested by : *${conn.getName(m.sender)}*
\`\`\`${json.result}\`\`\`
`.trim())
    } catch (e) {
        m.reply('Error!')
        console.log(e)
        if (DevMode) {
            let file = require.resolve(__filename)
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, file + ' error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
    
handler.help = ['lirik', 'lyrics'].map(v => ' [title] [artist]')
handler.tags = ['internet']
handler.command = /^(l(irik|yrics))$/i

module.exports = handler
