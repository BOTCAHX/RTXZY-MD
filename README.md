<h1 align="center">RTXZY-MD</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node">
  <img src="https://img.shields.io/badge/zapo--js-Latest-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="zapo-js">
  <img src="https://img.shields.io/badge/Lisensi-MIT-yellow?style=for-the-badge" alt="License">
</p>

---

## Pembaruan Terbaru

- **Sepenuhnya TypeScript** — Semua kode ditulis dalam TypeScript, dijalankan langsung oleh Node 22+ (native type stripping)
- **Server HTTP Native** — Menghapus dependensi `express` untuk performa server yang lebih ringan
- **Update Lid resolver** — Penanganan lid jadi terbaru
- **Menggunakan zapo-js** — [`zapo-js`](https://zapo.to), dokumentasi & MCP di [`zapo.to/mcp`](https://zapo.to/mcp)
- **Sesi lokal SQLite** — Kredensial disimpan di `sessions/state.sqlite` (pakai `@zapo-js/store-sqlite` + `better-sqlite3`)
- **Database SQLite** — Database bot (`users`, `chats`, `stats`, dll) kini tersimpan di `database/database.sqlite` (WAL, atomic) menggantikan `database.json`; auto-migrasi dari JSON lama saat boot pertama
- **Koneksi Dual Mode** — Mendukung Pairing Code secara default, dan QR Code bisa diakses dengan argumen `--qr`
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
```

Instalasi dependency bisa memakai **salah satu** package manager — semuanya didukung & sudah teruji (konfigurasi lengkap untuk tiap PM sudah disertakan di repo):

```bash
npm install     # npm
yarn install    # Yarn Berry 4 (pakai corepack: corepack yarn@4.10.3 install)
pnpm install    # pnpm (v10 & v11)
bun install     # bun
```

### Pterodactyl Panel

Untuk menjalankan di **Pterodactyl Panel** caranya tergantung letak file:

**Opsi 1 — File langsung di `/home/container` (bukan dalam folder):**

- Set startup ke: `node index.ts` atau `npm start`

**Opsi 2 — File berada dalam folder (contoh: `/home/container/RTXZY-MD` atau nama folder custom):**

1. Pindahkan file **`run.ts`** ke `/home/container` (luar folder bot)
2. Set startup panel ke: `node run.ts`
3. Buka **Terminal** panel, lalu jalankan perintah:
   ```bash
   cd RTXZY-MD   # atau nama folder kamu
   npm install
   node index.ts # atau npm start
   ```

**Opsi 3 — Pindahkan semua file ke `/home/container`:**

Jika ingin lebih mudah, pindahkan semua isi folder bot langsung ke `/home/container`, lalu set startup ke `node index.ts` atau `npm start`.

---

**Cara upload file ke panel:**

Bot bisa di-clone via `git clone` langsung dari terminal panel, atau diupload sebagai arsip. **Rekomendasi:**

- Download repo sebagai **ZIP** dari GitHub
- Edit file (`config.ts`, dll) di lokal
- Upload file ke panel dalam bentuk **ZIP** atau **tar.gz**
- Extract/unzip di panel

> Panel biasanya memiliki batas view per file, jadi editing lokal lalu upload arsip lebih praktis.

> **Catatan:** Konfigurasi tiap panel bisa berbeda. Pahami struktur folder server kamu dan sesuaikan startup command-nya.
>
> **Catatan:** Pastikan Node.js egg yang digunakan versi 22+, jika tidak bot akan error.
>
> **Catatan:** Jika panel tidak memiliki akses bash sama sekali, gunakan Opsi 1 atau Opsi 3.
---

## Pengaturan API Key

Bot ini menggunakan **97% fitur dari Rest API**, jadi kamu **wajib mengisi Apikey**.

1. Daftar di [`BOTCAHX API`](https://api.botcahx.eu.org)
2. Pilih paket yang sesuai: [`Lihat Paket`](https://api.botcahx.eu.org/price)
3. Copy Apikey kamu
4. Paste di `config.ts` pada bagian **`global.btc`**

| Tipe | Batas |
|------|-------|
| **Free** | 15 request/hari |
| **Premium** | Sesuai paket yang dibeli *(recommended)* |

---

## Menjalankan Bot

```bash
node index.ts
```

Pairing code akan muncul di terminal — scan dengan WhatsApp kamu.

---

## Daftar Argumen

```bash
node index.ts [--options]
```

| Argumen | Fungsi |
|---------|--------|
| `--qr` | Mengaktifkan mode autentikasi QR Code (secara default menggunakan Pairing Code) |
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
| `--db <mongodb url>` | Pakai MongoDB (contoh: `--db mongodb://user:pass@host:27017/bot`) |
| `--db json` | Pakai database JSON file (`database.json`) — default sebelumnya |
| `--db sqlite` | Pakai SQLite (`database/database.sqlite`, WAL) — **default** |
| `--db <https://...>` | Pakai cloud adapter |

---

## MCP Development (zapo)

Bot ini sudah menyertakan [`@zapo-js/mcp-server`](https://zapo.to/mcp) — server Model Context Protocol yang mengekspos sesi `zapo-js` (koneksi, pairing, kirim pesan, query grup, inspeksi event) sebagai **tools** untuk LLM agent (Claude Code, Cursor, dll). Cocok untuk **development/testing**, bukan untuk production.

### Menjalankan server

```bash
npm run mcp          # = zapo-mcp-server (stdio)
MCP_TRANSPORT=http MCP_AUTH_PATH=sessions/mcp.sqlite zapo-mcp-server
```

Variabel lingkungan penting:

| Variabel | Fungsi |
|----------|--------|
| `MCP_AUTH_PATH` | Path store SQLite kredensial (default: file store sendiri). **Gunakan path terpisah dari bot utama** (mis. `sessions/mcp.sqlite`) supaya tidak terjadi konflik `SQLITE_BUSY` saat bot & MCP berjalan bersamaan |
| `MCP_SESSION_ID` | Sesi default (mendukung multi-sesi di satu store) |
| `MCP_MAX_SESSIONS` | Batas jumlah sesi |
| `MCP_TRANSPORT` | `stdio` (default) atau `http` |
| `MCP_LOG_LEVEL` | Level log |

### Registrasi ke Claude Code

```bash
claude mcp add zapo -- node node_modules/@zapo-js/mcp-server/dist/bin.js
```

### Alur pairing lewat MCP (penting)

`client.connect()` **memblokir sampai pairing selesai** — selalu panggil dengan `noAwait`:

```text
call({ path: 'connect', noAwait: true })
events({ types: ['auth_qr', 'auth_pairing_code', 'auth_paired', 'connection'] })
# tampilkan QR ke user, tunggu auth_paired, lalu lanjut
call({ path: 'message.send', args: ['628xxx@s.whatsapp.net', { conversation: 'halo' }] })
```

Dokumentasi lengkap & skill MCP tersedia di [`zapo.to/mcp`](https://zapo.to/mcp).

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
