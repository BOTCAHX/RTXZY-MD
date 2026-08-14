const timeout = 1800000
                                     let handler: WaPlugin = async (m, { conn, usedPrefix, text }) => {
	                                 let apelu = global.db.data.users[m.sender].bibitapel
                                     let angguru = global.db.data.users[m.sender].bibitanggur
                                     let manggau = global.db.data.users[m.sender].bibitmangga
                                     let pisangu = global.db.data.users[m.sender].bibitpisang
                                     let jeruku = global.db.data.users[m.sender].bibitjeruk 
	                                 let time = global.db.data.users[m.sender].lastberkebon + 1800000
                                     if (apelu == 0 || angguru == 0 || manggau == 0 || pisangu == 0 || jeruku == 0) return conn.reply(m.chat, `*Pastikan kamu memiliki semua bibit*\n*Seperti Bibit Apel, Bibit Mangga, Bibit Jeruk, Bibit Pisang, Bibit Anggur*\n\nKetik :\n${usedPrefix}shop buy bibitmangga 500\n\n*List*\nbibitmangga\nbibitanggur\nbibitpisang\nbibitjeruk\nbibitapel`, m)
                                     if (Date.now() - global.db.data.users[m.sender].lastberkebon< 1800000) return conn.reply(m.chat, `Anda sudah menanam\nMohon tunggu hasil panenmu\nTunggu selama ${msToTime(time - Date.now())} lagi`, m)
                                     if (global.db.data.users[m.sender].bibitmangga > 499) {
                                 	if (global.db.data.users[m.sender].bibitapel > 499) {
                                 	if (global.db.data.users[m.sender].bibitpisang > 499) {
                                 	if (global.db.data.users[m.sender].bibitjeruk > 499) {
                                 	if (global.db.data.users[m.sender].bibitanggur > 499) {
                                     let pisangpoin = `${Math.floor(Math.random() * 500)}`.trim()
                                     let anggurpoin = `${Math.floor(Math.random() * 500)}`.trim()
                                     let manggapoin = `${Math.floor(Math.random() * 500)}`.trim()
                                     let jerukpoin = `${Math.floor(Math.random() * 500)}`.trim()
                                     let apelpoin = `${Math.floor(Math.random() * 500)}`.trim()
                                     global.db.data.users[m.sender].pisang += +pisangpoin
                                     global.db.data.users[m.sender].anggur += +anggurpoin
                                     global.db.data.users[m.sender].mangga += +manggapoin
                                     global.db.data.users[m.sender].jeruk += +jerukpoin
                                     global.db.data.users[m.sender].apel += +apelpoin
                                     global.db.data.users[m.sender].tiketcoin += 1
                                     global.db.data.users[m.sender].bibitpisang -= 500
                                     global.db.data.users[m.sender].bibitanggur -= 500
                                     global.db.data.users[m.sender].bibitmangga -= 500
                                     global.db.data.users[m.sender].bibitjeruk -= 500
                                     global.db.data.users[m.sender].bibitapel -= 500
                                     global.db.data.users[m.sender].lastberkebon = Date.now()
                                     conn.reply(m.chat, `Selamat kamu mendapatkan : \n+${pisangpoin} Pisang\n+${manggapoin} Mangga\n+${anggurpoin} Anggur\n+${jerukpoin} Jeruk\n+${apelpoin} Apel\n+1 Tiketcoin`, m)
                                     setTimeout(() => {
					                      conn.reply(m.chat, `Waktunya berkebon lagi kak 😅`, m)
					                  }, timeout)
                                  } else m.reply(`Pastikan bibit anggur kamu *500* untuk bisa berkebon`)
                              } else conn.reply(m.chat, `Pastikan bibit jeruk kamu *500* untuk bisa berkebon`, m)
                          } else conn.reply(m.chat, `Pastikan bibit pisang kamu *500* untuk bisa berkebon`, m)
                      } else conn.reply(m.chat, `Pastikan bibit apel kamu *500* untuk bisa berkebon`, m)
                  } else conn.reply(m.chat, `Pastikan bibit mangga kamu *500* untuk bisa berkebon`, m)
              }
handler.help = ['berkebon']
handler.tags = ['rpg']
handler.command = /^(berkebon)/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.rpg = true
handler.limit = true
handler.exp = 0
handler.money = 0

export default handler

function msToTime(duration) {
  var milliseconds = parseInt(String((duration % 1000) / 100)),
    seconds = String(Math.floor((duration / 1000) % 60)),
    minutes = String(Math.floor((duration / (1000 * 60)) % 60)),
    hours = String(Math.floor((duration / (1000 * 60 * 60)) % 24));    
  
  hours = "" + ((+hours < 10) ? "0" + hours : hours)
  minutes = "" + ((+minutes < 10) ? "0" + minutes : minutes)
  seconds = "" + ((+seconds < 10) ? "0" + seconds : seconds)

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}