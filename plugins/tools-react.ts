const __dirname = import.meta.dirname;
let handler: WaPlugin = async (m, { conn, usedPrefix: _p, __dirname, args, text, usedPrefix}) => {
	let notreply = 'Balas Chatnya !'
	if (!m.quoted) throw notreply
	let notemo = `📍 Contoh Penggunaan :\n${usedPrefix}react 🗿`
	if (!text) throw notemo
conn.relayMessage(m.chat, { reactionMessage: {
key: {
 id: m.quoted.id,
 remoteJid: m.chat,
 fromMe: true
},
 text: `${text}`}}, { messageId: m.id })
 }
 handler.help = ['react <emoji>']
handler.tags = ['tools']
handler.command = /^(react)$/i

export default handler
