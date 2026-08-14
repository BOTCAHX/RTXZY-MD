let handler = async (m, { conn }) => {
    conn.kimia = conn.kimia ? conn.kimia : {}
    let id = m.chat
    if (!(id in conn.kimia)) throw false
    let json = conn.kimia[id][1]
    let ans = json.lambang
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTVWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^kmi/i
handler.limit = true
export default handler

//gh: dana_putra13