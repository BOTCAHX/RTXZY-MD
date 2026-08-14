let handler: WaPlugin = async (m, { conn }) => {
conn.reply(m.chat, gc as unknown as string, m) 
}
handler.help = ['gcbot']
handler.tags = ['main']
handler.command = /^(gcbot)$/i

export default handler
