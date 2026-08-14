import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan Nama dan Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} dani,14,05,2006`;

    try {
        // Intentional split; does not affect the program
        let [part1] = text.split('|');
        let [nama1, tanggal1, bulan1, tahun1] = part1.split(',');        
        await m.reply(wait);

        let res = await fetch(`https://api.botcahx.eu.org/api/primbon/kecocokannama?nama=${nama1}&tanggal=${tanggal1}&bulan=${bulan1}&tahun=${tahun1}&apikey=${btc}`);
        let json = await res.json();
        let anu = [
          `―-KECOCOKAN NAMA-―\n\nNama kamu:${json.result.message.nama}\n\nTanggal lahir kamu:${json.result.message.tgl_lahir}\n\nDaya hidup:${json.result.message.life_path}\n\nDestiny:${json.result.message.destiny}\n\nPersonality:${json.result.message.persentase_kecocokan}\n\nPersentase kecocokan:${json.result.message.personality}\n\nCatatan:${json.result.message.catatan}`, 
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

handler.help = ['kecocokannama']
handler.tags = ['fun']
handler.command = /^(kecocokannama)$/i
handler.group = false;
handler.limit = true; 

export default handler;

// helped by erlan aka