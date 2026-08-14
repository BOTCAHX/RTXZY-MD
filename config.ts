const __filename = import.meta.filename;
// Timezone
process.env.TZ = 'Asia/Jakarta';

// Pengaturan Bot disini Semua
global.owner = ["62895331520602"]; // wajib di isi tidak boleh kosong
global.mods = ["62895331520602"]; // wajib di isi tidak boleh kosong
global.prems = ["62895331520602"]; // wajib di isi tidak boleh kosong
global.nameowner = "Tio"; // wajib di isi tidak boleh kosong
global.numberowner = "62895331520602"; // wajib di isi tidak boleh kosong
global.mail = "support@tioprm.eu.org"; // wajib di isi tidak boleh kosong
Object.assign(globalThis, { gc: "https://chat.whatsapp.com/I5RpePh2b5u37OyFjZCNTr" }); // wajib di isi tidak boleh kosong
global.instagram = "https://instagram.com/prm2.0"; // wajib di isi tidak boleh kosong
global.wm = "© BOTCAHX"; // isi nama bot atau nama kalian
global.wait = "_*Tunggu sedang di proses...*_"; // ini pesan simulasi loading
global.eror = "_*Server Error*_"; // ini pesan saat terjadi kesalahan
global.stiker_wait = "*⫹⫺ Stiker sedang dibuat...*"; // ini pesan simulasi saat loading pembuatan sticker
global.thumb = "https://telegra.ph/file/3a34bfa58714bdef500d9.jpg"; // thumbnail bot
global.packname = "Made With"; // sticker pack watermark
global.author = "Bot WhatsApp"; // sticker author watermark
global.maxwarn = "5"; // maximum warnings




// APIKEY INI WAJIB UNTUK DI ISI! //
global.btc = "YOUR_APIKEY_HERE";



// AKSESKEY INI DI ISI JIKA DIPERLUKAN JADI TIDAK WAJIB DI ISI! (e.g suno ai (ai music ) & fitur prem lainnya//
global.aksesKey = "YOUR_AKSESKEY_HERE";

// Tidak boleh diganti atau di ubah
global.APIs = {
  btc: "https://api.botcahx.eu.org",
};

// Tidak boleh diganti atau di ubah
global.APIKeys = {
  "https://api.botcahx.eu.org": global.btc,
};

import fs from 'fs';
import chalk from 'chalk';
import { pathToFileURL } from 'url';
let file = import.meta.filename;
fs.unwatchFile(file);
fs.watchFile(file, async () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.ts'"));
  await import(pathToFileURL(file).href + '?update=' + Date.now());
});
