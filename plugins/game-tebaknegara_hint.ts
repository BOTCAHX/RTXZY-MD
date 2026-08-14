let handler: WaPlugin = async (m, { conn }) => {
     conn.tebaknegara =  conn.tebaknegara ?  conn.tebaknegara : {}
    let id = m.chat
    if (!(id in  conn.tebaknegara)) throw false
    let json =  conn.tebaknegara[id][1]
    let ans = json.jawaban;
    // If the clue shows underscores, lowercase the regex string in the function below
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tbn/i;
handler.limit = true
export default handler