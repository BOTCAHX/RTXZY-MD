let fetch = require('node-fetch');

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
            content += `  ◦ *Tanggal:* ${res.result.date}\n`;
            content += `  ◦ *Waktu:* ${res.result.time}\n`;
            content += `  ◦ *Nama*: ${res.result.name}\n\n`;

            if (res.result.isINQ) {
                content += `  ◦ *ID Pelanggan:* ${text}\n`;
                content += `  ◦ *Pesan Tambahan:* ${res.result.addMsg}\n`;
                content += `  ◦ *Tarif/Daya:* ${res.result.tarif_daya}\n\n`;

                content += `*Tagihan Bulanan:*\n`;
                res.result.loop.forEach(item => {
                    content += `  ◦ - ${item}\n`;
                });
                content += `\n`;

                content += `  ◦ - Bulan Tagihan: ${res.result.blTh}\n`;
                content += `  ◦ - Stand Meter: ${res.result.standMeter}\n\n`;

                content += `*Rincian Pembayaran:*\n`;
                content += `  ◦ - Tagihan: Rp ${res.result.rpTag}\n`;
                content += `  ◦ - Admin Bank: Rp ${res.result.adminBank}\n`;
                content += `  ◦ - Total: Rp ${res.result.tagihan}\n\n`;

                content += `*Pembayaran:*\n`;
                content += `  ◦ - Bayar: Rp ${res.result.bayar}\n`;
                content += `  ◦ - Non-Subsidi: Rp ${res.result.nonSubsidi}\n`;
                content += `  ◦ - Cashback: Rp ${res.result.cashback}\n`;
                content += `  ◦ - Diskon: Rp ${res.result.discountText}\n\n`;

                content += `*Tunggakan:* ${res.result.tunggakan ? 'Ada' : 'Tidak Ada'}\n\n`;

                content += `*Outlet:*\n`;
                content += `  ◦ - ID Outlet: ${res.result.outletData.id_outlet}\n`;
                content += `  ◦ - Nama Pemilik: ${res.result.outletData.nama_pemilik}\n`;
                content += `  ◦ - No. Telepon Pemilik: ${res.result.outletData.notelp_pemilik}\n`;
                content += `  ◦ - Email Pemilik: ${res.result.outletData.email}\n\n`;

                content += `${res.result.footer1}\n`;
                content += `${res.result.footer2}\n`;
            } else {
                content += 'Data tagihan tidak ditemukan.';
            }
        } else {
            content += 'Gagal mengambil data.';
        }
        await m.reply(content);
    } catch (error) {
      throw eror
    }
  };
handler.command = handler.help = ['cekbillpln','tagihanpln','pln'];
handler.tags = ['tools'];
handler.limit = true
module.exports = handler;
