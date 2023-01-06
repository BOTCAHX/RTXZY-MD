var {
performance
} = require('perf_hooks')
var osu = require('node-os-utils')
var handler = async(m, { 
 conn,
 command,
 usedPrefix,
 DevMode
 }) => {
    try {
        var NotDetect = 'Not Detect'
        var old = performance.now()
        var cpu = osu.cpu
        var cpuCore = cpu.count()
        var drive = osu.drive
        var mem = osu.mem
        var netstat = osu.netstat
        var OS = osu.os.platform()
        var cpuModel = cpu.model()
        var cpuPer
        var p1 = cpu.usage().then(cpuPercentage => {
            cpuPer = cpuPercentage
        }).catch(() => {
            cpuPer = NotDetect
        })
        var driveTotal, driveUsed, drivePer
        var p2 = drive.info().then(info => {
            driveTotal = (info.totalGb + ' GB'),
                driveUsed = info.usedGb,
                drivePer = (info.usedPercentage + '%')
        }).catch(() => {
            driveTotal = NotDetect,
                driveUsed = NotDetect,
                drivePer = NotDetect
        })
        var ramTotal, ramUsed
        var p3 = mem.info().then(info => {
            ramTotal = info.totalMemMb,
                ramUsed = info.usedMemMb
        }).catch(() => {
            ramTotal = NotDetect,
                ramUsed = NotDetect
        })
        var netsIn, netsOut
        var p4 = netstat.inOut().then(info => {
            netsIn = (info.total.inputMb + ' MB'),
                netsOut = (info.total.outputMb + ' MB')
        }).catch(() => {
            netsIn = NotDetect,
                netsOut = NotDetect
        })
        await Promise.all([p1, p2, p3, p4])
        await conn.reply(m.chat, `_Testing ${command }..._`, m)
        var _ramTotal = (ramTotal + ' MB')
        var neww = performance.now()
        conn.sendButtonImg(m.chat,  await(await require('node-fetch')(fla + `Status`)).buffer(), `
*「 Status 」*
OS : *${OS}*
CPU Model : *${cpuModel}*
CPU Core : *${cpuCore} Core*
CPU : *${cpuPer}%*
Ram : *${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})*
Drive : *${driveUsed} / ${driveTotal} (${drivePer})*
Ping : *${Math.round(neww - old)} ms*
Internet IN : *${netsIn}*
Internet OUT : *${netsOut}*
`.trim(), wm, `Menu`, `${usedPrefix}menu`, m)
        console.log(OS)
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, eror, m)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'Status.js error\nNo: *' + m.sender.split `@` [0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
            }
        }
    }
}
handler.help = ['', 'bot'].map(v => 'status' + v)
handler.tags = ['info'];
handler.command = /^(bot)?stat(us)?(bot)?$/i
module.exports = handler;
function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ ms, h, m, s })
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
