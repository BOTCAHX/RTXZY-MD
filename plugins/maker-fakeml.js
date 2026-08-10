import uploadImage from '../lib/uploadImage.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || "";
        
        let guide = `Kirim gambar (atau balas gambar) dengan caption:\n\n*${usedPrefix + command} username|rank|border*\n\n*Pilihan Rank:*\n- gm\n- epic\n- legend\n- mawi\n- honor\n- glory\n- imo\n\n*Pilihan Border:*\nAngka 1 sampai 16\n\n*Contoh:*\n${usedPrefix + command} MitoExe|gm|1`;

        if (!text) throw `*❌ Teks tidak boleh kosong!*\n\n${guide}`;
        if (!mime) throw `*❌ Media tidak ditemukan!*\n\n${guide}`;
        if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`;

        let [username, rank, border] = text.split('|');

        if (!username || !rank || !border) {
            throw `*❌ Format salah atau ada data yang kurang!*\n\nPastikan memisahkan teks menggunakan tanda \`|\`.\n\n${guide}`;
        }

        let validRanks = ['gm', 'epic', 'legend', 'mawi', 'honor', 'glory', 'imo'];
        if (!validRanks.includes(rank.trim().toLowerCase())) {
            throw `*❌ Rank tidak valid!*\n\nPilih salah satu rank berikut:\n${validRanks.join(', ')}`;
        }

        let borderNum = parseInt(border.trim());
        if (isNaN(borderNum) || borderNum < 1 || borderNum > 16) {
            throw `*❌ Border tidak valid!*\n\nMasukkan angka dari 1 sampai 16.`;
        }

        await m.reply('⏳ _Sedang memproses gambar..._');

        let media = await q.download?.();
        if (!media) throw 'Gagal mengunduh gambar.';
        
        let link = await uploadImage(media);
        if (!link) throw 'Gagal mengunggah gambar ke server.';

        let apiUrl = `https://api.botcahx.eu.org/api/maker/canvas-fakeMl?apikey=${btc}&avatar=${encodeURIComponent(link)}&border=${borderNum}&rank=${encodeURIComponent(rank.trim().toLowerCase())}&username=${encodeURIComponent(username.trim())}`;

        await conn.sendFile(m.chat, apiUrl, 'fakeml.jpg', 'Done!', m);

    } catch (e) {
        console.log(e);
        throw eror;
    }
}

handler.help = ['fakeml <username|rank|border>'];
handler.tags = ['maker'];
handler.command = /^(fakeml)$/i;
handler.limit = true;
handler.group = true;

export default handler;
