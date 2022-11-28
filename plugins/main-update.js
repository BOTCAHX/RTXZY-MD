let cp = require ('child_process')
let { promisify } = require ('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn}) => {
	await conn.reply(m.chat, `Looking for resources...`, m)
    let o
    try {
        o = await exec('git pull')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) conn.sendButton(m.chat, `root@tio`, stdout, null, [["Back", ".menu"],["Command", ".pay"]], m)
        if (stderr.trim()) m.reply(stderr)
    }
}
handler.help = ['npminfo']
handler.tags = ['info']
handler.command = /^(act|updategit|update)$/i

module.exports = handler
