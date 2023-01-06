var axios = require("axios");
var cheerio = require("cheerio");
var handler = async (m, { 
text,
usedPrefix,
command
 }) => {
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} kejadian`
    var res = await axios.get(`https://alkitab.me/search?q=${encodeURIComponent(text)}`, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36" } })

    var $ = cheerio.load(res.data)
    var result = []
    $('div.vw').each(function (a, b) {
        var teks = $(b).find('p').text().trim()
        var link = $(b).find('a').attr('href')
        var title = $(b).find('a').text().trim()
        result.push({ teks, link, title })
    })

    var caption = result.map(v => `${v.title}\n${v.teks}`).join('\n────────\n')
    m.reply(caption)
};
handler.command = handler.help = ['alkitab'];
handler.tags = ['internet'];
module.exports = handler;
