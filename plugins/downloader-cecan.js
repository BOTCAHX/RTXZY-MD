let fetch = require('node-fetch')

let handler = async (m, { conn, command }) => {
    let api1 = `https://api.botcahx.eu.org/api/cecan/${command}?apikey=${btc}`
    let api2 = `https://api.betabotz.eu.org/api/cecan/${command}?apikey=${lann}`
    let buffer = await fetch(api1)
        .then(res => res.buffer())
        .catch(async (err) => {
            console.log(`API 1 failed with error: ${err}. Trying API 2...`)
            buffer = await fetch(api2).then(res => res.buffer())
            return buffer
        })
    conn.sendFile(m.chat, buffer, 'hasil.jpg', `Random ${command}`, m)
}

handler.command = ['china','vietnam','thailand','indonesia','korea','japan','malaysia','justinaxie','jeni','jiso','ryujin','rose','hijaber']
handler.tags = ['downloader'];
handler.limit = true;
module.exports = handler;
