import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan Nama dan Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} cowo|cewe`;

    try {
        let [part1, part2] = text.split('|');
        let [nama1] = part1.split(',');
        let [nama2] = part2.split(',');
        
        await m.reply(wait);

        let res = await fetch(`https://api.botcahx.eu.org/api/primbon/kecocokanpasangan?cowo=${nama1}&cewe=${nama2}&apikey=${btc}`);
        let json = await res.json();
        let anu = [
          `―-KECOCOKAN PASANGAN-―\n\nNama kamu: ${json.result.message.nama_anda}\n\nNama pasangan kamu: ${json.result.message.nama_pasangan}\n\nSisi positif:${json.result.message.sisi_positif}\n\nSisi negatif:${json.result.message.sisi_negatif}\n\nCatatan:${json.result.message.catatan}`, 
       ]
       
       
        if (json.status) {
            conn.reply(m.chat,`${(anu)}`);;

        } else {
            conn.reply(m.chat, `Maaf, terjadi kesalahan!`, m);
        }
    } catch (e) {
    throw eror
    }
}

handler.help = ['kecocokanpasangan']
handler.tags = ['fun']
handler.command = /^(kecocokanpasangan)$/i
handler.group = false;
handler.limit = true; 

export default handler;
