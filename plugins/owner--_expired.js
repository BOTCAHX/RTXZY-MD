module.exports = {
    async all(m) {
        if (!m.isGroup) return 
        let chats = global.db.data.chats[m.chat]
        if (!chats.expired) return !0
        if (+new Date() > chats.expired) {
        	const data = global.owner.filter(([id, isCreator]) => id && isCreator)
            await m.reply(`It\'s time *${this.user.name}* to leave the group 👋`)
            await this.delay(10000) 
            await this.groupLeave(m.chat)
        }
    }
}