/**Penjelasan: Untuk menggunakan script ini, kamu akan perlu mengganti nomor owner dan wm terlebih dahulu. Kamu juga harus memiliki api key dari kedua website ini https://api.botcahx.live dan https://api.betabotz.org. Setelah memiliki api key, kamu bisa menggantinya dengan menyalin key tersebut dari profilmu dan paste di variabel global.btc. Contohnya, global.btc = 'xzRhejka'. Setelah itu, kamu bisa melanjutkan dengan mengubah nomor owner dan wm.
**/


global.owner = ['6281395861695']  
global.mods = ['6281395861695'] 
global.prems = ['6281395861695']
global.nameowner = 'Tio'
global.numberowner = '6281395861695' 
global.mail = 'support@tioprm.my.id' 
global.namebot = 'BOTCAHX'
global.gc = 'https://chat.whatsapp.com/Ln2vHjRrRayAbzalRMB56r'
global.instagram = 'https://instagram.com/prm2.0'
global.wm = '© Tio'
global.watermark = wm
global.wm2 = '⫹⫺ Tio'
global.wm3 = '© Tio'
global.wm4 = '© BotWa'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.benar = 'Benar ✅\n'
global.salah = 'Salah ❌\n'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made with'
global.author = 'Bot WhatsApp'

//WAJIB DI ISI!!//
global.btc = 'YOUR_APIKEY_HERE' //Daftar terlebih dahulu https://api.botcahx.live
global.lann = 'YOUR_APIKEY_HERE' //Daftar terlebih dahulu https://api.betabotz.org 

global.APIs = { 
  tio: 'https://api.botcahx.live'
}
global.APIKeys = { 
  'https://api.botcahx.live': 'YOUR_APIKEY_HERE' //isi apikey mu https://api.botcahx.live
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
