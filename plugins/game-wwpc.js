const {
    emoji_role,
    sesi,
    playerOnGame,
    playerOnRoom,
    playerExit,
    dataPlayer,
    dataPlayerById,
    getPlayerById,
    getPlayerById2,
    killWerewolf,
    killww,
    dreamySeer,
    sorcerer,
    protectGuardian,
    roleShuffle,
    roleChanger,
    roleAmount,
    roleGenerator,
    addTimer,
    startGame,
    playerHidup,
    playerMati,
    vote,
    voteResult,
    clearAllVote,
    getWinner,
    win,
    pagi,
    malam,
    skill,
    voteStart,
    voteDone,
    voting,
    run,
    run_vote,
    run_malam,
    run_pagi
} = require('../lib/werewolf.js')

let handler = async (m, { conn, command, usedPrefix, args }) => {
    let { sender, chat } = m
    conn.werewolf = conn.werewolf ? conn.werewolf : {}
    let ww = conn.werewolf
    let value = (args[0] || '').toLowerCase()
    let target = args[1]

    if (playerOnGame(sender, ww) === false)
        return m.reply("Kamu tidak dalam sesi game")
    if (dataPlayer(sender, ww).status === true)
        return m.reply("Skill telah digunakan, skill hanya bisa digunakan sekali setiap malam")
    if (dataPlayer(sender, ww).isdead === true)
        return m.reply("Kamu sudah mati")
    if (!target || target.length < 1 || target.split('').length > 2) 
        return m.reply(`Masukan nomor player \nContoh : \n${usedPrefix + command} kill 1`)
    if (isNaN(target)) 
        return m.reply("Gunakan hanya nomor")
    let byId = getPlayerById2(sender, parseInt(target), ww)
    if (byId.db.isdead === true) 
        return m.reply("Player sudah mati")
    if (byId.db.id === sender)
        return m.reply("Tidak bisa menggunakan skill untuk diri sendiri")
    if (byId === false) 
        return m.reply("Player tidak terdaftar")
    if (value === "kill") {
        if (dataPlayer(sender, ww).role !== "werewolf")
            return m.reply("Peran ini bukan untuk kamu")

        if (byId.db.role === "sorcerer") 
            return m.reply("Tidak bisa menggunakan skill untuk teman")

            return m.reply("Berhasil membunuh player " + parseInt(target)).then(() => {
                dataPlayer(sender, ww).status = true
                killWerewolf(sender, parseInt(target), ww)
            })
    } else if (value === "dreamy") {
        if (dataPlayer(sender, ww).role !== "seer") 
            return m.reply("Peran ini bukan untuk kamu")

        let dreamy = dreamySeer(sender, parseInt(target), ww)
        return m.reply(`Berhasil membuka identitas player ${target} adalah ${dreamy}`).then(() => {
                dataPlayer(sender, ww).status = true
        })
    } else if (value === "deff") {
        if (dataPlayer(sender, ww).role !== "guardian") 
            return m.reply("Peran ini bukan untuk kamu")

        return m.reply(`Berhasil melindungi player ${target}`).then(() => {
            protectGuardian(sender, parseInt(target), ww)
            dataPlayer(sender, ww).status = true
        })
    } else if (value === "sorcerer") {
        if (dataPlayer(sender, ww).role !== "sorcerer") 
            return m.reply("Peran ini bukan untuk kamu")

        let sorker = sorcerer(sender, parseInt(target), ww)
        return m.reply(`Berhasil membuka identitas player ${target} adalah ${sorker}`).then(() => {
            dataPlayer(sender, ww).status = true
        })
    }
}
handler.command = /^((ww|werewolf)pc)$/i
handler.private = true
module.exports = handler
