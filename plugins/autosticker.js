const { sticker } = require('../lib/sticker')

let handler = m => m

handler.all = async function (m) {
    let chat = db.data.chats[m.chat]
    let user = db.data.users[m.sender]

    if (chat.stiker && !chat.isBanned && !user.banned && !m.isBaileys) {
        let q = m
        let stiker = false
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) return
        if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) return
            stiker = await sticker(img, false, packname, author)
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return await this.reply(m.chat, 'durasi maks 10 detik!', m)
            let img = await q.download()
            if (!img) return
            stiker = await sticker(img, false, packname, author)
        } else if (m.text.split(/\n| /i)[0]) {
            if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], packname, author)
            else return
        }
        if (stiker) {
            await this.sendFile(m.chat, stiker, '', '', m)
        }
    }
    return !0
}
module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}
