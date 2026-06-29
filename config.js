// Timezone
process.env.TZ = 'Asia/Jakarta';

global.owner = ["62895331520602"]; // wajib di isi tidak boleh kosong
global.mods = ["62895331520602"]; // wajib di isi tidak boleh kosong
global.prems = ["62895331520602"]; // wajib di isi tidak boleh kosong
global.nameowner = "Tio"; // wajib di isi tidak boleh kosong
global.numberowner = "62895331520602"; // wajib di isi tidak boleh kosong
global.mail = "support@tioprm.eu.org"; // wajib di isi tidak boleh kosong
global.gc = "https://chat.whatsapp.com/I5RpePh2b5u37OyFjzCNTr"; // wajib di isi tidak boleh kosong
global.instagram = "https://instagram.com/prm2.0"; // wajib di isi tidak boleh kosong
global.wm = "© BOTCAHX"; // isi nama bot atau nama kalian
global.wait = "_*Tunggu sedang di proses...*_"; // ini pesan simulasi loading
global.eror = "_*Server Error*_"; // ini pesan saat terjadi kesalahan
global.stiker_wait = "*⫹⫺ Stiker sedang dibuat...*"; // ini pesan simulasi saat loading pembuatan sticker
global.thumb = "https://telegra.ph/file/3a34bfa58714bdef500d9.jpg";
global.packname = "Made With"; // watermark stikcker packname
global.author = "Bot WhatsApp"; // watermark stikcker author
global.maxwarn = "5"; // Peringatan maksimum Warn

global.autobio = false; // Set true/false untuk mengaktifkan atau mematikan autobio (default: false)
global.antiporn = false; // Set true/false untuk Auto delete pesan porno (bot harus admin) (default: false)
global.spam = false; // Set true/false untuk anti spam (default: false)
global.gcspam = false; // Set true/false untuk menutup grup ketika spam (default: false)

// APIKEY INI WAJIB UNTUK DI ISI! //
global.btc = "YOUR_APIKEY_HERE";



// AKSESKEY INI DI ISI JIKA DIPERLUKAN JADI TIDAK WAJIB DI ISI! (e.g suno ai (ai music ) & fitur prem lainnya//
global.aksesKey = "YOUR_AKSESKEY_HERE";

// Tidak boleh diganti atau di ubah
global.APIs = {
  btc: "https://api.botcahx.eu.org",
};

//Tidak boleh diganti atau di ubah
global.APIKeys = {
  "https://api.botcahx.eu.org": global.btc,
};

let fs = require("fs");
let chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});

