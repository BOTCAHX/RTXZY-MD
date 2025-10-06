### Harap Dibaca Sebelum Install!

##### Cara Memperbaiki Error @lid

###### Langkah-langkah Perbaikan

1. **Pastikan file `handler.js` sudah terbaru!**  
   Samakan file `handler.js` dengan versi terbaru dari file berikut:  
   [`handler.js`](https://github.com/BOTCAHX/RTXZY-MD/blob/pro/handler.js)

2. **Pastikan file `plugins/tools-getlid.js` sudah terbaru!**  
   Samakan file `plugins/tools-getlid.js` dengan versi terbaru dari file berikut:  
   [`tools-getlid.js`](https://github.com/BOTCAHX/RTXZY-MD/blob/pro/plugins/tools-getlid.js)

3. **Pastikan file `lib/simple.js` sudah terbaru!**  
   Samakan file `lib/simple.js` dengan versi terbaru dari file berikut:  
   [`simple.js`](https://github.com/BOTCAHX/RTXZY-MD/blob/pro/lib/simple.js)

4. **Pastikan file `lib/baileys.js` sudah terbaru!**  
   Samakan file `lib/baileys.js` dengan versi terbaru dari file berikut:  
   [`baileys.js`](https://github.com/BOTCAHX/RTXZY-MD/blob/pro/lib/baileys.js)

#### Catatan
_Jika kamu sudah mendownload script versi terbaru, **tidak perlu mengubah file-file di atas secara manual.**  
Cukup clone atau download ulang dan langsung ikuti langkah-langkah berikutnya._

5. **Cara Mendapatkan LID (Penting untuk Dibaca!)**  
   - Buat grup WhatsApp baru **atau** kirim perintah di chat pribadi dengan bot.  
   - Ketik perintah `.getlid`, lalu kirim ke grup atau chat tersebut.  
   - Bot akan membalas dengan `LID target`, contohnya seperti berikut:

     ```
     275664439611636@lid
     ```

   - Salin **hanya bagian ID-nya saja**, tanpa `@lid`,seperti ini:

     ```
     275664439611636
     ```


6. **Tambahkan LID ke Konfigurasi Bot**  
   Tempelkan LID ke dalam konfigurasi sebagai berikut:
```

global.owner = ['62895331520602', '275664439611636']
global.mods  = ['62895331520602', '275664439611636']
global.prems = ['62895331520602', '275664439611636']

```

7. **Lihat Video Tutorial Lengkap**  
Jika masih bingung, kamu bisa menonton panduan lengkap melalui tautan berikut:

https://youtube.com/playlist?list=PLuQT2lE0wOYQNhk2E8JAerojcZj8ckMYs&si=kehl9mWEVmctVms0

---

### Penjelasan Masalah @lid

Beberapa gejala error yang disebabkan oleh masalah `@lid` ini antara lain:
- Bot **tidak merespons** pesan di dalam grup.
- Bot **tidak mendeteksi nomor owner**, meskipun sudah tercantum di `global.owner`.
- Bot **tidak mengenali nomor admin** dan tidak menjalankan fitur grup lainnya yang membutuhkan izin admin atau owner.

---

Jika kamu mengalami salah satu dari masalah di atas, silakan ikuti langkah-langkah perbaikan yang telah dijelaskan.

**Informasi Pembaruan:**  
----  
- ✅ **Update Menu** jadi lebih simple  
- ✅ **Tambah Game** RPG dan lainnya  
- ✅ **Menggunakan Baileys Latest**  [Baileys](https://github.com/WhiskeySockets/Baileys)
- ✅ **Delete QR Code** Jadi Alternatif Nya Memakai Pairing Code
- ✅ **Wajib Menggunakan Node.js 21+**
- **Fix issues @lid** [Read](https://github.com/BOTCAHX/RTXZY-MD#langkah-langkah-Perbaikan)


### Contact Admin
Hubungi admin melalui WhatsApp untuk informasi lebih lanjut atau bantuan cepat.

<p align="center">
  <a href="https://wa.me/6282221792667">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
</p>

### **Perintah Start & Pairing:**  
```bash
node index.js
```  

- **Fitur Bot 97%** implementasi dari Rest API, jadi **wajib daftar terlebih dahulu** agar bot bekerja dengan baik.  

📢 **Informasi API & Update Script:** [WhatsApp Channel](https://whatsapp.com/channel/0029VbAI9JCBKfi5qXq9yJ01)  

----  

## Catatan Penting!  
**Important:**  

- Untuk menggunakan bot ini, kamu diwajibkan mengisi **`Apikey`** terlebih dahulu. Jika tidak, bot tidak akan berfungsi dengan baik.  
- Script ini **tidak bisa dijalankan** di **Termux** atau **Panel** yang tidak memiliki kelengkapan seperti:  
  - ffmpeg  
  - imagemagick  
  - webp  

> Atau panel yang tidak bisa menginstal module **express.js**.  

- Menggunakan **97% fitur** dari [`RestApi`](https://api.botcahx.eu.org)  

----  

## Apikey:  
- ✅ **Free ApiKey** 15 Request per/day (perhari)  
- ➕ **Direkomendasikan untuk upgrade ke premium plan**  
- Jika ingin membeli **`Apikey Premium`**, silakan daftar lalu pilih paket yang dibutuhkan: [`Pilih Paket`](https://api.botcahx.eu.org/price)  

### **Website API:**  
- BOTCAHX [`Register`](https://api.botcahx.eu.org)  
- Setelah mendapatkan apikey, paste di **config.js** pada bagian **`global.btc`**.  

> **Catatan:** Pastikan fitur yang digunakan juga disesuaikan.  

---  

## **Support Me On Sociabuzz**  

<a href="https://qris.zone.id/qviqy41iq" target="_blank"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" height="32px" alt="Donate"></a>  

---  

### **Deploy ke Render**  

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/blueprint/new?repo=https%3A%2F%2Fgithub.com%2FBOTCAHX%2FRTXZY-MD)  

---  

## **Base Original**  
Base original [`Link`](https://github.com/HelgaIlham/ZukaBet)  

---  

## **Run On Heroku**  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BOTCAHX/RTXZY-MD)  

### **Heroku Buildpack**  

**Instal Buildpack:**  
```bash
heroku/nodejs
https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
https://github.com/clhuang/heroku-buildpack-webp-binaries.git
```  

---  

## **Untuk Pengguna Windows/VPS/RDP**  

✅ **Unduh & Instal:**  
- [Git](https://git-scm.com/downloads) [`Klik Disini`](https://git-scm.com/downloads)  
- [NodeJS](https://nodejs.org/en/download) [`Klik Disini`](https://nodejs.org/en/download)  
- [FFmpeg](https://ffmpeg.org/download.html) [`Klik Disini`](https://ffmpeg.org/download.html) (**Jangan lupa tambahkan ke PATH**)  
- [ImageMagick](https://imagemagick.org/script/download.php) [`Klik Disini`](https://imagemagick.org/script/download.php)  

### FOR VPS USER
```bash
apt update && apt upgrade -y
apt install nodejs imagemagick ffmpeg -y
node -v
if the version is still under 17, use this step
curl -s https://deb.nodesource.com/setup_21.x | sudo bash
apt-get install -y nodejs
```

```bash
git clone https://github.com/BOTCAHX/RTXZY-MD
cd RTXZY-MD
npm i
node index.js
```  


## ```Arguments node . [--options] [<session name>]```

## `--pconly`
* If that chat not from private bot, bot will ignore

## `--gconly`
* If that chat not from group, bot will ignore

## `--swonly`
* If that chat not from status, bot will ignore

## `--prefix <prefixes>`
* `prefixes` are seperated by each character
Set prefix

### `--db <your mongodb url>`

Open the package.json file and fill in your mongodb url in the `mongodb: --db mongodb url` section!

## `--server`
* Used for [heroku](https://heroku.com/) or scan through website

## `--restrict`
* Enables restricted plugins (which can lead your number to be **banned** if used too often)
* Group Administration `add, kick`

## `--img`
* Enable image inspector through terminal

## `--autoread`
* If enabled, all incoming messages will be marked as read

## `--nyimak`
* No bot, just print received messages and add users to database

## `--test`
* **Development** Testing Mode 

## `--self`
* **Only Owner & Bot** 

---------


## **All Contributors**  
<a href="https://github.com/BOTCAHX"><img src="https://github.com/BOTCAHX.png?size=100" width="100" height="100"></a> | [![Erlan](https://github.com/ERLANRAHMAT.png?size=100)](https://github.com/ERLANRAHMAT)  
---|---  
[Tio](https://github.com/BOTCAHX)  | [Erlan](https://github.com/ERLANRAHMAT)  
Recode | Contributor  

---  

## **Special Thanks To**  
<a href="https://github.com/BochilGaming"><img src="https://github.com/BochilGaming.png?size=100" width="100" height="100"></a> | [![NURUTOMO](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo)  
---|---  
[Bochilgaming](https://github.com/BochilGaming)  | [Nurutomo](https://github.com/Nurutomo)  
Sepuh | Sepuh  

---  

## **Stargazers Over Time**  
[![Stargazers over time](https://starchart.cc/BOTCAHX/RTXZY-MD.svg?background=%23FFFFFF&axis=%23333333&line=%23e76060)](https://starchart.cc/BOTCAHX/RTXZY-MD)  
