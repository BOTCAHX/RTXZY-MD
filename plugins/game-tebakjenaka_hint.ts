let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakjenaka = conn.tebakjenaka ? conn.tebakjenaka : {}
    let id = m.chat
    if (!(id in conn.tebakjenaka)) throw false
    let json = conn.tebakjenaka[id][1]
    let ans = json.jawaban
    // If the clue shows underscores, lowercase the regex string in the function below
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tbk/i
handler.limit = true
export default handler