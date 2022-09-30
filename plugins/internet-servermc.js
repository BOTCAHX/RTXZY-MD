let { MessageType } = require('@adiwajshing/baileys-md')
let fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    try {
        let type = (args[0] || '').toLowerCase()
        switch (type) {
            case 'bedrock':
                let res = await fetch(global.API('bg', '/minecraft', {
                    server: type, 
                    ip: args[1],
                    port: !args[2] || isNaN(args[2]) ? 19132 : parseInt(args[2])
                }))
                let json = await res.json()
                if (json.status !== true) throw json
                m.reply(`
*Ip:* ${json.result.ip}
*Port:* ${json.result.port}
*Motd:* ${json.result.motd1}
*Gamemode:* ${json.result.gamemode}
*Version:* ${json.result.version}
*ProtocolVersion:* ${json.result.protocolVersion}
*OnlinePlayer(s):* ${json.result.onlinePlayers}
*MaxPlayer(s)* ${json.result.maxPlayers}
`.trim())
                break
            case 'java':
                let _res = await fetch(global.API('bg', '/minecraft', {
                    server: type, 
                    ip: args[1],
                    port: !args[2] || isNaN(args[2]) ? 25565 : parseInt(args[2])
                }))
                let _json = await _res.json()
                if (_json.status !== true) throw _json
                m.reply(`
*Ip:* ${_json.result.ip}
*Port:* ${_json.result.port}
*Motd:* ${_json.result.motd}
*Version:* ${_json.result.version}
*ProtocolVersion:* ${_json.result.protocolVersion}
*OnlinePlayer(s):* ${_json.result.onlinePlayers}
*MaxPlayer(s)* ${_json.result.maxPlayers}
`.trim())
                break
            default:
            return m.reply(`Gunakan format ${usedPrefix}server <bedrock | java> <ip> <port>\ncontoh penggunaan: *${usedPrefix}server bedrock play.nethergames.org 19132*`.trim())
        }
    } catch (e) {
        conn.reply(m.chat, `Gunakan format ${usedPrefix}server <bedrock | java> <ip> <port>\ncontoh penggunaan: *${usedPrefix}server bedrock play.nethergames.org 19132*`.trim(), m)
        console.log(e)
        if (DevMode) {
            let file = require.resolve(__filename)
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, file + ' error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
    
handler.help = ['server <type> <ip> <port>']
handler.tags = ['internet']
handler.command = /^(server)$/i

module.exports = handler
