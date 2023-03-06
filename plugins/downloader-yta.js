var fetch = require("node-fetch");
var handler = async (m, { 
usedPrefix, 
text,
command
 }) => { 
if (!text) throw `Contoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=iu7P4QnQP2k`
m.reply(wait)
var anu = await fetch(`https://api.botcahx.xyz/api/download/ytmp3?url=${text}&apikey=Admin`)
var con = await anu.json()
var capt = `• Title : ${con.title}\n• Size: ${con.size}\n• ID: ${con.id}\n• URL: ${text}
`
fdoc = {
  key : {
  remoteJid: 'status@broadcast',
  participant : '0@s.whatsapp.net'
  },
  message: {
  documentMessage: {
  title: "Created By BOTCAHX", 
                            }
                          }
                        }
conn.sendButtonImg(m.chat, con.thumbnail, capt, `Media sedang dikirim...`, `Video`, `${usedPrefix}ytmp4 ${text}`, fdoc)
var parse = con.download
conn.sendFile(m.chat, parse, 'result.mp3', '', fdoc)
    };  
handler.command = handler.help = ['yta', 'ytaudio', 'ytmp3'];
handler.limit = true;
handler.tags = ['downloader'];
module.exports = handler;
