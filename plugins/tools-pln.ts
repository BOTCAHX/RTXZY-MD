import fetch from 'node-fetch';

let handler: WaPlugin = async (m, {
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
            content += `  ◦ *ID Pelanggan:* ${res.result['Nomor ID Pelanggan']}\n`;
            content += `  ◦ *Nama:* ${res.result['Nama Pelanggan']}\n`;
            content += `  ◦ *Jumlah Tagihan:* ${res.result['Jumlah Tagihan']}\n`;
            content += `  ◦ *Periode:* ${res.result['Periode']}\n`;
            content += `  ◦ *Stand Meter:* ${res.result['Stand Meter']}\n`;
            content += `  ◦ *Tarif/Daya:* ${res.result['Tarif / Daya']}\n`;
            content += `  ◦ *Denda:* ${res.result['Denda']}\n`;
            content += `  ◦ *Biaya Admin:* ${res.result['Biaya Admin']}\n`;
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
