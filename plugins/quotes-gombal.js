let handler = async (m, { conn } ) => {
let anu =`─────〔 *Gombal* 〕─────\n\n${pickRandom(global.gombal)}`
const ftroli = {
    key : {
    remoteJid: '6283136505591-1614953337@g.us',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: 'Random Gombal', 
    orderTitle: `Wabot`,
    thumbnail: 'https://telegra.ph/file/5ecbec3e82e247671a18e.jpg', 
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
conn.sendBut(m.chat, anu, wm3, 'Gombal', '.gombal', ftroli) 
}
handler.help = ['gombal']
handler.tags = ['quotes']
handler.command = /^(gombal)$/i
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

global.gombal = [
"Kamu tau gak? Kenapa kalau aku menghafal lihatnya ke atas? soalnya kalau merem langsung kebayang wajahmu.",
"Orang kurus itu setia, makan aja tidak pernah nambah apalagi pasangan.",
"Kamu tu kayak warteg, sederhana namun berkualitas.",
"Aku gak sedih kok kalo besok hari senin, aku sedihnya kalau gak ketemu kamu.",
"Cintaku kepadamu itu bagaikan metabolisme, yang gak akan berhenti sampai mati.",
"Kamu tau gak apa persamaannya kamu sama AC? Sama-sama bikin aku sejuk.",
"Aku hanya ingin hidup cukup. Cukup lihat senyummu setiap hari.",
"Aku rela ikut lomba lari keliling dunia, asalkan engkau yang menjadi garis finisnya.",
"Kalau orang kebutuhan primernya ada tiga yaitu sandang pangan dan papan, tapi kalau aku : kamu, kamu, kamu.",
"Cita-citaku dulu pengen jadi dokter, tapi setelah mengenalmu, berubah jadi ingin membahagiakanmu.",
"Enak ya jadi kamu, kalau mau liat bidadari, tinggal liat di kaca.",
"Jika kamu tanya berapa kali kamu datang ke pikiranku, jujur saja, cuma sekali. Habisnya, gak pergi-pergi sih!",
"Jangan GR deh. Aku kangen kamu sedikit aja kok. Sedikit berlebihan maksudnya.",
"Tanggal merah sekalipun aku tidak libur untuk memikirkan kamu.",
"Cintaku padamu bagai diare. Tak bisa kutahan, terus keluar begitu saja.",
"Aku ga lulus ulangan umum sayang, gara-gara di bagian essay-nya aku tulis surat cinta buat kamu.",
"Tahu gak kenapa kita cuma bisa lihat pelangi setengah lingkaran? Sebab setengahnya lagi ada di mata kamu.",
"Kalo kamu lagi di AS, Patung Liberty ga akan bawa obor tapi bakal bawa BUNGA!",
"Aku rela jadi abang nasi goreng asalkan setiap malam aku bisa lewat depan rumah kamu.",
"Aku rela dipenjara seumur hidup asalkan pelanggarannya karena mencintaimu.",
"Kamu tau gak? Lukisan itukan makin lama makin antik, kalo kamu makin lama makin cantik",
]
