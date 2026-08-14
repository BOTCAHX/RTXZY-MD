import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} dani,14,05,2006`;

    try {
        let [part1] = text.split('|');
        let [nama, tanggal1, bulan1, tahun1] = part1.split(',');

        
        await m.reply(wait);

        let res = await fetch(`https://api.botcahx.eu.org/api/primbon/potensikeberuntungan?nama=${nama}&tanggal=${tanggal1}&bulan=${bulan1}&tahun=${tahun1}&apikey=${btc}`);
        let json = await res.json();
        let anu = [
          `―-POTENSI KEBERENTUNGAN-―\n\nNama: ${json.result.message.nama}\n\nTanggal lahir: ${json.result.message.tgl_lahir}\n\nHASIL: ${json.result.message.result}`, 
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

handler.help = ['potensikeberuntungan']
handler.tags = ['fun']
handler.command = /^(potensikeberuntungan)$/i
handler.group = false;
handler.limit = true; 

export default handler;
