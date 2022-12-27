//curi aja gpp by vermods

let handler = async (m, { conn, args, command }) => {
	let group = m.chat
        await m.reply('printah owner adalah tugas Byeee kak😭😌...', m.chat) 
        await  conn.groupLeave(group)
        }
handler.help = ['leavegc', 'out']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i
handler.rowner = true
module.exports = handler
