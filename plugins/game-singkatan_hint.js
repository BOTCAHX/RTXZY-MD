let handler = async (m, { conn }) => {
     conn.singkatan =  conn.singkatan ?  conn.singkatan : {}
    let id = m.chat
    if (!(id in  conn.singkatan)) throw false
    let json =  conn.singkatan[id][1]
    let ans = json.kepanjangan;
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^sktn/i;
handler.limit = true
module.exports = handler

//gh: dana_putra13