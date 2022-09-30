const { jadwalsholat } = require('@bochilteam/scraper')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} semarang`
    const res = await jadwalsholat(text)
    m.reply(`
Jadwal Sholat *${text}*
${Object.entries(res.today).map(([name, data]) => `*Sholat ${name}:* ${data}`).join('\n').trim()}
`.trim())
}
handler.help = ['salat <daerah>']
handler.tags = ['islam']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

module.exports = handler
