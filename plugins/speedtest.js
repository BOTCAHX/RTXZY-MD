// Jadikan hanya owner bila fitur ini menggangu kinerja bot

let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m) => {
    let o
    try {
        o = await exec('python speed.py')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
    }
}
handler.help = ['speedtest']
handler.tags = ['info']
handler.command = /^(speedtest)$/i

handler.owner = false // ubah jadi true bila ingin mengganti

module.exports = handler
