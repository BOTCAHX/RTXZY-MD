let handler: WaPlugin = async (m, { conn, 
	command,
	usedPrefix,
	args
}) => {
	let user = global.db.data.users[m.sender]
	let author = global.author
	let upgrd = (args[0] || '').toLowerCase()
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
    const list = `「 *E A T I N G* 」
╭──『 ғᴏᴏᴅ 』
│⬡ typing command↓
│   ${usedPrefix + command } rendang
│
│⬡ 🍖 *Ayambakar* : ${user.ayambakar}
│⬡ 🍗 *Ayamgoreng* : ${user.ayamgoreng}
│⬡ 🥘 *Rendang* : ${user.rendang}
│⬡ 🥩 *Steak* : ${user.steak}
│⬡ 🥠 *Babipanggang* : ${user.babipanggang}
│⬡ 🍲 *Gulaiayam* : ${user.gulai}
│⬡ 🍜 *Oporayam* : ${user.oporayam}
│⬡ 🍷 *Vodka* : ${user.vodka}
│⬡ 🍣 *Sushi* : ${user.sushi}
│⬡ 💉 *Bandage* : ${user.bandage}
│⬡ ☘️ *Ganja* : ${user.ganja}
│⬡ 🍺 *Soda* : ${user.soda}
│⬡  🍞 *Roti* : ${user.roti}
│⬡ 🍖 *ikan bakar* : ${user.ikanbakar}
│⬡ 🍖 *lele bakar* : ${user.lelebakar}
│⬡ 🍖 *nila bakar* : ${user.nilabakar}
│⬡ 🍖 *bawal bakar* : ${user.bawalbakar}
│⬡ 🍖 *udang bakar* : ${user.udangbakar}
│⬡ 🍖 *paus bakar* : ${user.pausbakar}
│⬡ 🍖 *kepiting bakar* : ${user.kepitingbakar}
╰───────────────
• *Example :* .makan ayamgoreng 

gunakan spasi
`.trim()
    if (/makan|eat/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1  : 1
        switch (type) {
          case 'ayamgoreng':
        if (user.stamina < 100) {
        	if (user.ayamgoreng >= count * 1) {
                            user.ayamgoreng -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Ayam goreng kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'ayambakar':
        if (user.stamina < 100) {
        	if (user.ayambakar >= count * 1) {
                            user.ayambakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Ayam bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'oporayam':
        if (user.stamina < 100) {
        	if (user.oporayam >= count * 1) {
                            user.oporayam -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Opor ayam kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'rendang':
        if (user.stamina < 100) {
        	if (user.rendang >= count * 1) {
                            user.rendang -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Rendang kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'steak':
        if (user.stamina < 100) {
        	if (user.steak >= count * 1) {
                            user.steak -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Steak kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'gulaiayam':
        if (user.stamina < 100) {
        	if (user.gulai >= count * 1) {
                            user.gulai -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Gulai ayam kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'babipanggang':
        if (user.stamina < 100) {
        	if (user.babipanggang >= count * 1) {
                            user.babipanggang -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Babi panggang kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'soda':
        if (user.stamina < 100) {
        	if (user.soda >= count * 1) {
                            user.soda -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Glek glek glek`, m)
                            } else conn.reply(m.chat, ` Soda kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'vodka':
        if (user.stamina < 100) {
        	if (user.vodka >= count * 1) {
                            user.vodka -= count * 1
                            user.stamina += 25 * count
                            conn.reply(m.chat, `Glek Glek Glek`, m)
                            } else conn.reply(m.chat, ` Vodka kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'ganja':
        if (user.stamina < 100) {
        	if (user.ganja >= count * 1) {
                            user.ganja -= count * 1
                            user.healt += 90 * count
                            conn.reply(m.chat, `ngefly`, m)
                            } else conn.reply(m.chat, ` Ganja kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'bandage':
        if (user.stamina < 100) {
        	if (user.bandage >= count * 1) {
                            user.bandage -= count * 1
                            user.healt += 25 * count
                            conn.reply(m.chat, `Sretset`, m)
                            } else conn.reply(m.chat, ` Bandage kamu kurang` ,m)
        } else conn.reply( m.chat, `Healt kamu sudah penuh`, m)
        break
        case 'sushi':
        if (user.stamina < 100) {
        	if (user.sushi >= count * 1) {
                            user.sushi -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Sushi kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'roti':
        if (user.stamina < 100) {
        	if (user.roti >= count * 1) {
                            user.roti -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Roti kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'ikanbakar':
        if (user.stamina < 100) {
        	if (user.ikanbakar >= count * 1) {
                            user.ikanbakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` ikan bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'lelebakar':
        if (user.stamina < 100) {
        	if (user.lelebakar >= count * 1) {
                            user.lelebakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` lele bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'nilabakar':
        if (user.stamina < 100) {
        	if (user.nilabakar >= count * 1) {
                            user.nilabakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` nila bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'bawalbakar':
        if (user.stamina < 100) {
        	if (user.bawalbakar >= count * 1) {
                            user.bawalbakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` bawal bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'udangbakar':
        if (user.stamina < 100) {
        	if (user.udangbakar >= count * 1) {
                            user.udangbakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` udang bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'pausbakar':
        if (user.stamina < 100) {
        	if (user.pausbakar >= count * 1) {
                            user.pausbakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` paus bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
        case 'kepitingbakar':
        if (user.stamina < 100) {
        	if (user.kepitingbakar >= count * 1) {
                            user.kepitingbakar -= count * 1
                            user.stamina += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` kepiting bakar kamu kurang` ,m)
        } else conn.reply( m.chat, `Stamina kamu sudah penuh`, m)
        break
          default:
       await conn.reply(m.chat, list, m)
            }
    } else if (/p/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1  : 1
      switch (_type) {
        case 'p':
         break
         default:
		return conn.reply(m.chat, list,m)
         }
                            
        const e: unknown = null
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
            conn.reply(jid, 'shop.js error\nNo: *' + m.sender.split('@')[0] + '*\nCommand: *' + m.text + '*\n\n*' + String(e) + '*',m)
                
            }
        }
    }
}

handler.help = ['eat', 'makan']
handler.tags = ['rpg']
handler.register = true
handler.command = /^(eat|makan)$/i
handler.rpg = true
export default handler