import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {

if (!text) throw `Masukkan Nomor nya!\n\ncontoh: ${usedPrefix + command} 6281289694906\n\n*Gunakan 62!*`;
try {
  await m.reply(wait)
  let res = await fetch(`https://api.botcahx.eu.org/api/primbon/nomerhoki?nomer=${text}&apikey=${btc}`);
  let json = await res.json()
  let anu = [
       `―-NOMOR HOKI-―\n\nNomor hp: ${json.result.message.nomer_hp}\n\nAngka shuzi: ${json.result.message.angka_shuzi}\n\n
--Energi positif: \nKekayaan: ${json.result.message.energi_positif.kekayaan}\nkesehatan: ${json.result.message.energi_positif.kesehatan}\ncinta: ${json.result.message.energi_positif.cinta}\nkestabilan: ${json.result.message.energi_positif.kestabilan}\npersentase: ${json.result.message.energi_positif.persentase}\n\n
--Energi negatif: \nperselisihan: ${json.result.message.energi_negatif.perselisihan}\nkehilangan: ${json.result.message.energi_negatif.kehilangan}\nmalapetaka: ${json.result.message.energi_negatif.malapetaka}\nkehancuran: ${json.result.message.energi_negatif.kehancuran}\npersentase: ${json.result.message.energi_negatif.persentase}\n\n
--Catatan: ${json.result.message.catatan}`, 
    ]
conn.reply(m.chat,`${(anu)}`);;
} catch (e) {
throw eror
  }
}
  
    handler.help = ['nomerhoki nomor?']
    handler.tags = ['fun']
    handler.command = /^(nomerhoki)$/i
    handler.group = false;
    handler.limit = true; 
    
    export default handler
