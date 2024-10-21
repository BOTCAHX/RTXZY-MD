const timeout = 1800000
                                     let handler = async (m, { conn, usedPrefix, text }) => {
	                                 let apelu = global.db.data.users[m.sender].bibitapel
                                     let angguru = global.db.data.users[m.sender].bibitanggur
                                     let manggau = global.db.data.users[m.sender].bibitmangga
                                     let pisangu = global.db.data.users[m.sender].bibitpisang
                                     let jeruku = global.db.data.users[m.sender].bibitjeruk 
	                                 let time = global.db.data.users[m.sender].lastberkebon + 1800000
                                     if (apelu == 0 || angguru == 0 || manggau == 0 || pisangu == 0 || jeruku == 0) return conn.reply(m.chat, `*Pastikan kamu memiliki semua bibit*\n*Seperti Bibit Apel, Bibit Mangga, Bibit Jeruk, Bibit Pisang, Bibit Anggur*\n\nKetik :\n${usedPrefix}shop buy bibitmangga 100\n\n*List*\nbibitmangga\nbibitanggur\nbibitpisang\nbibitjeruk\nbibitapel`, m)
                                     if (new Date - global.db.data.users[m.sender].lastberkebon< 1800000) return conn.reply(m.chat, `Anda sudah menanam\nMohon tunggu hasil panenmu\nTunggu selama ${msToTime(time - new Date())} lagi`, m)
                                     if (global.db.data.users[m.sender].bibitmangga > 99) {
                                 	if (global.db.data.users[m.sender].bibitapel > 99) {
                                 	if (global.db.data.users[m.sender].bibitpisang > 99) {
                                 	if (global.db.data.users[m.sender].bibitjeruk > 99) {
                                 	if (global.db.data.users[m.sender].bibitanggur > 99) {
                                     let pisangpoin = `${Math.floor(Math.random() * 100)}`.trim()
                                     let anggurpoin = `${Math.floor(Math.random() * 100)}`.trim()
                                     let manggapoin = `${Math.floor(Math.random() * 100)}`.trim()
                                     let jerukpoin = `${Math.floor(Math.random() * 100)}`.trim()
                                     let apelpoin = `${Math.floor(Math.random() * 100)}`.trim()
                                     global.db.data.users[m.sender].pisang += pisangpoin * 1
                                     global.db.data.users[m.sender].anggur += anggurpoin * 1
                                     global.db.data.users[m.sender].mangga += manggapoin * 1
                                     global.db.data.users[m.sender].jeruk += jerukpoin * 1
                                     global.db.data.users[m.sender].apel += apelpoin * 1
                                     global.db.data.users[m.sender].tiketcoin += 1
                                     global.db.data.users[m.sender].bibitpisang -= 100
                                     global.db.data.users[m.sender].bibitanggur -= 100
                                     global.db.data.users[m.sender].bibitmangga -= 100
                                     global.db.data.users[m.sender].bibitjeruk -= 100
                                     global.db.data.users[m.sender].bibitapel -= 100
                                     global.db.data.users[m.sender].lastberkebon = new Date * 1
                                     conn.reply(m.chat, `Selamat kamu mendapatkan : \n+${pisangpoin} Pisang\n+${manggapoin} Mangga\n+${anggurpoin} Anggur\n+${jerukpoin} Jeruk\n+${apelpoin} Apel\n+1 Tiketcoin`, m)
                                     setTimeout(() => {
					                      conn.reply(m.chat, `Waktunya berkebon lagi kak 😅`, m)
					                  }, timeout)
                                  } else m.reply(`Pastikan bibit anggur kamu *100* untuk bisa berkebon`)
                              } else conn.reply(m.chat, `Pastikan bibit jeruk kamu *100* untuk bisa berkebon`, m)
                          } else conn.reply(m.chat, `Pastikan bibit pisang kamu *100* untuk bisa berkebon`, m)
                      } else conn.reply(m.chat, `Pastikan bibit apel kamu *100* untuk bisa berkebon`, m)
                  } else conn.reply(m.chat, `Pastikan bibit mangga kamu *100* untuk bisa berkebon`, m)
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
handler.limit = true
handler.exp = 0
handler.money = 0

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}