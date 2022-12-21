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
        
};
handler.command = handler.help = ['carigrup'];
handler.tags = ['tools'];
handler.limit = true;

module.exports = handler;
