var fetch = require("node-fetch");
var { youtubeSearch } = require ("@bochilteam/scraper");
var handler = async (m, { 
usedPrefix, 
text,
command
 }) => { 
if (!text) throw `Contoh:\n${usedPrefix + command} dj tiktok`
m.reply(wait)
var vid = (await youtubeSearch(text)).video[0]
if (!vid) throw `Video tidak ditemukan!`
var { videoId } = vid
var uyt = `https://www.youtube.com/watch?v=` + videoId

var anu = await fetch(`https://api.botcahx.xyz/api/download/ytmp3?url=${uyt}&apikey=Admin`)
var con = await anu.json()
var capt = `• Title : ${con.title}\n• Size: ${con.size}\n• ID: ${con.id}\n• URL: ${uyt}
`
fdoc = {
  key : {
  remoteJid: 'status@broadcast',
  participant : '0@s.whatsapp.net'
  },
  message: {
  documentMessage: {
  title: "© BOTCAHX", 
                            }
                          }
                        }
conn.sendButtonImg(m.chat, con.thumbnail, capt, `Media sedang dikirim...`, `Video`, `${usedPrefix}ytmp4 ${text}`, fdoc)
var parse = con.download
conn.sendFile(m.chat, parse, 'playbot.mp3', '', fdoc)
    };  
handler.command = handler.help = ['play', 'song', 'lagu', 'ddsong'];
handler.tags = ['internet'];
module.exports = handler;
