<h1 align="center">RTXZY-MD</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node">
  <img src="https://img.shields.io/badge/Baileys-Latest-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Baileys">
  <img src="https://img.shields.io/badge/Lisensi-MIT-yellow?style=for-the-badge" alt="License">
</p>

---

## Pembaruan Terbaru

- **Update Lid resolver** — Penanganan lid jadi terbaru
- **Menggunakan Baileys Latest** — [`Baileys`](https://github.com/WhiskeySockets/Baileys)
- **Pairing Code** — QR Code dihapus, sekarang pakai Pairing Code
- **Wajib Node.js 22++**

---

## Daftar Isi

- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Pengaturan API Key](#pengaturan-api-key)
- [Menjalankan Bot](#menjalankan-bot)
- [Daftar Argumen](#daftar-argumen)
- [Deployment](#deployment)
- [Kontributor](#kontributor)
- [Support](#support)

---

## Persyaratan

Sebelum menjalankan bot, pastikan sistem kamu memiliki:

| Komponen | Keterangan |
|----------|-----------|
| **Node.js** | Versi **22 atau lebih baru** |
| **ffmpeg** | Untuk pemrosesan media |
| **imagemagick** | Untuk manipulasi gambar |
| **webp** | Untuk konversi stiker |

> **Catatan:** Script ini **tidak mendukung** eksekusi di **Termux**.

---

## Instalasi

### Windows / VPS / RDP

Unduh dan instal:

- [Git](https://git-scm.com/downloads)
- [Node.js 22+](https://nodejs.org/en/download)
- [FFmpeg](https://ffmpeg.org/download.html) — tambahkan ke PATH
- [ImageMagick](https://imagemagick.org/script/download.php)

### VPS (Linux)

```bash
apt update && apt upgrade -y
apt install nodejs imagemagick ffmpeg -y
node -v
# Jika versi masih di bawah 22:
curl -s https://deb.nodesource.com/setup_22.x | sudo bash
apt-get install -y nodejs
```

### Clone & Install

```bash
git clone https://github.com/BOTCAHX/RTXZY-MD
cd RTXZY-MD
npm install
```

### Pterodactyl Panel

Untuk menjalankan di **Pterodactyl Panel** caranya tergantung letak file:

**Opsi 1 — File langsung di `/home/container` (bukan dalam folder):**

- Set startup ke: `node index.js` atau `npm start`

**Opsi 2 — File berada dalam folder (contoh: `/home/container/RTXZY-MD` atau nama folder custom):**

1. Pindahkan file **`run.js`** ke `/home/container` (luar folder bot)
2. Set startup panel ke: `node run.js`
3. Buka **Terminal** panel, lalu jalankan perintah:
   ```bash
   cd RTXZY-MD   # atau nama folder kamu
   npm install
   node index.js # atau npm start
   ```

**Opsi 3 — Pindahkan semua file ke `/home/container`:**

Jika ingin lebih mudah, pindahkan semua isi folder bot langsung ke `/home/container`, lalu set startup ke `node index.js` atau `npm start`.

---

**Cara upload file ke panel:**

Bot bisa di-clone via `git clone` langsung dari terminal panel, atau diupload sebagai arsip. **Rekomendasi:**

- Download repo sebagai **ZIP** dari GitHub
- Edit file (`config.js`, dll) di lokal
- Upload file ke panel dalam bentuk **ZIP** atau **tar.gz**
- Extract/unzip di panel

> Panel biasanya memiliki batas view per file, jadi editing lokal lalu upload arsip lebih praktis.

> **Catatan:** Konfigurasi tiap panel bisa berbeda. Pahami struktur folder server kamu dan sesuaikan startup command-nya.
>
> **Catatan:** Pastikan Node.js egg yang digunakan versi 22+, jika tidak bot akan error.
>
> **Catatan:** Jika panel tidak memiliki akses Terminal, gunakan Opsi 1 atau Opsi 3 agar tidak perlu terminal.
---

## Pengaturan API Key

Bot ini menggunakan **97% fitur dari Rest API**, jadi kamu **wajib mengisi Apikey**.

1. Daftar di [`BOTCAHX API`](https://api.botcahx.eu.org)
2. Pilih paket yang sesuai: [`Lihat Paket`](https://api.botcahx.eu.org/price)
3. Copy Apikey kamu
4. Paste di `config.js` pada bagian **`global.btc`**

| Tipe | Batas |
|------|-------|
| **Free** | 15 request/hari |
| **Premium** | Sesuai paket yang dibeli *(recommended)* |

---

## Menjalankan Bot

```bash
node index.js
```

Pairing code akan muncul di terminal — scan dengan WhatsApp kamu.

---

## Daftar Argumen

```bash
node index.js [--options]
```

| Argumen | Fungsi |
|---------|--------|
| `--self` | Hanya Owner & Bot |
| `--pconly` | Hanya merespon chat pribadi |
| `--gconly` | Hanya merespon chat grup |
| `--swonly` | Hanya merespon status |
| `--restrict` | Aktifkan plugin terbatas (risiko kena banned) |
| `--img` | Tampilkan gambar di terminal |
| `--autoread` | Tandai semua pesan masuk sebagai sudah dibaca |
| `--nyimak` | Mode silent — hanya log, tidak membalas |
| `--test` | Mode pengembangan |
| `--prefix <prefix>` | Set prefix (setiap karakter jadi prefix terpisah) |
| `--db <mongodb url>` | Set URL MongoDB |

---

## Deployment

### Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/blueprint/new?repo=https%3A%2F%2Fgithub.com%2FBOTCAHX%2FRTXZY-MD)

### Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BOTCAHX/RTXZY-MD)

#### Heroku Buildpack

```
heroku/nodejs
https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
https://github.com/clhuang/heroku-buildpack-webp-binaries.git
```

---

## Kontributor

<p align="center">
  <a href="https://github.com/BOTCAHX"><img src="https://github.com/BOTCAHX.png?size=100" width="100" height="100" alt="Tio"></a>
  <a href="https://github.com/ERLANRAHMAT"><img src="https://github.com/ERLANRAHMAT.png?size=100" width="100" height="100" alt="Erlan"></a>
  <a href="https://github.com/BochilGaming"><img src="https://github.com/BochilGaming.png?size=100" width="100" height="100" alt="Bochilgaming"></a>
  <a href="https://github.com/Nurutomo"><img src="https://github.com/Nurutomo.png?size=100" width="100" height="100" alt="Nurutomo"></a>
</p>

| [Tio](https://github.com/BOTCAHX) | [Erlan](https://github.com/ERLANRAHMAT) | [Bochilgaming](https://github.com/BochilGaming) | [Nurutomo](https://github.com/Nurutomo) |
|---|---|---|---|
| Recode | Contributor | Sepuh | Sepuh |

**Base original:** [`ZukaBet`](https://github.com/HelgaIlham/ZukaBet)

---

## Support

<a href="https://wa.me/6282221792667"><img src="https://img.shields.io/badge/Contact_Admin-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"></a>
<a href="https://whatsapp.com/channel/0029VbAI9JCBKfi5qXq9yJ01"><img src="https://img.shields.io/badge/Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Channel"></a>
<a href="https://qris.zone.id/qviqy41iq"><img src="https://img.shields.io/badge/Donate-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Donate"></a>
