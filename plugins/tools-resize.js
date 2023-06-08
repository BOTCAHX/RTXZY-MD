const jimp = require("jimp")
const uploadImage = require("../lib/uploadImage.js")
const uploadFile = require("../lib/uploadFile.js")

let handler = async (m, { conn, usedPrefix, args }) => {
    let toWidth = args[0]
    let toHeight = args[1]
    if (!toWidth) throw 'Please provide the width.'
    if (!toHeight) throw 'Please provide the height.'
    let quotedMsg = m.quoted ? m.quoted : m
    let mime = (quotedMsg.msg || quotedMsg).mimetype || ''
    if (!mime) throw "Media not found."

    let media = await quotedMsg.download()
    let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    if (!isMedia) throw `The "${mime}" type is not supported.`
    let link = await (isMedia ? uploadImage : uploadImage)(media)
    let source = await jimp.read(await link)
    let size = {
        before: {
            height: await source.getHeight(),
            width: await source.getWidth()
        },
        after: { 
            height: toHeight,
            width: toWidth,
        }
    }
    let compres = await conn.resize(link, toWidth - 0, toHeight - 0)
    let linkCompres = await (isMedia ? uploadImage : uploadImage)(compres)
    conn.sendFile(m.chat, compres, null, `
• BEFORE
*+* Width : ${size.before.width}
*+* Height : ${size.before.height}

• AFTER
*+* Width : ${size.after.width}
*+* Height : ${size.after.height}

• LINK
*+* Original: ${link}
*+* Compressed: ${linkCompres}`, m)
}

handler.help = ['resize <width> <height> (reply|caption)']
handler.tags = ['tools']
handler.command = /^(resize)$/i

module.exports = handler
