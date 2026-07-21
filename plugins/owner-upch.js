/* tutorial https://youtu.be/O1CoP5bpssA?si=3H7Ly7jp2luTuHoQ*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!global.idchannel || !Array.isArray(global.idchannel) || global.idchannel.length === 0) {
            return m.reply('[❗] Gagal: global.idchannel belum diatur atau kosong di config.js!');
        }

        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        if (mime) {
            return m.reply('[❗] Maaf, pengiriman media (gambar/video) ke Channel belum didukung. Harap kirim *Teks Saja*.');
        }

        let teks = text 
            ? text 
            : (m.quoted && m.quoted.text) 
            ? m.quoted.text 
            : '';

        if (!teks) {
            let panduan = `Harap masukkan teks yang ingin dikirim ke channel!\n\n` +
                          `*Contoh Penggunaan:*\n${usedPrefix + command} Halo semua, ada update terbaru nih!\n\n` +
                          `_(Atau kamu bisa mereply pesan teks orang lain dengan perintah ${usedPrefix + command})_`;
            return m.reply(panduan);
        }

        m.reply('Sedang mengirim teks ke channel, tunggu sebentar...');

        let targetChannels = global.idchannel.slice(0, 3);
        let successCount = 0;

        for (let jid of targetChannels) {
            try {
                await conn.sendMessage(jid, { text: teks.trim() });
                successCount++; 
            } catch (err) {
                console.error(`[❗] Gagal mengirim ke channel ${jid}:`, err);
            }
        }

        if (successCount === 0) {
            return m.reply('[❗] Gagal mengirim pesan ke semua channel. Pastikan bot masih menjadi admin.');
        }

        return m.reply(`Sukses mengirim pengumuman ke ${successCount} channel!`);

    } catch (e) {
        console.error('Error send to channel:', e);
        m.reply('[❗] Terjadi kesalahan sistem saat mencoba mengirim pesan.');
    }
};

handler.command = /^(upch)$/i; 
handler.owner = true; 
handler.group = true;

module.exports = handler;