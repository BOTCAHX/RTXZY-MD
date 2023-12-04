global.owner = ['6266435345']
global.mods = ['6266435345']
global.prems = ['6266435345']
global.nameowner = 'Lovely Bot'
global.numberowner = '62813521312'
global.mail = 'rest-api@farrax.my.id'
global.gc = 'https://chat.whatsapp.com/2asdghfsfas'
global.instagram = 'https://instagram.com/flmtyhr_'
global.wm = '© Lovely'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Lovely Bot'
global.maxwarn = '2' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.btc = 'hadehente'
//Daftar terlebih dahulu https://api.botcahx.live

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = 'hadehente'
//Daftar https://api.betabotz.org

global.APIs = {
  btc: 'https://api.botcahx.live'
}
global.APIKeys = {
  'https://api.botcahx.live': 'APIKEY'
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
