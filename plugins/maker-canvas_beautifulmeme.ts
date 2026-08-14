import uploadImage from '../lib/uploadImage.ts';

let handler: WaPlugin = async (m, { conn }) => {
    conn.beautifulMeme = conn.beautifulMeme ? conn.beautifulMeme : {};
    let id = m.chat;

    if (id in conn.beautifulMeme) {
        return m.reply('Selesaikan proses sebelumnya terlebih dahulu atau tunggu hingga waktu habis.');
    }

    conn.beautifulMeme[id] = {
        images: [],
        timeout: setTimeout(() => {
            if (conn.beautifulMeme && conn.beautifulMeme[id]) {
                conn.reply(m.chat, 'Waktu habis! Sesi dibatalkan karena tidak ada 2 gambar yang dikirim.', m);
                delete conn.beautifulMeme[id];
            }
        }, 20000)
    };

    m.reply('Silakan kirim 2 gambar sekarang secara bersamaan atau berurutan. (Waktu 20 detik)');
};

handler.before = async (m, { conn }) => {
    conn.beautifulMeme = conn.beautifulMeme ? conn.beautifulMeme : {};
    let id = m.chat;

    if (!(id in conn.beautifulMeme)) return;
    if (m.isZapo) return;

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (!/image\/(png|jpe?g)/.test(mime)) return;

    try {
        let media = await q.download();
        let link = await uploadImage(media);
        
        conn.beautifulMeme[id].images.push(link);

        if (conn.beautifulMeme[id].images.length === 2) {
            clearTimeout(conn.beautifulMeme[id].timeout);
            
            let img1 = conn.beautifulMeme[id].images[0];
            let img2 = conn.beautifulMeme[id].images[1];
            delete conn.beautifulMeme[id];
            
            let apiUrl = `https://api.botcahx.eu.org/api/maker/canvas-beautifulMeme?apikey=${btc}&image1=${encodeURIComponent(img1)}&image2=${encodeURIComponent(img2)}`;
            
            await conn.sendFile(m.chat, apiUrl, 'meme.jpg', 'Done!', m);
        } else {
            m.reply('1 gambar berhasil diterima, silakan kirim 1 gambar lagi.');
        }
    } catch (e) {
        console.log(e);
        throw eror;
    }
};

handler.help = ['beautifulmeme'];
handler.tags = ['maker'];
handler.command = /^(beautifulmeme)$/i;
handler.limit = true;

export default handler;