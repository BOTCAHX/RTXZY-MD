let handler  = async (m, { conn, command, args, usedPrefix }) => {
    let msgerror = (pickRandom(['Error', 'astagfirullah error', 'Nice Error', 'Salah format keknya :v', 'error bro', 'Kocak error :v', 'wtf error :v', 'Ciaaa error', 'error cuyy', 'dahlah (emot batu) error']))
    try {
        let msgkurang = (pickRandom(['potionmu tidak cukup', 'ciaa gk cukup potionyya :v', 'wtf gk cukup :v', 'beli potion dulu, potionmu gk cukup', 'Duaarr potionmu gk cukup', 'eyyyy potionmu kurang', 'beli dulu lah, masak mau pakai potion tapi gk ada potionnnya :v', 'minta ke orang lain suruh transfer potion, biar potionmu gk kurang :v', 'Beli potion dulu KK']))
        let msgpenuh = (pickRandom(['Nyawamu sudah penuh', 'coba deh liat inv mu, nyawamu kan dah 100 ngapai ngunain potion lagi?', 'health mu dah penuh woyy', 'ws kebek weh :v', 'nyawamu dah penuh :v', 'udh weh, udh penuh']))
        let kucing = global.db.data.users[m.sender].kucing
        let usepotion = (kucing == 0 ? 40 : '' || kucing == 1 ? 45 : '' || kucing == 2 ? 50 : '' || kucing == 3 ? 55 : '' || kucing == 4 ? 60 : '' || kucing == 5 ? 65 : '')
        let healt = global.db.data.users[m.sender].healt
        if (/use|pakai/i.test(command)) {
            try {
                let count = (/[0-9]/g.test(args[1])) ? !args[1] || args.length < 2 ? Math.max((Math.ceil((100 - global.db.data.users[m.sender].healt) / usepotion)), 1) : Math.max(args[1], 1) : Math.max((Math.ceil((100 - global.db.data.users[m.sender].healt) / usepotion)), 1)
                 let msgsucces = (pickRandom(['success memakai', 'Nice succes menggunakan', 'berhasil meminum ', 'primitif anda menggunakan', 'anda memakai', 'Anda menggunakan']) + ' *' + (count * 1) + `* ${rpg.emoticon('potion')}Potion`)
                 if (args[0] === 'potion') {
                    if (global.db.data.users[m.sender].healt < 100) {
                        if (global.db.data.users[m.sender].potion >= count * 1) {
                            global.db.data.users[m.sender].potion -= count * 1
                            global.db.data.users[m.sender].healt += usepotion * count
                            conn.send2Button(m.chat, msgsucces, wm, 'inventory', usedPrefix + 'inv', 'petualang', usedPrefix + 'work', m)
                        } else conn.send2Button(m.chat, msgkurang, wm, 'beli potion', usedPrefix + 'beli potion', 'cek inv', usedPrefix + 'inv', m)
                    } else conn.send2Button(m.chat, msgpenuh, wm, 'inventory', usedPrefix + 'inv', 'petualang', usedPrefix + 'work', m)
                } else if (args.length > 2 && args[0] === !'potion') conn.send2Button(m.chat, pickRandom(['Hanya bisa menggunakan potion', 'Mau ngunain apa? Cuma bisa gunain potion :v', 'Wih mau gunain apa kamu, kan hanya bisa potion', 'Waduheck, hanya bisa potion', 'lah, mau gunain apa?, kan hanya bisa potion']) + '\nContoh penggunaan: *' + usedPrefix + 'use potion 1*', wm, 'gunakan 1 potion', usedPrefix + 'use potion 1', 'gunakan 2 potion', usedPrefix + 'use potion 2', m)
            } catch (e) {
                console.log(e)
                throw msgerror
            }
        } else if (/heal/i.test(command)) {
            try {
                let count = (/[0-9]/g.test(args[0])) ? !args[0] || args.length < 1 ? Math.max((Math.ceil((100 - global.db.data.users[m.sender].healt) / usepotion)), 1) : Math.max(args[0], 1) : Math.max((Math.ceil((100 - global.db.data.users[m.sender].healt) / usepotion)), 1)
                let msgsucces = (pickRandom(['success memakai', 'Nice succes menggunakan', 'berhasil meminum ', 'primitif anda menggunakan', 'anda memakai', 'Anda menggunakan']) + ' *' + (count * 1) + `* ${rpg.emoticon('potion')}Potion`)
                if (global.db.data.users[m.sender].healt < 100) {
                    if (global.db.data.users[m.sender].potion >= count * 1) {
                        global.db.data.users[m.sender].potion -= count * 1
                        global.db.data.users[m.sender].healt += usepotion * count
                        conn.send2Button(m.chat, msgsucces, wm, 'inventory', usedPrefix + 'inv', 'petualang', usedPrefix + 'work', m)
                    } else conn.send2Button(m.chat, msgkurang, wm, 'beli potion', usedPrefix + 'beli potion', 'cek inv', usedPrefix + 'inv', m)
                } else conn.send2Button(m.chat, msgpenuh, wm, 'inventory', usedPrefix + 'inv', 'petualang', usedPrefix + 'work', m)
            } catch (e) {
                console.log(e)
                throw msgerror
            }
        }
    } catch (e) {
        console.log(e)
        throw msgerror
    }
}

handler.help = ['use <item> <jumlah>', 'heal']
handler.tags = ['rpg']
handler.command = /^(use|heal)$/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
