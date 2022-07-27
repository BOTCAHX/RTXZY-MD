global.kuis = global.kuis ? global.kuis : {}
let handler  = async (m, { conn, usedPrefix }) => {

  let id = m.chat
  if (id in global.kuis) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', global.kuis[id][0])
  global.kuis[id] = [
    await conn.reply(m.chat,`「 KUIS 」\n\nPertanyaan :\n${pickRandom(global.kuis)}\n\nWaktu : 30.00 Detik\nBonus : 5000 XP`, m),
    kuis, 4,
    setTimeout(() => {
      if (global.kuis[id]) conn.sendBut(m.chat, `Waktu habis!\n\nCoba Lagi Lain Waktu`, wm, 'Kuis', '.kuis', m)
      delete global.kuis[id]
    }, 30000)
  ]
}
handler.help = ['kuis']
handler.tags = ['game', 'update']
handler.command = /^(kuis)$/i
handler.owner = false
handler.mods = false
handler.off = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false
handler.limit = true
handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.kuis = [
'Pemain bola apa yang beratnya 3 kg?',
'Penyanyi luar negeri yang suka sepeda’an ?',
'Penyanyi yang rambutnya gak lurus?',
'Penyanyi luar negeri yang asli Indonesia?',
'Penyanyi luar negeri yang susah nelen?',
'Penyanyi yang sering gak sadar diri?',
'Gubernur apa yang suka nyanyi?',
'Wakil presiden yang sering nonton streaming?',
'Mengapa motor berhenti di depan lampu merah?',
'Tebak binatang apa yang jago renang?',
'Kenapa di rel kereta api ditaruh batu?',
'Cuaca sedang mendung. Ada 5 orang tapi hanya ada 1 payung. Bagaimana caranya agar mereka semua tidak kehujanan?',
'Ayam apa yang bikin sebel?',
'Kenapa di komputer ada tulisan ENTER?',
'Kunci apa yang bisa bikin orang joget?',
'Benda kecil apa yang bisa ngeluarin orang?',
'Belajar bahasa Mandarin, lantai basah artinya apa?',
'Apa jenis kutu yang amat mengerikan?',
'Apa warnanya angin?',
'Benda apa keluar ketika diputar?',
'Malam apa yang sangat mengerikan dan menakutkan?',
'Ada orang sedang mencari sesuatu, datang bersih pulang babak belur. Apa yang sebenanya dia cari?',
'Terjemahkan ke dalam bahasa jepang tidak ada uang?',
'Benda apa yang huruf depannya K belakangnya L. Sedang bila ditarik keras, kalau dilepas lemas?',
'Mengapa mobil dan motor berhenti ketika lampu sedang berwarna merah?',
'Banyak dijauhi orang padahal kulitnya berwarna putih?',
'Apa alasan ninja memakai kain untuk penutup kepala?',
'Apa alasan pohon kelapa di depan rumah wajib ditebang?',
'Jika tidur maka dia bangun. Bila bangun, dia tidur?',
'Penyakit apa yang suka banget diperlihara manusia?',
'Monyet apa yang paling nyebelin?',
'Apa bedanya kamu dengan lukisan?',
'Apa bedanya kalo jam 12:00 sama kamu?',
'Bis apa yang paling membahagiakan?',
'Setan apa yang paling romantis?',
'Cecak apa yang bisa bikin aku mati?',
'Kopi apa yang paling pahit?',
'Rel apa yang paling sakit?',
'Tiang apa yang enak?',
'Tau gak kenapa menara pisa miring ?',
'Susu apa yang indah?',
'Apa Kepanjangan dari Jumat?',
'Awan apa yang bikin seneng?',
'Buah apa yang paling kaya?',
'Apa itu Cemilan?',
'Telur sama Ayam duluan mana?',
'Telur sama Ayam duluan mana?',
'Telur sama Ayam duluan mana?',
'Nembaknya ke lantai tapi yang kena hidung, apakah itu?',
'Tentara apa yang paling kecil?',
'Apa persamaannya uang dan rahasia?',
'Apa bedanya matahari dengan bulan?',
'Apa bahasa Jepangnya Saya dicopet?',
'Lemari yang bisa masuk kantong?',
'Bebek apa yang jalannya muter ke kiri terus?',
'Ada ayam lima, dikali dua. Berapa semuanya?',
'Kalau saja ada sekolah yang berisi semua jenis hewan, siapa yang sering terlambat?',
'Kaki seribu kalau belok kiri kakinya berapa?',
'Ditutup jadi tongkat, dibuka jadi tenda. Apakah itu?',
'Orang apa yang berenang tapi rambutnya tak pernah basah?',
'Bila gajah jadi ayam, lalu singa jadi ayam, dan kambing jadi ayam, maka ayam jadi apa?',
'Apa perbedaan aksi dengan demo?',
'Apa huruf kelima dalam abjad?',
'Pesawat jatuh, kapal tenggelam, munculnya di mana?',
'Apa bedanya sepatu sama jengkol?',
'Mana yang lebih berat, kapas 100 kg atau besi 100 kg?',
'Ditengah sawah ada apa?',
]
