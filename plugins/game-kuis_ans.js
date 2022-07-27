let handler = m => m

global.kuis = global.kuis ? global.kuis : {}

handler.before = async function (m, { text }) {
  let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/「 KUIS 」/i.test(m.quoted.text)) return
  if (!(id in global.kuis)) return m.reply('Soal itu telah berakhir')
  if (m.quoted.id == global.kuis[id][0].id) {
  let kuis = global.kuis[id][1]
  if (m.text.toLowerCase() == 'Bambang tabung gas'.toLowerCase() || m.text.toLowerCase() == 'Selena gowes'.toLowerCase() || m.text.toLowerCase() == 'Ayu yang keriting'.toLowerCase() || m.text.toLowerCase() == 'Justin beber'.toLowerCase() || m.text.toLowerCase() == 'Ed sered'.toLowerCase() || m.text.toLowerCase() == 'Pingsan mambo'.toLowerCase() || m.text.toLowerCase() == 'Biduan kemil'.toLowerCase() || m.text.toLowerCase() == 'Muhammad youtube kalla'.toLowerCase() || m.text.toLowerCase() == 'Karena motornya direm'.toLowerCase() || m.text.toLowerCase() == 'Inu'.toLowerCase() || m.text.toLowerCase() == 'Soalnya kalau ditaruh duit nanti pada diambil'.toLowerCase() || m.text.toLowerCase() == 'Tinggal jalan aja'.toLowerCase() || m.text.toLowerCase() == 'Ayam yang habis'.toLowerCase() || m.text.toLowerCase() == 'karena kalo tulisannya entar programnya ngga jalan-jalan'.toLowerCase() || m.text.toLowerCase() == 'Kunci hotae'.toLowerCase() || m.text.toLowerCase() == 'Bel rumah'.toLowerCase() || m.text.toLowerCase() == 'Lhi Chin'.toLowerCase() || m.text.toLowerCase() == 'Kutukan'.toLowerCase() || m.text.toLowerCase() == 'Merah karna orang masuk angin'.toLowerCase() || m.text.toLowerCase() == 'Lipstik bibir'.toLowerCase() || m.text.toLowerCase() == 'Maklampir'.toLowerCase() || m.text.toLowerCase() == 'Orang yang lagi cari masalah'.toLowerCase() || m.text.toLowerCase() == 'Sakukurata takupusing'.toLowerCase() || m.text.toLowerCase() == 'Ketapel'.toLowerCase() || m.text.toLowerCase() == 'Karena direm'.toLowerCase() || m.text.toLowerCase() == 'Orang yang kena panu sekujur tubuh'.toLowerCase() || m.text.toLowerCase() == 'Bayangkan kalau pakai daun pisang dikepala Dikira nasi bungkus terbang dah'.toLowerCase() || m.text.toLowerCase() == 'Mau dicabut tapi susah'.toLowerCase() || m.text.toLowerCase() == 'Telapak kaki'.toLowerCase() || m.text.toLowerCase() == 'Pusing persia'.toLowerCase() || m.text.toLowerCase() == 'Monyetel Televisi tapi gak bisa'.toLowerCase() || m.text.toLowerCase() == 'Jika lukisan makin lama tambah antik. Kalau kamu makin lama tambah cantik'.toLowerCase() || m.text.toLowerCase() == 'Kalau jam 12:00 kesiangan kalu kamu kesayangan'.toLowerCase() || m.text.toLowerCase() == 'Bisa nikah sama kamu'.toLowerCase() || m.text.toLowerCase() == 'Setangkai bunga mawar kupersembahkan untukmu'.toLowerCase() || m.text.toLowerCase() == 'Cecak napas kalau lihat senyumanmu'.toLowerCase() || m.text.toLowerCase() == 'Kopilih dia daripada aku'.toLowerCase() || m.text.toLowerCase() == 'Relain aku pergi bersama yang lain'.toLowerCase() || m.text.toLowerCase() == 'Tiang-tiang mikirin kamu sambil minum es campur'.toLowerCase() || m.text.toLowerCase() == 'Karena ketarik sama senyummu'.toLowerCase() || m.text.toLowerCase() == 'Susungguhnya aku sayang kamu'.toLowerCase() || m.text.toLowerCase() == 'Jumat itu jujur'.toLowerCase() || m.text.toLowerCase() == 'a wanna be with you'.toLowerCase() || m.text.toLowerCase() == 'Sri Kaya'.toLowerCase() || m.text.toLowerCase() == 'Cecudah Celapan'.toLowerCase() || m.text.toLowerCase() == 'Telur lebih dahulu daripada ayam'.toLowerCase() || m.text.toLowerCase() == 'Huruf W'.toLowerCase() || m.text.toLowerCase() == 'Kentut'.toLowerCase() || m.text.toLowerCase() == 'Tentara sekutu'.toLowerCase() || m.text.toLowerCase() == 'Sama-sama susah dipegang'.toLowerCase() || m.text.toLowerCase() == 'Matahari ada diskon bulan nggak ada'.toLowerCase() || m.text.toLowerCase() == 'Sakukudiraba Takurasa'.toLowerCase() || m.text.toLowerCase() == 'Lema ribu'.toLowerCase() || m.text.toLowerCase() == 'Bebek dikunci stang'.toLowerCase() || m.text.toLowerCase() == 'Soalnya yang di kali 2 yang di darat 3'.toLowerCase() || m.text.toLowerCase() == 'Soalnya kakinya banyak jadinya kalau pakai sepatu kelamaan'.toLowerCase() || m.text.toLowerCase() == 'Tetep 1000'.toLowerCase() || m.text.toLowerCase() == 'Payung'.toLowerCase() || m.text.toLowerCase() == 'Orang gundul'.toLowerCase() || m.text.toLowerCase() == 'Ayam jadi banyak dong'.toLowerCase() || m.text.toLowerCase() == 'Kalau aksi rodanya empat kalau demo rodanya tiga'.toLowerCase() || m.text.toLowerCase() == 'Huruf E'.toLowerCase() || m.text.toLowerCase() == 'Di koran'.toLowerCase() || m.text.toLowerCase() == 'Kalau sepatu disemir kalau jengkol disemur'.toLowerCase() || m.text.toLowerCase() == 'sama sama 100 kg'.toLowerCase()) {
    this.sendBut(m.chat, `*Jawaban Benar!*\n+5000 XP`, wm, 'Kuis', '.kuis', m)
    global.db._data.users[m.sender].exp += 5000

    clearTimeout(global.kuis[id][3])
    delete global.kuis[id]
  } else {
    if (--global.kuis[id][2] == 0) {
      this.sendBut(m.chat, `*Kesempatan habis!*\n\nCoba Lagi lain waktu`, wm, 'Kuis', '.kuis', m)
      clearTimeout(global.kuis[id][3])
      delete global.kuis[id]
    } else this.reply(m.chat, `*Jawaban Salah!*\nMasih ada ${global.kuis[id][2]} kesempatan`, m)
  }
 }
}

module.exports = handler
