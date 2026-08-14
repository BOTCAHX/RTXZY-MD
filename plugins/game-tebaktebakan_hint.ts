let handler: WaPlugin = async (m, { conn }) => {
    conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {}
    let id = m.chat
    if (!(id in conn.tebaktebakan)) throw false
    let json = conn.tebaktebakan[id][1]
    let ans = json.jawaban
    // If the clue shows underscores, lowercase the regex string in the function below
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTFWXYZbcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tika/i
handler.limit = true
export default handler