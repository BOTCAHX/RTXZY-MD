// fitur gaceng by verdihatorou

let handler = async(m, { conn, args, usedPrefix }) => {
	
let chat = `  ￣へ￣ aku sebel sama kamu tau 
pengen ewee sampe muncrat di kepala ≥﹏≤
 
`.trim()
m.reply(chat)
}
handler.help = ['ayg']
handler.tags = ['owner']
handler.command = /^(ayg)$/i
 
module.exports = handler

handler.premium = true
