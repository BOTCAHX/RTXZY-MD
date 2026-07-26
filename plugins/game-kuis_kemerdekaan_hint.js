let handler = async (m, { conn }) => {
    conn.merdeka = conn.merdeka ? conn.merdeka : {}
    let id = m.chat
    if (!(id in conn.merdeka)) throw false
    let json = conn.merdeka[id][1]
    let ans = json.jawaban
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[BCDFGHJKLMNPQERSVWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^mka/i
handler.limit = true
export default handler

//gh: dana_putra13