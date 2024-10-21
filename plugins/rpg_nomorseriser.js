const { createHash } = require('crypto')


let handler = async function (m, { text, usedPrefix }) { 

    let sn = createHash('md5').update(m.sender).digest('hex')
    m.reply(`
Serial Number kamu: 
${sn}`.trim())
}

handler.help = ['nomorseri']
handler.tags = ['xp', 'rpg']
handler.command = ['nomorseri'] 
handler.group = true


module.exports = handler