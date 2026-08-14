let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakkode = conn.tebakkode ? conn.tebakkode : {}
    let id = m.chat
    if (!(id in conn.tebakkode)) throw false
    let json = conn.tebakkode[id][1]
    let ans = json.jawaban
    // If the clue shows underscores, lowercase the regex string in the function below
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz123456789]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^kdo/i
handler.limit = true
export default handler