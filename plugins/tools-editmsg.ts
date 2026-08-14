let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw 'masukkan teks'
	let q = m.quoted ? m.quoted : m
	if (!q.id) throw 'reply pesan bot yang ingin diedit'
	if (!q.fromMe) throw 'itu bukan pesan dari bot'
	await conn.sendMessage(m.chat, { text: text, edit: q })
}

handler.help = ['edit']
handler.tags = ['tools']
handler.command = /^(edit)$/i

export default handler
