let handler = async (m, { conn }) => {
    conn.susun = conn.susun ? conn.susun : {}
    let id = m.chat
    if (!(id in conn.susun)) throw false
    let json = conn.susun[id][1]
    let ans = json.jawaban
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^susn/i
handler.limit = true
export default handler

//gh: dana_putra13