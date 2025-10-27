global.owner = ['628974152000','6285855030554', '130850859573389'] // wajib di isi tidak boleh kosong
global.mods  = ['628974152000','6285855030554', '130850859573389'] // wajib di isi tidak boleh kosong
global.prems = ['628974152000', '130850859573389'] // wajib di isi tidak boleh kosong
global.nameowner = 'farhanxcode' // wajib di isi tidak boleh kosong
global.numberowner = '6285855030554' // wajib di isi tidak boleh kosong
global.mail = 'kasirdboss02@gmail.com' // wajib di isi tidak boleh kosong
global.gc = 'https://whatsapp.com/channel/0029VaGpjVw002TG5u8KXd1k/271' // wajib di isi tidak boleh kosong
global.instagram = 'https://www.instagram.com/farhanxcode' // wajib di isi tidak boleh kosong
global.wm = '©farhanxcode' // isi nama bot atau nama kalian
global.wait = '_*Tunggu sedang di proses...*_' // ini pesan simulasi loading
global.eror = '_*Server Error*_' // ini pesan saat terjadi kesalahan
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*' // ini pesan simulasi saat loading pembuatan sticker
global.packname = 'Made With' // watermark stikcker packname
global.author = 'Irene WhatsApp Bot' // watermark stikcker author
global.maxwarn = '5' // Peringatan maksimum Warn

global.autobio = false // Set true/false untuk mengaktifkan atau mematikan autobio (default: false)
global.antiporn = true // Set true/false untuk Auto delete pesan porno (bot harus admin) (default: false)
global.spam = true // Set true/false untuk anti spam (default: false)
global.gcspam = true // Set true/false untuk menutup grup ketika spam (default: false)
    

// APIKEY INI WAJIB DI ISI! //
global.btc = 'hansalrl'
global.aksesKey = 'hansalrl'
// Daftar terlebih dahulu https://api.botcahx.eu.org


// Tidak boleh diganti atau di ubah
global.APIs = {   
  btc: 'https://api.botcahx.eu.org'
}

//Tidak boleh diganti atau di ubah
global.APIKeys = { 
  'https://api.botcahx.eu.org': global.btc
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
