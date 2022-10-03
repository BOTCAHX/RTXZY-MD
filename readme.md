[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
# Bot Whatsapp Multi Auth 
 
 <p align="center">
<img width="" src="https://img.shields.io/github/repo-size/BOTCAHX/RTXZY-MD?color=red&label=Repo%20Size&style=for-the-badge&logo=appveyor">
</p>

> **Warning**: 
> Telah update ke multi auth !

- Sc ini gabisa ambil sesi sendiri jadi Harus ambil di replit 
- [`Visite Module`](https://replit.com/@tioclkp02/Sessions-Multi-Auth?lite=1&outputonly=1)
- [`Fork & Get sessions`](https://replit.com/@tioclkp02/Sessions-Multi-Auth)
- Setelah scan download sessions yg sudah terkoneksi tersebut lalu upload ke github
- Upload tepat di file sessions.
- Perlu di ingat sesi multi auth bukan session.data.json dan bukan dalam satu file json! 

## Panel Pterodaktyl
> Deploy bot mudah dan cepat di panel 

- Free 
- Runtime 24/7
- No delay !
- Server selalu up-to-date 

**Register Here** 

[`Panel Server 1`](https://bit.ly/3xOyGf2)

[`Panel Server 2`](https://bit.ly/3BO4gvS)

> **Warning**: 
> Masing masing server panel mempunyai kecepatan berbeda!


## Join Group Diskusi
[![BOT DISCUSSION GROUP](https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=red)](https://chat.whatsapp.com/JEDQfzMGZan4HA98wtxsNL) 

## Install for termux

```bash
> termux-setup-storage
> pkg update && pkg upgrade
> pkg install git
> pkg install nodejs
> pkg install bash
> pkg install ffmpeg
> pkg install libwebp
> git clone  https://github.com/BOTCAHX/RTXZY-MD
> cd RTXZY-MD
> npm i
> node index.js

## untuk Sdcard (File yang Sudah Di Download)
> cd /sdcard
> cp -r RTXZY-MD $HOME
> cd RTXZY-MD
> npm i
> node index.js
```

## Run On Heroku

Simple WhatsApp Bot

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BOTCAHX/RTXZY-MD)

```bash
Login with your github
Click Launch Dev Environment
Choose your repo
```
## UNTUK PENGGUNA WINDOWS/VPS/RDP

* Unduh & Instal Git [`Klik Disini`](https://git-scm.com/downloads)
* Unduh & Instal NodeJS [`Klik Disini`](https://nodejs.org/en/download)
* Unduh & Instal FFmpeg [`Klik Disini`](https://ffmpeg.org/download.html) (**Jangan Lupa Tambahkan FFmpeg ke variabel lingkungan PATH**)
* Unduh & Instal ImageMagick [`Klik Disini`](https://imagemagick.org/script/download.php)

```bash
git clone https://github.com/BOTCAHX/RTXZY-MD
cd RTXZY-MD
npm i
npm start
```
# Heroku Buildpack
### Instal Buildpack
* heroku/nodejs
* https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
* https://github.com/clhuang/heroku-buildpack-webp-binaries.git


# Hargai Kami Dengan Menambahkan Credit

---------


## Arguments `node . [--options] [<session name>]` 

### `--session <nama file>`

menggunakan session dari nama file yang berbeda, default `session.data.json`

contoh nama file `sessiontxzy.data.json` maka penggunaannya `node . --session 'sessiontxzy'`

### `--prefix <prefix>`

* `prefixes` dipisahkan oleh masing-masing karakter
Setel awalan

### `--server`

Digunakan untuk [heroku](https://heroku.com/) atau pindai melalui situs web

### `--db <json-server-url>`

menggunakan db eksternal alih-alih db lokal, **disarankan** menggunakan mongodb

contoh server dengan mongodb db: node . --db "mongodb+srv://botwa:Jxrt6KiUNOOccDuo@cluster0.dytrn2e.mongodb.net/?retryWrites=true&w=majority" --autocleartmp --restrict

contoh server dengan repl `https://json-server.tioclkp02.repl.co/`

kode: `https://repl.it/@tioclkp02/json-server`

`node . --db 'https://json-server.tioclkp02.repl.co/'`

server harus memiliki spesifikasi seperti ini

#### GET

```http
GET /
Accept: application/json
```

#### POST

```http
POST /
Content-Type: application/json

{
 data: {}
}
```

### `--big-qr`

Jika qr unicode kecil tidak mendukung

### `--img`

Aktifkan pemeriksa gambar melalui terminal

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```
#### Thanks To 
**Allah SWT**,

**Orang Tua**,

**All Team Bot Discussion**,

**Yang Support Buat Recode Base Ini**,

**Semua Yang Bersangkutan Dalam Berdirinya Script Ini**,

**Untuk Hyzer, Base Original Script Ini**,

**Untuk Semua Yang Selalu Mendukung Kami.**

**All Contributors**,

[`Visit`](https://github.com/BOTCAHX/RTXZY-MD/graphs/contributors)

### Contact Person

 [`AlyaXzy`](https://wa.me/6289505165400)

 [`BOTCAHX`](https://wa.me/6282221792667)
 
 [`Verdi`](https://wa.me/6285706735450)
 
 [`Radhin`](https://wa.me/6282373158947)

##### All Contributors
<a href="https://github.com/BOTCAHX"><img src="https://github.com/BOTCAHX.png?size=100" width="100" height="100"></a> | [![Alya Putri](https://github.com/AlyaaXd.png?size=100)](https://github.com/AlyaaXd) 
---|---
[Tio](https://github.com/BOTCAHX)  | [Alya putri](https://github.com/AlyaaXd)
Creator | Creator |
<a href="https://github.com/verdihatorou"><img src="https://github.com/verdihatorou.png?size=100" width="100" height="100"></a> | [![Radhin](https://github.com/radhin123.png?size=100)](https://github.com/radhin123) 
[Verdi](https://github.com/verdihatorou)  | [ Radhin](https://github.com/radhin123)
Creator | Contributors |
<a href="https://github.com/natxdixie"><img src="https://github.com/natxdixie.png?size=100" width="100" height="100"></a> | [![Ziv San](https://github.com/Zivfurr.png?size=100)](https://github.com/Zivfurr) 
---|---
[Natx-C](https://github.com/natxdixie)  | [Zivfurr](https://github.com/Zivfurr)
Contributor | Contributor |
##### Special Thanks To
<!--[![Nurutomo](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo)
[![BochilGaming](https://github.com/BochilGaming.png?size=100)](https://github.com/BochilGaming)
[![adiwajshing/Baileys](https://github.com/adiwajshing.png?size=100)](https://github.com/adiwajshing)-->
<a href="https://github.com/BochilGaming"><img src="https://github.com/BochilGaming.png?size=100" width="100" height="100"></a> | [![NURUTOMO](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo) 
---|---
[bocil](https://github.com/BochilGaming)  | [Nurutomo](https://github.com/Nurutomo)
sepuh | sepuh |
<a href="https://github.com/MhankBarBar"><img src="https://github.com/MhankBarBar.png?size=100" width="100" height="100"></a> | [![FATIH](https://github.com/fatiharridho.png?size=100)](https://github.com/fatiharridho) 
[Mhankbarbar](https://github.com/MhankBarBar)  | [Fatih A.](https://github.com/fatiharridho)
sepuh | sepuh |
<a href="https://github.com/FERDIZ-afk"><img src="https://github.com/FERDIZ-afk.png?size=100" width="100" height="100"></a> | [![RASHID](http://github.com/rashidsiregar28.png?size=100)](http://github.com/rashidsiregar28) 
[Ferdiz](https://github.com/FERDIZ-afk)  | [Rashid](https://github.com/rashidsiregar28)
For Help | Sepuh |
<a href="https://github.com/adiwajshing"><img src="https://github.com/adiwajshing.png?size=100" width="100" height="100"></a> | [![caf](http://github.com/CAF-ID.png?size=100)](http://github.comCAF-ID) 
[Adiwajshing](https://github.com/adiwajshing) | [caf](https://github.com/CAF-ID)
Owner of Baileys | Sepuh |

