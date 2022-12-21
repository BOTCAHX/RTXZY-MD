var fetch = require ("node-fetch");
var handler = async (m, { 
                        text, 
                        usedPrefix, 
                        command }) 
                         => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} mabar`
    
    var json = await fetch(`https://api.tiodevhost.my.id/api/search/linkgroupwa?text=${text}`)
        var jsons = await json.json()
        var caption = `*⎔┉━「 ${command} 」━┉⎔*`
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
