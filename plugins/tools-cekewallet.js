let fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    const ewalletList = ["gopay", "ovo", "shopeepay", "dana"];

    if (!text) {
        let list = ewalletList.map(e => `• ${e}`).join('\n');
        throw `*Format Penggunaan:*\n${usedPrefix + command} nomor|ewallet\n${usedPrefix + command} ewallet|nomor\n\n*Contoh:*\n${usedPrefix + command} 08123456789|dana\n${usedPrefix + command} ovo|08123456789\n\nE-Wallet tersedia:\n${list}`;
    }

    let [part1, part2] = text.split('|').map(v => v.trim());
    if (!part1 || !part2) throw `Format salah! Gunakan: nomor|ewallet atau ewallet|nomor\nContoh: 082xxx|dana`;

    let wallet, nomor;

    if (ewalletList.includes(part1.toLowerCase())) {
        wallet = part1.toLowerCase();
        nomor = part2.replace(/\D/g, '');
    } else if (ewalletList.includes(part2.toLowerCase())) {
        wallet = part2.toLowerCase();
        nomor = part1.replace(/\D/g, '');
    } else {
        throw `E-wallet tidak dikenali!\nTersedia: ${ewalletList.join(', ')}\n\nPastikan format: nomor|ewallet`;
    }

    if (!nomor || nomor.length < 8) throw `Nomor tidak valid!\nContoh: 08123456789`;

    m.reply(wait);

    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/tools/cek-ewallet?wallet=${wallet}&nomer=${nomor}&apikey=${btc}`)).json();

        let caption = `*CEK E-WALLET ${wallet.toUpperCase()}*\n\n`;

        if (res.status && res.result && res.result.success) {
            let data = res.result.data?.customer_info?.result || '-';
            let nama = data.includes('Nama Akun') ? data : 'Nama tidak terdeteksi';

            caption += `◦ *Provider:* ${res.result.provider || wallet.toUpperCase()}\n`;
            caption += `◦ *Nomor:* ${res.result.phoneNumber || nomor}\n`;
            caption += `◦ *Nama:* ${nama}\n`;
            caption += `◦ *Status:* ${res.result.statusCode === 200 ? 'Berhasil' : 'Gagal'}\n`;
        } else {
            caption += 'Data tidak ditemukan atau nomor tidak terdaftar di e-wallet tersebut.';
        }

        caption += `\n\nDibuat pada: ${res.result?.timestamp ? new Date(res.result.timestamp).toLocaleString('id-ID') : '-'}`;

        await m.reply(caption);
    } catch (e) {
        console.error(e);
        throw eror;
    }
};

handler.help = ['cekewallet'].map(v => v + ' nomor|ewallet');
handler.tags = ['tools'];
handler.command = /^(cekewallet|cekwallet|saldoewallet)$/i;
handler.limit = true;

module.exports = handler;
