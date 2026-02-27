let fs = require('fs')
let fetch = require('node-fetch')
let winScore = 500
let rewardAmount = 100 

async function handler(m) {
    conn.family = conn.family ? conn.family : {}
    let id = m.chat
    if (id in conn.family) {
        if (conn.family[id].id !== undefined) return conn.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini' + '\nTunggu 3 menit untuk mengakhiri', conn.family[id].msg)
        delete conn.family[id]
        throw false
    }
    conn.family[id] = {}
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/family100-2?apikey=${btc}`)).json()
    let json = src

    let caption = `

 ┌─⊷ *SOAL*
▢ *Soal:* ${json.soal}
▢ Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
▢ (beberapa jawaban terdapat spasi)
▢ tunggu 3 menit untuk mengakhiri
▢ ketik *nyerah* untuk menyelesaikan permainan
└──────────────
`: ''}

+${rewardAmount} kredit sosial! tiap jawaban benar
    `.trim()
    conn.family[id] = {
        id,
        msg: await m.reply(caption),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
        rewardAmount, 
        timeout: setTimeout(() => {
            if (conn.family[id]) {
                conn.reply(m.chat, 'Waktu habis! Game berakhir.', conn.family[id].msg)
                delete conn.family[id]
            }
        }, 180000) // 3 minutes
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.group = true
handler.command = /^family100$/i

handler.nyerah = async function (m) {
    let id = m.chat
    if (id in conn.family) {
        conn.reply(m.chat, 'Permainan berakhir karena menyerah.', conn.family[id].msg)
        clearTimeout(conn.family[id].timeout)
        delete conn.family[id]
    } else {
        conn.reply(m.chat, 'Tidak ada permainan yang sedang berlangsung.', m)
    }
}

module.exports = handler

//danaputra_133