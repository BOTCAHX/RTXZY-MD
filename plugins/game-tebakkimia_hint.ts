let handler: WaPlugin = async (m, { conn }) => {
    conn.kimia = conn.kimia ? conn.kimia : {}
    let id = m.chat
    if (!(id in conn.kimia)) throw false
    let json = conn.kimia[id][1]
    let ans = json.lambang
    // If the clue shows underscores, lowercase the regex string in the function below
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTVWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^kmi/i
handler.limit = true
export default handler