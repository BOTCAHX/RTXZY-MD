let handler = async (m, { conn }) => {
    conn.tebakbendera2 = conn.tebakbendera2 ? conn.tebakbendera2 : {}
    let id = m.chat
    if (!(id in conn.tebakbendera2)) throw false
    let json = conn.tebakbendera2[id][1]
    let ans = json.nama
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^teii/i
handler.limit = true
export default handler

//gh: dana_putra13