let handler = async (m, { conn, text, command }) => {
    if (!text) throw 'Masukkan Teks.....................'
    let hyz = `https://api.lolhuman.xyz/api/${command}?apikey=Papah-Chan&name=${text}`
    conn.sendButtonImg(m.chat, hyz, succes, wm3, 'Thanks', 'thanks', m) 
}
handler.help = ['toloserti', 'fuckboy', 'fuckgirl', 'bucinserti', 'goodboy', 'goodgirl', 'badboy', 'badgirl'].map(v => v + ' <teks>')
handler.tags = ['serti']
handler.command = /^(toloserti|fuckboy|fuckgirl|bucinserti|goodboy|goodgirl|badboy|badgirl)$/i

module.exports = handler
