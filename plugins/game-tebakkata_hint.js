let handler = async (m, { conn }) => {
    conn.tbkata = conn.tbkata ? conn.tbkata : {}
    let id = m.chat
    if (!(id in conn.tbkata)) throw false
    let json = conn.tbkata[id][1]
    let ans = json.jawaban
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTFWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tkaa/i
handler.limit = true
export default handler

//gh: dana_putra13
