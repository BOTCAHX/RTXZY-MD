let handler = async (m, { conn, command, args }) => {
let tetekss = `───〔 *Quotes Ngawur* 〕───

${pickRandom(global.ngawur)}`
conn.sendBut(m.chat, tetekss, wm3, 'Ngawur', '.ngawur', m) 
}
handler.help = ['ngawur']
handler.tags = ['quotes']
handler.command = /^(ngawur)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.ngawur = [
"Hargai kedua orang tuamu, mereka berhasil lulus dari sekolah tanpa bantuan Google",
"Seorang laki-laki sukses adalah yang bisa menghasilkan uang lebih dari yang dihabiskan istrinya. Seorang wanita sukses adalah yang bisa mencari laki laki seperti itu.",
"Manusia boleh berencana, tapi saldo juga yang menentukan.",
"Bila Anda jelek, jangan takut mencintai. Karena yang seharusnya takut adalah yang Anda cintai. - Cak Lontong",
"Manusia itu emang susah nyalahin diri sendiri. Leher pegel dibilang salah bantal.",
"Selalu ikuti kata hatimu. Tapi jangan lupa bawa juga otakmu.",
"Motivator dan pembicara tak dapat membuatku rajin bekerja. Hanya cicilan dan tagihan yang mampu.",
"Aku bukan pemalas. Aku sedang menjalankan mode hemat energi.",
"Anak kecil gak punya temen aja nangis, gimana hati kecil ini yang gak punya pasangan.",
"Yang rajin mandi kalah menariknya sama yang rajin senyum.",
"Tidak mengerjakan sesuatu itu sulit. Kamu tidak pernah tahu kapan akan selesai.",
"Menertawakan kesalahan kita bisa memperpanjang hidup kita sendiri. Menertawakan orang lain bisa mempersingkatnya.",
"Saat hidup menutup pintu untukmu, buka lagi saja. Itu hanya pintu, itulah cara kerjanya.",
"Jika ukuran benar-benar penting, gajah sudah lama menjadi raja hutan.",
"Kita belajar dari pengalaman bahwa manusia tidak pernah belajar apa pun dari pengalaman.",
"Hidup adalah seni menggambar tanpa penghapus.",
"Pembenci hanyalah pengagum yang bingung karena mereka tidak tahu alasan mengapa semua orang mencintaimu.",
"Hidup bergerak sangat cepat. Jika kamu tidak berhenti dan melihat-lihat sesekali, kamu bisa melewatkannya.",
"Tidur siang terdengar sangat kekanak-kanakan. Aku lebih suka menyebutnya jeda kehidupan horizontal.",
"Kamu tidak bisa membuat semua orang bahagia. Kamu bukan cokelat.",
"Tertawa bisa jadi obat terbaik. Tapi kalau kamu tertawa tanpa alasan yang jelas, mungkin kamu butuh obat.",
"Kuliah lo ambil apa? Gue sih ambil hikmahnya aja.",
"Bermimpilah sesuka hati tentang apa yang kamu inginkan, sebab itu hanya mimpi.",
"Jika kamu mencoba untuk gagal, dan berhasil, apa yang sudah kamu lakukan? - George Carlin",
"Jangan jadi orang lucu karena ujung-ujungnya cuma enak dijadiin temen.",
"Ya Tuhan jika dia bukan jodohku, tolong hapuskan kata bukan dari hidup ini.",
"Lebih baik pacaran terus kita disakiti, setidaknya kita pernah dibahagiain daripada di PHP-in, belum pacaran aja kita sudah disakitin. - Cak Lontong",
"Terlalu banyak manusia berharap pelukan saat hujan. Aku tak senaif itu, senyummu cukup menghangatkan.",
"Apakah namamu WiFi? Soalnya aku bisa merasakan konektivitas.",
"Wanita sangat rentan mengidap diabetes, sebab dia sering kali menelan janji manis.",
"Meskipun kamu gendut, kamu tetap muat kok masuk di hatiku.",
"Raga kita memang jarang bertemu. Tapi ketahuilah, mimpi ini selalu tentangmu.",
"Aku sudah siap kalau Senin harus bangun pagi, apalagi bangun rumah tangga sama kamu.",
"Cintaku ke kamu tuh kayak utang, awalnya kecil, didiemin tau-tau gede sendiri.",
"Cintaku tidak seperti kopi sachet, instan dan praktis. Tapi, seperti kopi bubuk, penuh perhitungan dan kehati-hatiaan.",
"Madu di tangan kananmu, racun di tangan kirimu, tapi jodoh tetap di tangan Tuhan.",
"Tidak apa-apa jika kamu tidak menyukaiku. Tidak semua orang memiliki selera yang baik.",
"Pepatah bijak berkata tidak akan pernah ada kata terlambat untuk belajar. Berarti belajar mencintai pacar orang juga masih bisa.",
"Jodoh emang gak ke mana tapi saingan di mana mana.",
"Lebih baik ditertawakan karena belum menikah daripada tak bisa tertawa setelah menikah.",
"Hari Minggu itu weekend tapi kalau cinta kita will never end.",
"Matamu itu kayak lampu merah, membuatku berhenti setiap kali melihatnya.",
"Setahu aku, fungsi hati itu sebenarnya ada dua, yang pertama untuk menyimpan mineral di dalam tubuh, yang kedua tentu saja untuk menyimpan cintaku padamu.",
"Kalau naik motor sama kamu pasti ditilang polisi deh. Soalnya kita selalu bertiga, aku, kamu, dan cinta.",
"Katanya cewek suka cowok yang humoris. Tapi buktinya, mereka lebih seneng sama Aliando dibanding Cak Lontong.",
"Jika kamu tidak bisa hidup tanpaku, mengapa kamu belum mati?",
"Jangan kamu mengarungi lautan, percuma. Karena karung lebih cocok untuk beras",
"Jomblo tidak harus malu, jomblo bukan berarti tidak laku, tapi memang tidak ada yang mau.",
"Beberapa orang menciptakan kebahagiaan ke mana pun dia pergi, sementara orang yang lain menciptakan kebahagiaan setiap kali dia pergi. - Oscar Wilde",
"Kita hidup pada zaman di mana saat bertanya malah dikatain kepo dan berbuat baik dianggap modus.",
"Mencintai kamu itu wajar, yang tidak wajar mencintai bapakmu.",
"Itu pintu hati atau pintu tol, yang masuk hanya yang bermobil saja.",
"Seandainya jatuh cinta ada tukang parkirnya, bisa diberhentikan sebelum mentok - Raditya Dika",
"Putus cinta itu biasa. Putus rem, nyawa taruhannya.",
"Hati-hati di jalan. Hatinya jangan jalan-jalan. Ingat, ada hati yang lagi dijalani.",
"Kamu tidak akan menemukan pendamping hidup yang tepat jika kamu tinggal di Mars.",
"Kalau disuruh melupakanmu, aku harus ke kantor kelurahan dulu bikin surat keterangan tidak mampu.",
"Tiga hal yang bikin seseorang tidak disukai: otak yang kosong, omong kosong, dan dompet yang kosong.",
"Satu hal yang membuat mata tak bisa terpejam, bagaimana caranya agar aku bisa membuat pacarmu percaya padaku untuk menjagamu.",
"Cinta itu harusnya seperti pelajaran kimia, bukan cuma teori tapi ada praktik juga.",
]
