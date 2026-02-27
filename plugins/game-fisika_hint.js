let handler = async (m, { conn }) => {
    conn.fisika = conn.fisika ? conn.fisika : {}
    let id = m.chat
    if (!(id in conn.fisika)) throw false
    let json = conn.fisika[id][1]
    let ans = json.jawaban
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz123456789]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^fska/i
handler.limit = true
module.exports = handler

//gh: dana_putra13