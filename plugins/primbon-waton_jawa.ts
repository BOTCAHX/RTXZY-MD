import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} 14,05,2006`;

    try {
        let [part1] = text.split('|');
        let [tanggal1, bulan1, tahun1] = part1.split(',');

        
        await m.reply(wait);

        let res = await fetch(`https://api.botcahx.eu.org/api/primbon/wetonjawa?tanggal=${tanggal1}&bulan=${bulan1}&tahun=${tahun1}&apikey=${btc}`);
        let json = await res.json();
        let anu = [
          `―-WETON JAWA-―\n\nTanggal: ${json.result.message.tanggal}\n\nJumlah neptu: ${json.result.message.jumlah_neptu}\n\nWatak hari: ${json.result.message.watak_hari}\n\nNaga hari: ${json.result.message.naga_hari}\n\nJam balik: ${json.result.message.jam_baik}\n\nWatak kelahiran: ${json.result.message.watak_kelahiran}`, 
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

handler.help = ['wetonjawa']
handler.tags = ['fun']
handler.command = /^(wetonjawa)$/i
handler.group = false;
handler.limit = true; 

export default handler;
