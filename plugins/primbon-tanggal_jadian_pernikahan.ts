import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan Nama dan Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} 14,05,2006`;

    try {
        let [part1] = text.split('|');
        let [tanggal1, bulan1, tahun1] = part1.split(',');

        
        await m.reply(wait);

        let res = await fetch(`https://api.botcahx.eu.org/api/primbon/tanggaljadianpernikahan?tanggal=${tanggal1}&bulan=${bulan1}&tahun=${tahun1}&apikey=${btc}`);
        let json = await res.json();
        let anu = [
          `―-TANGGAL JADIAN PERNIKAHAN-―\n\nTanggal: ${json.result.message.tanggal}\n\nKarakteristik:${json.result.message.karakteristik}\n\nCatatan:${json.result.message.catatan}`, 
       ]
        if (json.status) {
         conn.reply(m.chat,`${(anu)}`);;
        } else {
            conn.reply(m.chat, `Maaf, terjadi kesalahan`, m);
        }
    } catch (e) {
    throw eror
    }
}

handler.help = ['tanggaljadianpernikahan']
handler.tags = ['fun']
handler.command = /^(tanggaljadianpernikahan)$/i
handler.group = false;
handler.limit = true; 

export default handler;
