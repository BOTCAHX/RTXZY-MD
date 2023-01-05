var cp = require ('child_process');
var {
promisify 
} = require ("util");
var exec = promisify(cp.exec).bind(cp)
var handler = async (m, {
conn
}) => {
	await conn.reply(m.chat, `Looking for resources...`, m)
    var o
    try {
        o = await exec('git pull https://github.com/BOTCAHX/RTXZY-MD.git')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) conn.sendButton(m.chat, `root@tio`, stdout, null, [["Back", ".menu"],["Ping", ".ping"]], m)
        if (stderr.trim()) m.reply(stderr)
    }
}
handler.help = ['act'];
handler.tags = ['info'];
handler.command = ["act", "updategit", "update"];
handler.owner = true;
module.exports = handler;
