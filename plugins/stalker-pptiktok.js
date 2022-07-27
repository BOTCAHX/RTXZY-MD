let handler = async(m, { conn, text }) => {
if (!text) return conn.reply(m.chat, 'Masukkan Username Tiktok', m)
let tetete = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${lolkey}`
conn.sendButtonImg(m.chat, tetete, `Hasil Dari ${text}`, wm2, 'Thanks', 'thanks', m) 
}
handler.help = ['pptiktok'].map(v => v + ' <username>')
handler.tags = ['downloader', 'stalk', 'internet']
handler.command = /^(pptiktok)$/i

module.exports = handler