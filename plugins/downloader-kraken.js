let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*🚩 Example:* ${usedPrefix}${command} https://krakenfiles.com/view/HG9WxZaL08/file.html`
    await m.reply(wait)
    let data = await (await fetch(`https://api.botcahx.eu.org/api/download/kraken?url=${text}&apikey=${btc}`)).json()
    let msg = `乂 *K R A K E N  D O W N L O A D E R*\n\n`
    msg += ` ◦ *Name :* ${data.result.fileName}\n`
    msg += ` ◦ *View :* ${data.result.views}\n`
    msg += ` ◦ *Size :* ${data.result.fileSize}\n`
    msg += ` ◦ *Type :* ${data.result.fileType}\n`
    msg += ` ◦ *Uploaded :* ${data.result.uploadDate}\n`
    msg += ` ◦ *Download :* ${data.result.downloads}\n`
    msg += ` ◦ *Last Download :* ${data.result.lastDownloadDate}\n`
    msg += ` ◦ *Link :* ${data.result.urlDownload}`
    msg += `\n`
    await conn.sendFile(m.chat, 'https://krakenfiles.com/images/kf_logo_dark.png', 'thumb_.png', msg, m)
    await conn.sendMessage(m.chat, { document: { url: data.result.urlDownload }, fileName: data.result.fileName, mimetype: data.result.fileType }, { quoted: m })
}

handler.help = ['krakendownload'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command =  /^(krakendl|krakendownload)$/i
handler.limit = true;
handler.register = false;
handler.premium = false;

module.exports = handler
