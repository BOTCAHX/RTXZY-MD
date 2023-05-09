let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`“${pickRandom(global.taugasih)}”`, m)
}
handler.help = ['taugasih']
handler.tags = ['fun']
handler.command = /^(taugasih)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.limit = true
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.taugasih= [
"Tahukah Anda seekor capung bisa terbang dengan kecepatan 40kph (25mph)",
"Tahukah Anda bahwa semua burung hantu bertelur putih?",
"Tahukah Anda bahwa Hawaii secara resmi menjadi bagian dari AS pada 14 Juni 1900",
"Tahukah Anda bahwa rata-rata orang tertawa 10 kali sehari?",
"Tahukah Anda bahwa diameter Jupiter adalah 152.800 km (88.700 mil)",
"Tahukah Anda bahwa warna sikat gigi yang paling populer adalah biru",
"Tahukah Anda bahwa harimau memiliki kulit belang serta bulu",
"Tahukah Anda bahwa ngengat tidak punya perut",
"Tahukah Anda bahwa hamburger ditemukan pada tahun 1900",
"Tahukah Anda bahwa aichmophobia adalah ketakutan akan jarum dan benda runcing",
"Tahukah Anda bahwa kuku jari tangan tumbuh lebih cepat daripada kuku kaki",
"Tahukah Anda kata *hampir* adalah yang terpanjang dalam bahasa Inggris dengan semua huruf dalam urutan abjad",
"Tahukah Anda bahwa iatrofobia adalah ketakutan akan dokter",
"Tahukah Anda bahwa membanting pintu mobil Anda dulunya ilegal di Swiss",
"Tahukah Anda bahwa mamalia terkecil di dunia adalah kelelawar bumblebee dari Thailan",
"Tahukah Anda bahwa singa memberi makan setiap 3 hingga 4 hari sekali",
"Tahukah Anda bahwa cangkangnya 12% dari berat telur",
"Tahukah Anda bahwa landak rata-rata memiliki 30.000 duri",
"Tahukah Anda bahwa jeruk bali mendapatkan namanya dari cara ia tumbuh dalam kelompok seperti anggur di pohon anggur",
"Tahukah Anda bahwa 45% orang menggunakan obat kumur setiap hari",
"Tahukah Anda bahwa umur tupai adalah 9 tahun",
"Tahukah Anda bahwa Anda dapat membedakan jenis kelamin kuda dari giginya (kebanyakan jantan memiliki 40, betina 36)",
"Tahukah Anda 10% dari pasokan makanan dunia dikonsumsi oleh serangga",
"Tahukah kamu awan terbang lebih tinggi di siang hari daripada di malam hari",
"Tahukah Anda bahwa Empire State Building di New York memiliki berat lebih dari 365.000 ton",
"Tahukah Anda Antartika terdiri dari 98% es dan 2% batu tandus",
"Tahukah Anda 90% orang bergantung pada jam alarm untuk bangun",
"Tahukah Anda bahwa kopi adalah minuman paling populer di seluruh dunia dengan lebih dari 400 miliar cangkir dikonsumsi setiap tahun",
"Tahukah Anda bahwa Bumi disambar petir lebih dari 100 kali setiap detik",
"Tahukah Anda bahwa rata-rata orang memiliki 10.000 selera?",
"Tahukah Anda bahwa sel darah merah diproduksi di sumsum tulang?",
"Tahukah Anda bahwa 11% orang kidal",
"Tahukah kamu setiap tahun matahari kehilangan 360 juta ton",
]
