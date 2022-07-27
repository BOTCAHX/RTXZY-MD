let { MessageType } = require('@adiwajshing/baileys')
const Bpaus = 25000
const Spaus = 10000
const Bkepiting = 15000
const Skepiting = 8000
const Bgurita = 30000
const Sgurita = 15000
const Bcumi = 9000
const Scumi = 5000
const Bdory = 50000
const Sdory = 30000
const Blumba = 100000
const Slumba = 100000
const Bhiu = 80000
const Shiu = 40000
const Budang = 10000
const Sudang = 8000
const Bikan = 2000
const Sikan = 1000
const Borca = 20000
const Sorca = 15000
const Blobster = 10000
const Slobster = 8000
const Bbuntal = 15000
const Sbuntal = 7000
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
	if (!db.data.chats[m.chat].rpg && m.isGroup) throw 'Feature Rpg Dimatikan Di grup ini\nKetik *!on* *rpg* untuk mengaktifkan fitur'
	let user = global.db.data.users[m.sender]
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
const  Schat = `
${usedPrefix}fishop <Buy|sell> <item> <jumlah>\n
Contoh penggunaan: *${usedPrefix}fishop buy orca 1*\n\n
List Ikan:\n\n
*Ikan   |  Harga beli*\n
🐳Paus.       ${Bpaus}
🦀Kepiting. ${Bkepiting}
🐋Orca.       ${Borca}
🐟Ikan.        ${Bikan}
🦐Udang     ${Budang}
🐙Gurita.     ${Bgurita}
🦑Cumi².     ${Bcumi}
🐠Dory.        ${Bdory}
🐬Lumba²    ${Blumba}
🦞Lobster    ${Blobster}
🐡Buntal.     ${Bbuntal}\n\n
*Ikan   |  Harga Jual*\n
🐳Paus.       ${Spaus}
🦀Kepiting. ${Skepiting}
🐋Orca.       ${Sorca}
🐟Ikan.        ${Sikan}
🦐Udang     ${Sudang}
🐙Gurita.     ${Sgurita}
🦑Cumi.       ${Scumi}
🐠Dory.        ${Sdory}
🐬Lumba².    ${Slumba}\n\n
`.trim()
     	try {
        if (/fishop|tokoikan/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            switch (jualbeli) {
            case 'buy':
                switch (_type) {
                    case 'paus':
                            if (global.db.data.users[m.sender].money >= Bpaus * count) {
                                global.db.data.users[m.sender].money -= Bpaus * count
                                global.db.data.users[m.sender].paus += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} paus dengan harga ${Bpaus * count} money\n\n`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} paus dengan harga ${paus * count} money`,)
                        break
                    case 'ikan':
                            if (global.db.data.users[m.sender].money >= Bikan * count) {
                                global.db.data.users[m.sender].ikan += count * 1
                                global.db.data.users[m.sender].money -= Bikan * count
                                conn.reply(m.chat, `Succes membeli ${count} ikan dengan harga ${Bikan * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)
                        
                        break
                    case 'cumi':
                            if (global.db.data.users[m.sender].money >= Bcumi * count) {
                                global.db.data.users[m.sender].cumi += count * 1
                                global.db.data.users[m.sender].money -= Bcumi * count
                                conn.reply(m.chat, `Succes membeli ${count} cumi  dengan harga ${Bcumi * count} money`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} cumi dengan harga ${Bcumi * count} money\n\n*`, m)
                        
                        break
                    case 'kepiting':
                            if (global.db.data.users[m.sender].money >= Bkepiting * count) {
                                global.db.data.users[m.sender].kepiting += count * 1
                                global.db.data.users[m.sender].money -= Bkepiting * count
                                conn.reply(m.chat, `Succes membeli ${count} kepiting  dengan harga ${Bkepiting * count} money`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} kepiting  dengan harga ${Bkepiting * count} money\n\n*`, m)
                        
                        break
                    case 'udang':
                            if (global.db.data.users[m.sender].money >= Budang * count) {
                                    global.db.data.users[m.sender].udang += count * 1
                                global.db.data.users[m.sender].money -= Budang * count
                                conn.reply(m.chat, `Succes membeli ${count} udang  dengan harga ${Budang * count} money`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} udang  dengan harga ${Budang* count} money\n\n*`, m)
                        
                        break
                    case 'dory':
                            if (global.db.data.users[m.sender].money >= Bdory * count) {
                                global.db.data.users[m.sender].dory += count * 1
                                global.db.data.users[m.sender].money -= Bdory * count
                                conn.reply(m.chat, `Succes membeli ${count} dory  dengan harga ${Bdory * count} money`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} dory  dengan harga ${Bdory * count} money\n\n*`, m)
                        
                        break
                 case 'lobster':
                            if (global.db.data.users[m.sender].money >= Blobster * count) {
                                global.db.data.users[m.sender].lobsyer += count * 1
                                global.db.data.users[m.sender].money -= Blobster * count
                                conn.reply(m.chat, `Succes membeli ${count} dory  dengan harga ${Blobster * count} money`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} lobster  dengan harga ${Blobster * count} money\n\n*`, m)
                        
                        break     
                    case 'buntal':
                            if (global.db.data.users[m.sender].money >= Bbuntal * count) {
                                global.db.data.users[m.sender].buntal += count * 1
                                global.db.data.users[m.sender].money -= Bbuntal * count
                                conn.reply(m.chat, `Succes membeli ${count} buntal  dengan harga ${Bbuntal * count} money`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} buntal  dengan harga ${Bbuntal * count} money\n\n*`, m)
                        
                        break                   
                        case 'orca':
                            if (global.db.data.users[m.sender].money >= Borca * count) {
                                global.db.data.users[m.sender].money -= Borca * count
                                global.db.data.users[m.sender].orca += count * 1
                                conn.reply(m.chat, `Succes membeli  orca dengan harga ${Borca * count} money\n\n`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} orca dengan hargBo) * count} money\n\n`, m)
                        break
                    case 'gurita':
                            if (global.db.data.users[m.sender].money >= Bgurita * count) {
                                global.db.data.users[m.sender].gurita += count * 1
                                global.db.data.users[m.sender].money -= Bgurita * count
                                conn.reply(m.chat, `Succes membeli ${count} gurita dengan harga ${Bgurita * count} money`, m)
                            } else conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} gurita dengan harga ${Bgurita * count} money`.trim(), m)
                            break
                }
                break
            case 'sell': 
                switch (_type) {
                    case 'orca':
                        if (global.db.data.users[m.sender].orca >= count * 1) {
                            global.db.data.users[m.sender].money += Sorca * count
                            global.db.data.users[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} orca dengan harga ${Sorca * count} money`.trim(), m)
                        } else conn.reply(m.chat, `orca kamu tidak cukup`.trim(), m)
                        break
                    case 'ikan':
                        if (global.db.data.users[m.sender].ikan >= count * 1) {
                            global.db.data.users[m.sender].money += Sikan * count
                            global.db.data.users[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} ikan  dengan harga ${Sikan * count} money`.trim(), m)
                        } else conn.reply(m.chat, `ikan  kamu tidak cukup`.trim(), m)
                        break
                    case 'paus':
                        if (global.db.data.users[m.sender].paus >= count * 1) {
                            global.db.data.users[m.sender].money += Spaus * count
                            global.db.data.users[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} paus  dengan harga ${Spaus * count} money`.trim(), m)
                        } else conn.reply(m.chat, `paus  kamu tidak cukup`.trim(), m)
                        break
                    case 'gurita':
                        if (global.db.data.users[m.sender].gurita >= count * 1) {
                            global.db.data.users[m.sender].money += Sgurita * count
                            global.db.data.users[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} gurita  dengan harga ${Sgurita * count} money`.trim(), m)
                        } else conn.reply(m.chat, `gurita  kamu tidak cukup`.trim(), m)
                        break
                    case 'udang':
                        if (global.db.data.users[m.sender].udang >= count * 1) {
                            global.db.data.users[m.sender].money += Sudang * count
                            global.db.data.users[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} udang  dengan harga ${Sudang * count} money`.trim(), m)
                        } else conn.reply(m.chat, `udang  kamu tidak cukup`.trim(), m)
                        break
                     case 'buntal':
                        if (global.db.data.users[m.sender].buntal >= count * 1) {
                            global.db.data.users[m.sender].buntal -= count * 1
                            global.db.data.users[m.sender].money += Sbuntal * count
                            conn.reply(m.chat, `Succes menjual ${count} buntal, dan anda mendapatkan ${Sbuntal * count} money`, m)
                        } else conn.reply(m.chat, `buntal anda tidak cukup`, m)
                        break
                    case 'lobster':
                        if (global.db.data.users[m.sender].lobster >= count * 1) {
                            global.db.data.users[m.sender].lobster -= count * 1
                            global.db.data.users[m.sender].money += Slobster * count
                            conn.reply(m.chat, `Succes menjual ${count} lobster, dan anda mendapatkan ${Slobster * count} money`, m)
                        } else conn.reply(m.chat, `lobster anda tidak cukup`, m)
                        break
                    case 'dory':
                        if (global.db.data.users[m.sender].dory >= count * 1) {
                            global.db.data.users[m.sender].dory -= count * 1
                            global.db.data.users[m.sender].money += Sdory * count
                            conn.reply(m.chat, `Succes menjual ${count} dory, dan anda mendapatkan ${Sdory * count} money`, m)
                        } else conn.reply(m.chat, `dory anda tidak cukup`, m)
                        break
                    case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].cumi -= count * 1
                            global.db.data.users[m.sender].money += Scumi * count
                            conn.reply(m.chat, `Succes menjual ${count} cumi, dan anda mendapatkan ${Scumi * count} money`, m)
                        } else conn.reply(m.chat, `cumi anda tidak cukup`, m)
                        break
                    case 'kepiting':
                        if (global.db.data.users[m.sender].kepiting >= count * 1) {
                            global.db.data.users[m.sender].kepiting -= count * 1
                            global.db.data.users[m.sender].money += Skepiting * count
                            conn.reply(m.chat, `Succes menjual ${count} kepiting, dan anda mendapatkan ${Skepiting * count} money`, m)
                        } else conn.reply(m.chat, `kepiting anda tidak cukup`, m)
                        break
                    case 'hiu':
                        if (global.db.data.users[m.sender].hiu >= count * 1) {
                            global.db.data.users[m.sender].hiu -= count * 1
                            global.db.data.users[m.sender].money += Shiu * count
                            conn.reply(m.chat, `Succes menjual ${count} hiu, dan anda mendapatkan ${Shiu * count} money`, m)
                        } else conn.reply(m.chat, `Hiu anda tidak cukup`, m)
                        break
                    case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].cumi -= count * 1
                            global.db.data.users[m.sender].money += Scumi * count
                            conn.reply(m.chat, `Succes menjual ${count} cumi, dan anda mendapatkan ${Scumi * count} money`, m)
                        } else conn.reply(m.chat, `Cumi anda tidak cukup`, m)
                        break
                    case 'lumba':
                        if (global.db.data.users[m.sender].lumba >= count * 1) {
                            global.db.data.users[m.sender].lumba -= count * 1
                            global.db.data.users[m.sender].money += Slumba * count
                            conn.reply(m.chat, `Succes menjual ${count} lumba, dan anda mendapatkan ${Slumba * count} money`, m)
                        } else conn.reply(m.chat, `lumba anda tidak cukup`, m)
                        break
                }   break                 
               default:
                        return conn.reply(m.chat, Schat, m)
                        }
            }
        }catch (e) {
        conn.reply(m.chat, Schat, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'fishop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
              
            }
        }
    }
  }
handler.help = ['fishop <sell|buy>  <item> <args>', 'tokoikan <sell|buy> <item> <args>']
handler.tags = ['rpg']

handler.command = /^(fishop|tokoikan)$/i
handler.register = true

module.exports = handler 
