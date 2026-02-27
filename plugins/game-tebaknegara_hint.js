let handler = async (m, { conn }) => {
     conn.tebaknegara =  conn.tebaknegara ?  conn.tebaknegara : {}
    let id = m.chat
    if (!(id in  conn.tebaknegara)) throw false
    let json =  conn.tebaknegara[id][1]
    let ans = json.jawaban;
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tbn/i;
handler.limit = true
module.exports = handler

//gh: dana_putra13