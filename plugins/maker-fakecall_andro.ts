import uploadImage from '../lib/uploadImage.ts';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || "";
        
        let guide = `Kirim gambar (atau balas gambar) dengan caption:\n\n*${usedPrefix + command} nama|durasi*\n\n*Catatan:*\nDurasi harus menggunakan format waktu (MM:SS) atau (HH:MM:SS)\n\n*Contoh:*\n${usedPrefix + command} Budi Santoso|00:42`;

        if (!text) throw `*❌ Teks isian tidak boleh kosong!*\n\n${guide}`;
        if (!mime) throw `*❌ Media tidak ditemukan!*\n\n${guide}`;
        if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`;

        let [nama, durasi] = text.split('|');

        if (!nama || !durasi) {
            throw `*❌ Format salah atau ada data yang kurang!*\n\nPastikan memisahkan teks menggunakan tanda \`|\`.\n\n${guide}`;
        }
        if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(durasi.trim())) {
            throw `*❌ Format durasi salah!*\n\nGunakan format waktu yang benar, contoh: 00:42 atau 12:30`;
        }

        await m.reply('⏳ _Sedang memproses gambar..._');

        let media = await q.download?.();
        if (!media) throw 'Gagal mengunduh gambar.';
        
        let link = await uploadImage(media);
        if (!link) throw 'Gagal mengunggah gambar ke server.';

        let apiUrl = `https://api.botcahx.eu.org/api/maker/canvas-fakeCallAndro?apikey=${btc}&durasi=${encodeURIComponent(durasi.trim())}&nama=${encodeURIComponent(nama.trim())}&url=${encodeURIComponent(link)}`;

        await conn.sendFile(m.chat, apiUrl, 'fakecall.jpg', 'Done!', m);

    } catch (e) {
        console.log(e);
        throw eror;
    }
}

handler.help = ['fakecall <nama|durasi>'];
handler.tags = ['maker'];
handler.command = /^(fakecall(andro)?)$/i;
handler.limit = true;
handler.group = true;

export default handler;