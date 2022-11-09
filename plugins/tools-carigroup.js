let fetch = require ('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} mabar`
    
    let json = await fetch(`https://botcahx.ddns.net/api/search/linkgroupwa?text=${text}`)
        let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons.result) {
        caption += `
*Nama* : ${x.nama}
*Link :* ${x.link}
`}
        return m.reply(caption)
        
}
handler.help = ['carigrup <pencarian>']
handler.tags = ['tools']

handler.command = /^carig(ro?up|c)/i
handler.limit = true

module.exports = handler
