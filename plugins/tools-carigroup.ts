import fetch from 'node-fetch'

let handler: WaPlugin = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} mabar`    
    try {
    await m.reply(wait)
        const response = await fetch(`https://api.botcahx.eu.org/api/search/linkgroupwa?text1=${encodeURIComponent(text)}&apikey=${btc}`)
        const data = await response.json()    
        if (!data.result || data.result.length === 0) throw 'Group tidak ditemukan ¯\\_(ツ)_/¯'       
        const teks = data.result.map(group => group.title + '\n' + group.link).join('\n\n')
        m.reply(teks)      
    } catch (error) {
        console.error(error)
        throw eror
    }
}

handler.help = ['carigrup <pencarian>']
handler.tags = ['tools']
handler.command = /^carig(ro?up|c)/i
handler.limit = true

export default handler
