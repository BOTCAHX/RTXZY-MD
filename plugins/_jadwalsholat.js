let fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Gunakan contoh: ${usedPrefix}${command} semarang`    
    const res = await (await fetch(`https://widipe.com/jadwalsholat?text=${text}`)).json()    
    if (!res.status || !res.result || !res.result.today) {
        throw eror
    }
    let jadwalSholat = Object.entries(res.result.today)
        .map(([name, time]) => `*${name}:* ${time}`)
        .join('\n')
    let message = `
Jadwal Sholat untuk *${text}* (${res.result.date})
${jadwalSholat}
`.trim()
    m.reply(message)
}

handler.help = ['salat <daerah>']
handler.tags = ['islam']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i
handler.limit = true;
module.exports = handler
