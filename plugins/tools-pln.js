import fetch from 'node-fetch';

let handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} 172720204487`
    m.reply(wait)
    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/tools/cekbillpln?id=${text}&apikey=${btc}`)).json();
        let content = `*T A G I H A N  P L N*\n\n`;

        if (res.status && res.result) {
            content += `  ◦ *ID Pelanggan:* ${res.result.id_pelanggan}\n`;
            content += `  ◦ *Nama:* ${res.result.nama_pelanggan}\n`;
            content += `  ◦ *Jumlah Tagihan:* ${res.result.jumlah_tagihan}\n`;
            content += `  ◦ *Periode:* ${res.result.periode}\n`;
            content += `  ◦ *Stand Meter:* ${res.result.stand_meter}\n`;
            content += `  ◦ *Tarif/Daya:* ${res.result.tarif_daya}\n`;
            content += `  ◦ *Total Bulan:* ${res.result.total_bulan}\n`;
        } else {
            content += 'Data tagihan tidak ditemukan.';
        }
        await m.reply(content);
    } catch (error) {
        throw eror;
    }
};

handler.command = handler.help = ['cekbillpln','tagihanpln','pln'];
handler.tags = ['tools'];
handler.limit = true;
export default handler;
