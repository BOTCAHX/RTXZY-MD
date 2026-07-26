let handler = async (m, { conn }) => {
    conn.tebakislami = conn.tebakislami ? conn.tebakislami : {}
    let id = m.chat
    if (!(id in conn.tebakislami)) throw false
    let json = conn.tebakislami[id][1]
    let ans = json.jawaban
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz123456789]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tsa/i
handler.limit = true
export default handler
