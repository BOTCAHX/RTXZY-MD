let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    let guide = `Format salah!\n\n*Cara penggunaan:*\n${usedPrefix + command} teks atas|teks bawah\n\n*Contoh:*\n${usedPrefix + command} Belajar|Main Game`;

    if (!text) throw guide;

    let [teks1, teks2] = text.split('|');

    if (!teks1 || !teks2) {
        throw guide;
    }

    try {
        await m.reply('⏳ _Sedang memproses gambar..._');

        let apiUrl = `https://api.botcahx.eu.org/api/maker/canvas-drakeMeme?apikey=${btc}&teks1=${encodeURIComponent(teks1.trim())}&teks2=${encodeURIComponent(teks2.trim())}`;

        await conn.sendFile(m.chat, apiUrl, 'drakememe.jpg', 'Done!', m);

    } catch (e) {
        console.log(e);
        throw eror;
    }
}

handler.help = ['drakememe <teks1|teks2>'];
handler.tags = ['maker'];
handler.command = /^(drakememe)$/i;
handler.limit = true;
handler.group = true;

export default handler;