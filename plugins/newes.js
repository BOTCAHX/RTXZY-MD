let handler  = async (m, { conn }) => {
	
	await m.reply('Searching...')
  conn.reply(m.chat,`Berita Terbaru Hari ini\n\n${pickRandom(global.berita)}`, m)
}
handler.help = ['berita','news']
handler.tags = ['internet','news']
handler.command = /^(berita|news)$/i
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

global.berita = [
'https://jateng.inews.id/berita/bikin-heboh-penanggalan-kalender-tahun-2021-mirip-dengan-tahun-1971',
'https://www.inews.id/news/nasional/ajak-lawan-covid-19-di-2021-anis-matta-kita-memasuki-tahun-kedua-krisis',
'https://www.inews.id/news/megapolitan/hari-pertama-2021-arus-lalin-di-puncak-sepi',
'https://www.inews.id/multimedia/video/video-pamandangan-super-langka-jakarta-lengang-di-awal-2021',
'https://www.inews.id/multimedia/photo/sri-mulyani-pentaskan-tarian-transformasi-menatap-tahun-2021',
'https://www.inews.id/news/megapolitan/keterisian-turun-rsdc-wisma-atlet-kemayoran-akan-rawat-lagi-pasien-covid-19-otg',
'https://www.inews.id/finance/bisnis/bpom-terbitkan-izin-penggunaan-darurat-kedua-untuk-13-juta-vaksin-sinovac',
'https://www.inews.id/finance/makro/sri-mulyani-sebut-dukungan-tni-dan-polri-penting-untuk-atasi-pandemi-covid-19',
'https://www.inews.id/sport/all-sport/5-atlet-berpenghasilan-tertinggi-10-tahun-terakhir-nomor-1-kantongi-rp127-triliun',
'https://www.inews.id/sport/soccer/fantastis-chelsea-hasilkan-rp96-triliun-dari-akademi-pemain-muda',
'https://www.inews.id/lifestyle/health/5-fakta-sejarah-hari-valentine',
'https://jatim.inews.id/video/video-ustaz-cabuli-6-santriwati-di-jombang-ditangkap-polisi',
'https://www.inews.id/multimedia/video/video-penganiayaan-pacar-viral-di-media-sosial',
'https://www.inews.id/multimedia/video/mobil-terperosok-jalan-ambles-di-wonosobo',
'https://www.inews.id/multimedia/video/anak-bunuh-ayah-gara-gara-makan-sahur-polisi-dalami-kejiwaan-pelaku',
'https://www.inews.id/multimedia/photo/mrt-ubah-jadwal-operasional-selang-waktu-berangkat-5-menit-pada-jam-sibuk',
'https://www.rctiplus.com/news/detail/seleb/850988/dikenal-tajir-ini-9-penampakan-bisnis-perumahan-ussy-sulistiawaty?utm_source=inewsid&utm_medium=news&utm_campaign=widget-rctiplus',
'https://www.rctiplus.com/news/detail/gaya-hidup/850987/israel-klaim-obat-kanker-bisa-jadi-terobosan-dalam-memerangi-virus-corona?utm_source=inewsid&utm_medium=news&utm_campaign=widget-rctiplus',
'https://www.rctiplus.com/news/detail/ekonomi/850986/bursa-asia-turun-karena-investor-cermati-imbal-hasil-obligasi-as?utm_source=inewsid&utm_medium=news&utm_campaign=widget-rctiplus',
'https://www.rctiplus.com/news/detail/olahraga/850984/yamaha-lanjut-di-motogp-hingga-2026?utm_source=inewsid&utm_medium=news&utm_campaign=widget-rctiplus',
'https://www.rctiplus.com/news/detail/gaya-hidup/850983/marie-thomas-dokter-perempuan-pertama-indonesia-jadi-google-doodle-hari-ini?utm_source=inewsid&utm_medium=news&utm_campaign=widget-rctiplus',
'https://ekbis.sindonews.com/read/337622/38/peluang-kenaikan-ihsg-masih-terlihat-bakal-bergerak-di-kisaran-6-202-6-318-1613523761?utm_source=bola.okezone.com_widget&utm_medium=internal_networks&utm_campaign=mnc_group',
'https://sports.sindonews.com/read/337616/11/alisson-becker-patahkan-cibiran-saat-rb-leipzig-vs-liverpool-klopp-ikut-senang-1613523754?utm_source=bola.okezone.com_widget&utm_medium=internal_networks&utm_campaign=mnc_group',
'https://lifestyle.sindonews.com/read/337592/187/barbie-kumalasari-bagikan-tips-akting-netizen-sepertinya-dia-stres-1613523739?utm_source=bola.okezone.com_widget&utm_medium=internal_networks&utm_campaign=mnc_group',
'https://sains.sindonews.com/read/337580/767/ilmuwan-hungaria-ciptakan-alat-pelacak-keberadaan-air-di-bulan-1613520120?utm_source=bola.okezone.com_widget&utm_medium=internal_networks&utm_campaign=mnc_group',
'https://bola.okezone.com/read/2021/02/17/261/2363399/kompak-mohamed-salah-dan-sadio-mane-selebrasi-sujud-di-laga-rb-leipzig-vs-liverpool?utm_source=inews_widget&utm_medium=internal_networks',
'https://bola.okezone.com/read/2021/02/17/261/2363398/hattrick-ke-gawang-barcelona-kylian-mbappe-panaskan-perburuan-top-skor-liga-champions?utm_source=inews_widget&utm_medium=internal_networks',
'https://lifestyle.okezone.com/read/2021/02/17/481/2363397/marie-thomas-dokter-perempuan-pertama-indonesia-jadi-google-doodle-hari-ini?utm_source=inews_widget&utm_medium=internal_networks',
'https://mnctrijaya.com/news/detail/40742/program-sarjana-terapan-hasilkan-sarjana-yang-kompten-bagi-dunia-usaha',
]
