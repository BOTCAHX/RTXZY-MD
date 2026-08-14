let handler: WaPlugin = async (m, { conn }) => {
     conn.singkatan =  conn.singkatan ?  conn.singkatan : {}
    let id = m.chat
    if (!(id in  conn.singkatan)) throw false
    let json =  conn.singkatan[id][1]
    let ans = json.kepanjangan;
    // If the clue shows unmasked letters, lowercase the answer so consonants get replaced with (_)
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^sktn/i;
handler.limit = true
export default handler