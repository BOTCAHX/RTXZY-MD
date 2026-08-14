let handler = m => m
handler.before = async function (m) {

    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
            await this.reply(m.chat, `waktunya *${this.user.name}* untuk meninggalkan grup\nJangan lupa sewa lagi ya!`, null)
            await this.groupLeave(m.chat)
            global.db.data.chats[m.chat].expired = 0
        }
    }
}

export default handler
