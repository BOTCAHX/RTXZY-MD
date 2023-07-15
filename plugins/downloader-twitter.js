var fetch = require("node-fetch");
var handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`
if (!args[0].match(/twitter/gi)) throw `URL Tidak Ditemukan!`
m.reply('wait')
try {
        const api = await fetch(`https://api.botcahx.live/api/dowloader/twitter?url=${args[0]}&apikey=${btc}`)
        const res = await api.json()
        for (let i of res.result) {
            conn.sendFile(m.chat, i.url, null, `*Twitter Downloader*`, m)
        }
    } catch (e) {
        throw `*Server Down!*`
    }
};
handler.command = handler.help = ['twitter','twitdl','twitterdl'];
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;
module.exports = handler;
