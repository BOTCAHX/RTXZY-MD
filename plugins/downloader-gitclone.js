let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {

    if (!args[0]) throw 'link githubnya mana? contoh: https://github.com/BOTCAHX/RTXZY-MD'

    if (!regex.test(args[0])) throw 'link salah!'

    let [, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    	let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
		m.reply(wait)
		await conn.sendMessage(m.chat, { document: { url: url }, mimetype: 'application/zip', fileName: filename.replace('.zip.zip','.zip')}, { quoted : m })

}
handler.help = ['gitclone <url>']
handler.tags = ['github']
handler.command = /gitclone/i

handler.limit = true

module.exports = handler
