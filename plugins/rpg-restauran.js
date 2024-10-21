let { MessageType } = require('@adiwajshing/baileys')
const Hab = 20000
const Hag = 15000
const Hr = 15000
const Hs = 20000
const Hbp = 50000
const Hga = 15000
const Hoa = 15000
const Hv = 50000
const Hsu = 30000
const Hb = 20000
const Hg = 100000
const Hso = 50000
const Hro = 10000
const Hib = 15000
const Hlb = 15000
const Hnb = 15000
const Hbb = 15000
const Hub = 15000
const Hpb = 200000
const Hkb = 20000
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    const _armor = global.db.data.users[m.sender].armor
    const armor = (_armor == 0 ? 20000 : '' || _armor == 1 ? 49999 : '' || _armor == 2 ? 99999 : '' || _armor == 3 ? 149999 : '' || _armor == 4 ? 299999 : '')
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
    const Kchat = `━━━━━━━━━━━━━━━━━\n
╭──『 ғᴏᴏᴅ 』
│⬡ *ayambakar* : ${Hab}
│⬡ *ayamgoreng* : ${Hag} 
│⬡ *rendang* : ${Hr} 
│⬡ *steak* : ${Hs} 
│⬡ *babipanggang* : ${Hbp} 
│⬡ *gulaiayam* : ${Hga} 
│⬡ *oporayam* : ${Hoa} 
│⬡ *vodka* : ${Hv} 
│⬡ *sushi* : ${Hsu} 
│⬡ *bandage* : ${Hb} 
│⬡ *ganja* : ${Hg} 
│⬡ *soda* : ${Hso} 
│⬡  *roti* : ${Hro}
│⬡ *ikanbakar* : ${Hib}
│⬡ *lelebakar* : ${Hlb}
│⬡ *nilabakar* : ${Hnb}
│⬡ *bawalbakar* : ${Hbb}
│⬡ *udangbakar* : ${Hub}
│⬡ *pausbakar* : ${Hpb}
│⬡ *kepitingbakar* : ${Hkb}
╰───────────────
━━━━━━━━━━━━━━━━━

> *Contoh pembelian :*
#resto beli food jumlah
#resto beli ayambakar 2
`.trim()
    try {
        if (/resto/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            const sampah = global.db.data.users[m.sender].sampah
            switch (jualbeli) {
            case 'beli':
                switch (_type) {
                    case 'ayambakar':
                            if (global.db.data.users[m.sender].money >= Hab * count) {
                                global.db.data.users[m.sender].money -= Hab * count
                                global.db.data.users[m.sender].ayambakar += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Ayam Bakar dengan harga ${Hab * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'ayamgoreng':
                            if (global.db.data.users[m.sender].money >= Hag * count) {
                                global.db.data.users[m.sender].ayamgoreng += count * 1
                                global.db.data.users[m.sender].money -= Hag * count
                                conn.reply(m.chat, `Succes membeli ${count} Ayam Goreng dengan harga ${Hag * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'rendang':
                            if (global.db.data.users[m.sender].money >= Hr * count) {
                                global.db.data.users[m.sender].rendang += count * 1
                                global.db.data.users[m.sender].money -= Hr * count
                                conn.reply(m.chat, `Succes membeli ${count} Rendang dengan harga ${Hr * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'steak':
                            if (global.db.data.users[m.sender].money >= Hs * count) {
                                global.db.data.users[m.sender].steak += count * 1
                                global.db.data.users[m.sender].money -= Hs * count
                                conn.reply(m.chat, `Succes membeli ${count} Steak dengan harga ${Hs * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'babipanggang':
                            if (global.db.data.users[m.sender].money >= Hbp * count) {
                                global.db.data.users[m.sender].babipanggang += count * 1
                                global.db.data.users[m.sender].money -= Hbp * count
                                conn.reply(m.chat, `Succes membeli ${count} Babi Panggang dengan harga ${Hbp * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'gulaiayam':
                            if (global.db.data.users[m.sender].money >= Hga * count) {
                                global.db.data.users[m.sender].money -= Hga * count
                                global.db.data.users[m.sender].gulai += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Gulai Ayam dengan harga ${Hga * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'oporayam':
                            if (global.db.data.users[m.sender].money >= Hoa * count) {
                                global.db.data.users[m.sender].oporayam += count * 1
                                global.db.data.users[m.sender].money -= Hoa * count
                                conn.reply(m.chat, `Succes membeli ${count} Opor Ayam dengan harga ${Hoa * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'vodka':
                            if (global.db.data.users[m.sender].money >= Hv * count) {
                                global.db.data.users[m.sender].vodka += count * 1
                                global.db.data.users[m.sender].money -= Hv * count
                                conn.reply(m.chat, `Succes membeli ${count} Vodka dengan harga ${Hv * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'sushi':
                            if (global.db.data.users[m.sender].money >= Hsu * count) {
                                global.db.data.users[m.sender].sushi += count * 1
                                global.db.data.users[m.sender].money -= Hsu * count
                                conn.reply(m.chat, `Succes membeli ${count} Sushi dengan harga ${Hsu * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'bandage':
                            if (global.db.data.users[m.sender].money >= Hb * count) {
                                global.db.data.users[m.sender].bandage += count * 1
                                global.db.data.users[m.sender].money -= Hb * count
                                conn.reply(m.chat, `Succes membeli ${count} Bandage dengan harga ${Hb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'ganja':
                            if (global.db.data.users[m.sender].money >= Hg * count) {
                                global.db.data.users[m.sender].money -= Hg * count
                                global.db.data.users[m.sender].ganja += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Ganja dengan harga ${Hg * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'soda':
                            if (global.db.data.users[m.sender].money >= Hso * count) {
                                global.db.data.users[m.sender].soda += count * 1
                                global.db.data.users[m.sender].money -= Hso * count
                                conn.reply(m.chat, `Succes membeli ${count} Soda dengan harga ${Hso * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'roti':
                            if (global.db.data.users[m.sender].money >= Hro * count) {
                                global.db.data.users[m.sender].roti += count * 1
                                global.db.data.users[m.sender].money -= Hro * count
                                conn.reply(m.chat, `Succes membeli ${count} Roti dengan harga ${Hro * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'ikanbakar':
                            if (global.db.data.users[m.sender].money >= Hib * count) {
                                global.db.data.users[m.sender].ikanbakar += count * 1
                                global.db.data.users[m.sender].money -= Hib * count
                                conn.reply(m.chat, `Succes membeli ${count} Ikan Bakar dengan harga ${Hib * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'lelebakar':
                            if (global.db.data.users[m.sender].money >= Hlb * count) {
                                global.db.data.users[m.sender].lelebakar += count * 1
                                global.db.data.users[m.sender].money -= Hlb * count
                                conn.reply(m.chat, `Succes membeli ${count} Lele Bakar dengan harga ${Hlb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'nilabakar':
                            if (global.db.data.users[m.sender].money >= Hnb * count) {
                                global.db.data.users[m.sender].money -= Hnb * count
                                global.db.data.users[m.sender].nilabakar += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Nila Bakar dengan harga ${Hnb * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'bawalbakar':
                            if (global.db.data.users[m.sender].money >= Hbb * count) {
                                global.db.data.users[m.sender].bawalbakar += count * 1
                                global.db.data.users[m.sender].money -= Hbb * count
                                conn.reply(m.chat, `Succes membeli ${count} Bawal Bakar dengan harga ${Hbb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'udangbakar':
                            if (global.db.data.users[m.sender].money >= Hub * count) {
                                global.db.data.users[m.sender].udangbakar += count * 1
                                global.db.data.users[m.sender].money -= Hub * count
                                conn.reply(m.chat, `Succes membeli ${count} Udang Bakar dengan harga ${Hub * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'pausbakar':
                            if (global.db.data.users[m.sender].money >= Hpb * count) {
                                global.db.data.users[m.sender].pausbakar += count * 1
                                global.db.data.users[m.sender].money -= Hpb * count
                                conn.reply(m.chat, `Succes membeli ${count} Paus Bakar dengan harga ${Hpb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'kepitingbakar':
                            if (global.db.data.users[m.sender].money >= Hkb * count) {
                                global.db.data.users[m.sender].kepitingbakar += count * 1
                                global.db.data.users[m.sender].money -= Hkb * count
                                conn.reply(m.chat, `Succes membeli ${count} Kepiting Bakar dengan harga ${Hkb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break
            /*case 'jual': 
                switch (_type) {                  
                     case 'banteng':
                        if (global.db.data.users[m.sender].banteng >= count * 1) {
                            global.db.data.users[m.sender].money += Spaus * count
                            global.db.data.users[m.sender].banteng -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Banteng Dengan Harga ${Sbanteng * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Banteng Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'harimau':
                        if (global.db.data.users[m.sender].harimau >= count * 1) {
                            global.db.data.users[m.sender].money += Sharimau * count
                            global.db.data.users[m.sender].harimau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Harimau Dengan Harga ${Sharimau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Harimau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gajah':
                        if (global.db.data.users[m.sender].gajah >= count * 1) {
                            global.db.data.users[m.sender].money += Sgajah * count
                            global.db.data.users[m.sender].gajah -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Gajah Dengan Harga ${Sgajah * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gajah Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kambing':
                        if (global.db.data.users[m.sender].kambing >= count * 1) {
                            global.db.data.users[m.sender].money += Skambing * count
                            global.db.data.users[m.sender].kambing -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Kambing Dengan Harga ${Skambing * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kambing Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'panda':
                        if (global.db.data.users[m.sender].panda >= count * 1) {
                            global.db.data.users[m.sender].money += Spanda * count
                            global.db.data.users[m.sender].panda -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Panda Dengan Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Panda Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buaya':
                        if (global.db.data.users[m.sender].buaya >= count * 1) {
                            global.db.data.users[m.sender].money += Sbuaya * count
                            global.db.data.users[m.sender].buaya -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Buaya Dengan Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Buaya Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kerbau':
                        if (global.db.data.users[m.sender].kerbau >= count * 1) {
                            global.db.data.users[m.sender].money += Skerbau * count
                            global.db.data.users[m.sender].kerbau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Kerbau Dengan Harga ${Skerbau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kerbau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'sapi':
                        if (global.db.data.users[m.sender].sapi >= count * 1) {
                            global.db.data.users[m.sender].money += Ssapi * count
                            global.db.data.users[m.sender].sapi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Sapi Dengan Harga ${Ssapi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Sapi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'monyet':
                        if (global.db.data.users[m.sender].monyet >= count * 1) {
                            global.db.data.users[m.sender].money += Smonyet * count
                            global.db.data.users[m.sender].monyet -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Monyet Dengan Harga ${Smonyet * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Monyet Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babi':
                        if (global.db.data.users[m.sender].babi >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].babi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Babi Dengan Harga ${Sbabi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babihutan':
                        if (global.db.data.users[m.sender].babihutan >= count * 1) {
                            global.db.data.users[m.sender].money += Sbabihutan * count
                            global.db.data.users[m.sender].babihutan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Babi Hutan Dengan Harga ${Sbabihutan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Hutan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ayam':
                        if (global.db.data.users[m.sender].ayam >= count * 1) {
                            global.db.data.users[m.sender].money += Sayam * count
                            global.db.data.users[m.sender].ayam -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ayam Dengan Harga ${Sayam * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ayam Kamu Tidak Cukup`.trim(), m)
                        break
                        //mancing
                        case 'kepiting':
                        if (global.db.data.users[m.sender].kepiting >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].kepiting -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Kepiting Dengan Harga ${Skepiting * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kepiting Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ikan':
                        if (global.db.data.users[m.sender].ikan >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dengan Harga ${Sikan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'dory':
                        if (global.db.data.users[m.sender].dory >= count * 1) {
                            global.db.data.users[m.sender].money += Sdory * count
                            global.db.data.users[m.sender].dory -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dory Dengan Harga ${Sdory * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Dory Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gurita':
                        if (global.db.data.users[m.sender].gurita >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Gurita Dengan Harga ${Sgurita * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gurita Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buntal':
                        if (global.db.data.users[m.sender].buntal >= count * 1) {
                            global.db.data.users[m.sender].money += Sbuntal * count
                            global.db.data.users[m.sender].buntal -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ikan Buntal Dengan Harga ${Sbuntal * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Buntal Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'hiu':
                        if (global.db.data.users[m.sender].hiu >= count * 1) {
                            global.db.data.users[m.sender].money += Shiu * count
                            global.db.data.users[m.sender].hiu -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Hiu Dengan Harga ${Shiu * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Hiu Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'orca':
                        if (global.db.data.users[m.sender].orca >= count * 1) {
                            global.db.data.users[m.sender].money += Sorca * count
                            global.db.data.users[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Paus Orca Dengan Harga ${Sorca * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Orca Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'lumba':
                        if (global.db.data.users[m.sender].lumba >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].lumba -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Lumba Lumba Dengan Harga ${Slumba * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lumba Lumba Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'paus':
                        if (global.db.data.users[m.sender].paus >= count * 1) {
                            global.db.data.users[m.sender].money += Spaus * count
                            global.db.data.users[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Paus Dengan Harga ${Spaus * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Kamu Tidak Cukup`.trim(), m)
                        break
                  case 'lobster':
                        if (global.db.data.users[m.sender].lobster >= count * 1) {
                            global.db.data.users[m.sender].money += Slobster * count
                            global.db.data.users[m.sender].lobster -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Lobster Dengan Harga ${Slobster * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lobster Kamu Tidak Cukup`.trim(), m)
                        break
                     case 'udang':
                        if (global.db.data.users[m.sender].udang >= count * 1) {
                            global.db.data.users[m.sender].money += Sudang * count
                            global.db.data.users[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Udang Dengan Harga ${Sudang * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Udang Kamu Tidak Cukup`.trim(), m)
                        break
                      case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].money += Scumi * count
                            global.db.data.users[m.sender].cumi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Cumi Dengan Harga ${Scumi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Cumi Kamu Tidak Cukup`.trim(), m)
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break*/
            default:
                return conn.sendFile(m.chat, thumb, 'pasar.jpg', `${Kchat}`, m)
            }
        } else if (/beli/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
                case 'ayambakar':
                            if (global.db.data.users[m.sender].money >= Hab * count) {
                                global.db.data.users[m.sender].money -= Hab * count
                                global.db.data.users[m.sender].ayambakar += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Ayam Bakar dengan harga ${Hab * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'ayamgoreng':
                            if (global.db.data.users[m.sender].money >= Hag * count) {
                                global.db.data.users[m.sender].ayamgoreng += count * 1
                                global.db.data.users[m.sender].money -= Hag * count
                                conn.reply(m.chat, `Succes membeli ${count} Ayam Goreng dengan harga ${Hag * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'rendang':
                            if (global.db.data.users[m.sender].money >= Hr * count) {
                                global.db.data.users[m.sender].rendang += count * 1
                                global.db.data.users[m.sender].money -= Hr * count
                                conn.reply(m.chat, `Succes membeli ${count} Rendang dengan harga ${Hr * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'steak':
                            if (global.db.data.users[m.sender].money >= Hs * count) {
                                global.db.data.users[m.sender].steak += count * 1
                                global.db.data.users[m.sender].money -= Hs * count
                                conn.reply(m.chat, `Succes membeli ${count} Steak dengan harga ${Hs * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'babipanggang':
                            if (global.db.data.users[m.sender].money >= Hbp * count) {
                                global.db.data.users[m.sender].babipanggang += count * 1
                                global.db.data.users[m.sender].money -= Hbp * count
                                conn.reply(m.chat, `Succes membeli ${count} Babi Panggang dengan harga ${Hbp * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'gulaiayam':
                            if (global.db.data.users[m.sender].money >= Hga * count) {
                                global.db.data.users[m.sender].money -= Hga * count
                                global.db.data.users[m.sender].gulai += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Gulai Ayam dengan harga ${Hga * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'oporayam':
                            if (global.db.data.users[m.sender].money >= Hoa * count) {
                                global.db.data.users[m.sender].oporayam += count * 1
                                global.db.data.users[m.sender].money -= Hoa * count
                                conn.reply(m.chat, `Succes membeli ${count} Opor Ayam dengan harga ${Hoa * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'vodka':
                            if (global.db.data.users[m.sender].money >= Hv * count) {
                                global.db.data.users[m.sender].vodka += count * 1
                                global.db.data.users[m.sender].money -= Hv * count
                                conn.reply(m.chat, `Succes membeli ${count} Vodka dengan harga ${Hv * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'sushi':
                            if (global.db.data.users[m.sender].money >= Hsu * count) {
                                global.db.data.users[m.sender].sushi += count * 1
                                global.db.data.users[m.sender].money -= Hsu * count
                                conn.reply(m.chat, `Succes membeli ${count} Sushi dengan harga ${Hsu * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'bandage':
                            if (global.db.data.users[m.sender].money >= Hb * count) {
                                global.db.data.users[m.sender].bandage += count * 1
                                global.db.data.users[m.sender].money -= Hb * count
                                conn.reply(m.chat, `Succes membeli ${count} Bandage dengan harga ${Hb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'ganja':
                            if (global.db.data.users[m.sender].money >= Hg * count) {
                                global.db.data.users[m.sender].money -= Hg * count
                                global.db.data.users[m.sender].ganja += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Ganja dengan harga ${Hg * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'soda':
                            if (global.db.data.users[m.sender].money >= Hso * count) {
                                global.db.data.users[m.sender].soda += count * 1
                                global.db.data.users[m.sender].money -= Hso * count
                                conn.reply(m.chat, `Succes membeli ${count} Soda dengan harga ${Hso * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'roti':
                            if (global.db.data.users[m.sender].money >= Hro * count) {
                                global.db.data.users[m.sender].roti += count * 1
                                global.db.data.users[m.sender].money -= Hro * count
                                conn.reply(m.chat, `Succes membeli ${count} Roti dengan harga ${Hro * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'ikanbakar':
                            if (global.db.data.users[m.sender].money >= Hib * count) {
                                global.db.data.users[m.sender].ikanbakar += count * 1
                                global.db.data.users[m.sender].money -= Hib * count
                                conn.reply(m.chat, `Succes membeli ${count} Ikan Bakar dengan harga ${Hib * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'lelebakar':
                            if (global.db.data.users[m.sender].money >= Hlb * count) {
                                global.db.data.users[m.sender].lelebakar += count * 1
                                global.db.data.users[m.sender].money -= Hlb * count
                                conn.reply(m.chat, `Succes membeli ${count} Lele Bakar dengan harga ${Hlb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'nilabakar':
                            if (global.db.data.users[m.sender].money >= Hnb * count) {
                                global.db.data.users[m.sender].money -= Hnb * count
                                global.db.data.users[m.sender].nilabakar += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} Nila Bakar dengan harga ${Hnb * count} money`, m)
                            } else conn.reply(m.chat, `Money Tidak Cukup`,)
                        break
                    case 'bawalbakar':
                            if (global.db.data.users[m.sender].money >= Hbb * count) {
                                global.db.data.users[m.sender].bawalbakar += count * 1
                                global.db.data.users[m.sender].money -= Hbb * count
                                conn.reply(m.chat, `Succes membeli ${count} Bawal Bakar dengan harga ${Hbb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'udangbakar':
                            if (global.db.data.users[m.sender].money >= Hub * count) {
                                global.db.data.users[m.sender].udangbakar += count * 1
                                global.db.data.users[m.sender].money -= Hub * count
                                conn.reply(m.chat, `Succes membeli ${count} Udang Bakar dengan harga ${Hub * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                    case 'pausbakar':
                            if (global.db.data.users[m.sender].money >= Hpb * count) {
                                global.db.data.users[m.sender].pausbakar += count * 1
                                global.db.data.users[m.sender].money -= Hpb * count
                                conn.reply(m.chat, `Succes membeli ${count} Paus Bakar dengan harga ${Hpb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                   case 'kepitingbakar':
                            if (global.db.data.users[m.sender].money >= Hkb * count) {
                                global.db.data.users[m.sender].kepitingbakar += count * 1
                                global.db.data.users[m.sender].money -= Hkb * count
                                conn.reply(m.chat, `Succes membeli ${count} Kepiting Bakar dengan harga ${Hkb * count} money`, m)
                            } else conn.reply(m.chat, `Money anda tidak cukup`, m)                       
                        break
                default:
                    return conn.reply(m.chat, Kchat, m)
            }
      /*  } else if (/sell|jual|/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) { 
                       case 'banteng':
                        if (global.db.data.users[m.sender].banteng >= count * 1) {
                            global.db.data.users[m.sender].money += Spaus * count
                            global.db.data.users[m.sender].banteng -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Banteng Dengan Harga ${Sbanteng * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Banteng Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'harimau':
                        if (global.db.data.users[m.sender].harimau >= count * 1) {
                            global.db.data.users[m.sender].money += Sharimau * count
                            global.db.data.users[m.sender].harimau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Harimau Dengan Harga ${Sharimau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Harimau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gajah':
                        if (global.db.data.users[m.sender].gajah >= count * 1) {
                            global.db.data.users[m.sender].money += Sgajah * count
                            global.db.data.users[m.sender].gajah -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Gajah Dengan Harga ${Sgajah * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gajah Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kambing':
                        if (global.db.data.users[m.sender].kambing >= count * 1) {
                            global.db.data.users[m.sender].money += Skambing * count
                            global.db.data.users[m.sender].kambing -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Kambing Dengan Harga ${Skambing * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kambing Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'panda':
                        if (global.db.data.users[m.sender].panda >= count * 1) {
                            global.db.data.users[m.sender].money += Spanda * count
                            global.db.data.users[m.sender].panda -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Panda Dengan Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Panda Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buaya':
                        if (global.db.data.users[m.sender].buaya >= count * 1) {
                            global.db.data.users[m.sender].money += Sbuaya * count
                            global.db.data.users[m.sender].buaya -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Buaya Dengan Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Buaya Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kerbau':
                        if (global.db.data.users[m.sender].kerbau >= count * 1) {
                            global.db.data.users[m.sender].money += Skerbau * count
                            global.db.data.users[m.sender].kerbau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Kerbau Dengan Harga ${Skerbau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kerbau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'sapi':
                        if (global.db.data.users[m.sender].sapi >= count * 1) {
                            global.db.data.users[m.sender].money += Ssapi * count
                            global.db.data.users[m.sender].sapi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Sapi Dengan Harga ${Ssapi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Sapi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'monyet':
                        if (global.db.data.users[m.sender].monyet >= count * 1) {
                            global.db.data.users[m.sender].money += Smonyet * count
                            global.db.data.users[m.sender].monyet -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Monyet Dengan Harga ${Smonyet * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Monyet Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babi':
                        if (global.db.data.users[m.sender].babi >= count * 1) {
                            global.db.data.users[m.sender].money += Sbabi * count
                            global.db.data.users[m.sender].babi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Babi Dengan Harga ${Sbabi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babihutan':
                        if (global.db.data.users[m.sender].babihutan >= count * 1) {
                            global.db.data.users[m.sender].money += Sbabihutan * count
                            global.db.data.users[m.sender].babihutan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Babi Hutan Dengan Harga ${Sbabihutan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Hutan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ayam':
                        if (global.db.data.users[m.sender].ayam >= count * 1) {
                            global.db.data.users[m.sender].money += Sayam * count
                            global.db.data.users[m.sender].ayam -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ayam Dengan Harga ${Sayam * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ayam Kamu Tidak Cukup`.trim(), m)
                        break
                        //mancing
                        case 'kepiting':
                        if (global.db.data.users[m.sender].kepiting >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].kepiting -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Kepiting Dengan Harga ${Skepiting * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kepiting Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ikan':
                        if (global.db.data.users[m.sender].ikan >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dengan Harga ${Sikan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'dory':
                        if (global.db.data.users[m.sender].dory >= count * 1) {
                            global.db.data.users[m.sender].money += Sdory * count
                            global.db.data.users[m.sender].dory -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dory Dengan Harga ${Sdory * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Dory Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gurita':
                        if (global.db.data.users[m.sender].gurita >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Gurita Dengan Harga ${Sgurita * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gurita Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buntal':
                        if (global.db.data.users[m.sender].buntal >= count * 1) {
                            global.db.data.users[m.sender].money += Sbuntal * count
                            global.db.data.users[m.sender].buntal -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Ikan Buntal Dengan Harga ${Sbuntal * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Buntal Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'hiu':
                        if (global.db.data.users[m.sender].hiu >= count * 1) {
                            global.db.data.users[m.sender].money += Shiu * count
                            global.db.data.users[m.sender].hiu -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Hiu Dengan Harga ${Shiu * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Hiu Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'orca':
                        if (global.db.data.users[m.sender].orca >= count * 1) {
                            global.db.data.users[m.sender].money += Sorca * count
                            global.db.data.users[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Paus Orca Dengan Harga ${Sorca * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Orca Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'lumba':
                        if (global.db.data.users[m.sender].lumba >= count * 1) {
                            global.db.data.users[m.sender].money += Skepiting * count
                            global.db.data.users[m.sender].lumba -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Lumba Lumba Dengan Harga ${Slumba * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lumba Lumba Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'paus':
                        if (global.db.data.users[m.sender].paus >= count * 1) {
                            global.db.data.users[m.sender].money += Spaus * count
                            global.db.data.users[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Paus Dengan Harga ${Spaus * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Kamu Tidak Cukup`.trim(), m)
                        break
                  case 'lobster':
                        if (global.db.data.users[m.sender].lobster >= count * 1) {
                            global.db.data.users[m.sender].money += Slobster * count
                            global.db.data.users[m.sender].lobster -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Lobster Dengan Harga ${Slobster * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lobster Kamu Tidak Cukup`.trim(), m)
                        break
                     case 'udang':
                        if (global.db.data.users[m.sender].udang >= count * 1) {
                            global.db.data.users[m.sender].money += Sudang * count
                            global.db.data.users[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Udang Dengan Harga ${Sudang * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Udang Kamu Tidak Cukup`.trim(), m)
                        break
                      case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].money += Scumi * count
                            global.db.data.users[m.sender].cumi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Cumi Dengan Harga ${Scumi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Cumi Kamu Tidak Cukup`.trim(), m)
                        break                                        
                default:
                    return conn.reply(m.chat, Kchat, m)
            }*/
        }
    } catch (e) {
        conn.reply(m.chat, Kchat, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['resto *<beli> <args>*']
handler.tags = ['rpg']    

handler.command = /^(resto|beli)$/i
module.exports = handler