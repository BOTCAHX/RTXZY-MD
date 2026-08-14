let handler: WaPlugin = async (m, { text, usedPrefix }) => {
    let salah = `Pilihan yang tersedia\n\ngunting, kertas, batu\n\n${usedPrefix}suit gunting\n\nkasih spasi!`
    if (!text) throw salah
    let astro: string
    const rnd = Math.random()

    if (rnd < 0.34) {
        astro = 'batu'
    } else if (rnd > 0.34 && rnd < 0.67) {
        astro = 'gunting'
    } else {
        astro = 'kertas'
    }

    if (text == astro) {
        m.reply(`Seri!\nkamu: ${text}\nBot: ${astro}`)
    } else if (text == 'batu') {
        if (astro == 'gunting') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`Kamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`Kamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'gunting') {
        if (astro == 'kertas') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`Kamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`Kamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'kertas') {
        if (astro == 'batu') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`Kamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`Kamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else {
        throw salah
    }
}
handler.help = ['suit']
handler.tags = ['game']
handler.command = /^(suit)$/i

export default handler
