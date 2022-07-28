</p>
<h1 align="center">R-TXZY-MD</h1>

<h1 align="center">Jangan lupa kasih stars & follow :)</h1>

>
>
>
</div>
<p align="center">
<a href="##"><img title="SELF-BOT" src="https://img.shields.io/static/v1?label=package&message=RTXZY-MD&color=blue"></a>
</p>
<p align="center">
  <a href="https://github.com/AlyaaXd"><img title="Author" src="https://img.shields.io/badge/Author-alya-blue.svg?style=for-the-badge&logo=github" /></a>
</p>
<p align="center">
<a href="#"><img title="mengapi" src="https://img.shields.io/static/v1?label=FREE&message=Apikey&color=blue"></a>
</p>
  
<a href="https://visitor-badge.glitch.me/badge?page_id=BOTCAHX/R-TXZY-MD"><img title="Visitor" src="https://visitor-badge.glitch.me/badge?page_id=BOTCAHX/R-TXZY-MD"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/network/members"><img title="Forks" src="https://img.shields.io/github/forks/BOTCAHX/R-TXZY-MD?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/watchers"><img title="Watchers" src="https://img.shields.io/github/watchers/BOTCAHX/R-TXZY-MD?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/BOTCAHX/R-TXZY-MD?label=Stars&color=yellow&style=flat-square"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/graphs/contributors"><img title="Contributors" src="https://img.shields.io/github/contributors/BOTCAHX/R-TXZY-MD?label=Contributors&color=blue&style=flat-square"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/issues"><img title="Issues" src="https://img.shields.io/github/issues/BOTCAHX/R-TXZY-MD?label=Issues&color=success&style=flat-square"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/issues?q=is%3Aissue+is%3Aclosed"><img title="Issues" src="https://img.shields.io/github/issues-closed/BOTCAHX/R-TXZY-MD?label=Issues&color=red&style=flat-square"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/pulls"><img title="Pull Request" src="https://img.shields.io/github/issues-pr/BOTCAHX/R-TXZY-MD?label=PullRequest&color=success&style=flat-square"></a>
<a href="https://github.com/BOTCAHX/R-TXZY-MD/pulls?q=is%3Apr+is%3Aclosed"><img title="Pull Request" src="https://img.shields.io/github/issues-pr-closed/BOTCAHX/R-TXZY-MD?label=PullRequest&color=red&style=flat-square"></a>

## Join Group Diskusi
[![BOT DISCUSSION GROUP](https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JEDQfzMGZan4HA98wtxsNL) 
**NO BOT**

## Install for termux

```bash
> termux-setup-storage
> pkg update && pkg upgrade
> pkg install git
> pkg install nodejs
> pkg install bash
> pkg install ffmpeg
> pkg install libwebp
> git clone  https://github.com/BOTCAHX/R-TXZY-MD
> cd RTXZY-MD 
> npm i
> node run.js

## untuk Sdcard (File yang Sudah Di Download)
> cd /sdcard
> cp -r RTXZY-MD $HOME
> cd RTXZY-MD 
> npm i
> node run.js
```

## Run On Heroku

Simple WhatsApp Bot

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BOTCAHX/R-TXZY-MD)

## UNTUK PENGGUNA RAILWAY

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%BOTCAHX%RTXZY-MD)

# get Session [seesion.data.json] 

[![Run on Repl.it(for get Sessions )](https://repl.it/badge/github/quiec/whatsAlfa)](https://github.com/BOTCAHX/Session-Md)

## FOR OKTETO

* Okteto [`Click Here go to website`](https://okteto.com)

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
git clone https://github.com/BOTCAHX/R-TXZY-MD
cd R-TXZY-MD
npm i
npm start
```
# Heroku Buildpack
### Instal Buildpack
* heroku/nodejs
* https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
* https://github.com/DuckyTeam/heroku-buildpack-imagemagick.git


# Hargai Kami Dengan Menambahkan Kredit

---------


## Arguments `node . [--options] [<session name>]` 

### `--session <nama file>`

menggunakan session dari nama file yang berbeda, default `session.data.json`

contoh nama file `raxcel.json` maka penggunaannya `node . --session 'raxcel'`

### `--prefix <prefix>`

* `prefixes` dipisahkan oleh masing-masing karakter
Setel awalan

### `--server`

Digunakan untuk [heroku](https://heroku.com/) atau pindai melalui situs web

### `--db <json-server-url>`

menggunakan db eksternal alih-alih db lokal, **disarankan** menggunakan mongodb

contoh server dengan mongodb `mongodb+srv://<username>:<password>@name-of-your-db.thhce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

contoh server dengan repl `https://json-server.nurutomo.repl.co/`

kode: `https://repl.it/@Nurutomo/json-server`

`node . --db 'https://json-server.nurutomo.repl.co/'`

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

**Semua yang selalu mendukung**


##### Special Thanks to
[![Nurutomo](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo)
[![BochilGaming](https://github.com/BochilGaming.png?size=100)](https://github.com/BochilGaming)
[![adiwajshing/Baileys](https://github.com/adiwajshing.png?size=100)](https://github.com/adiwajshing)


#contact person

 [`AlyaXzy`](https://wa.me/6289505165400)

 [`BOTCAHX`](https://wa.me/6282221792667)
 
 [`Verdi`](https://wa.me/6285706735450)
 
 [`Radhin`](https://wa.me/6282373158947)
