let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        throw `Masukkan nominal saldo yang diinginkan!\n\n*Contoh:*\n${usedPrefix + command} 1000000`;
    }

    if (!/^\d+$/.test(text.trim())) {
        throw `*❌ Format salah!*\n\nHanya masukkan angka tanpa titik, koma, atau simbol lainnya.\n\n*Contoh yang benar:*\n${usedPrefix + command} 1000000`;
    }

    try {
        await m.reply('⏳ _Sedang membuat gambar saldo OVO..._');
        let apiUrl = `https://api.botcahx.eu.org/api/maker/canvas-fakeOvo?amount=${encodeURIComponent(text.trim())}&apikey=${btc}`;
        await conn.sendFile(m.chat, apiUrl, 'fakeovo.jpg', 'Done!', m);
    } catch (e) {
        console.log(e);
        throw eror;
    }
};

handler.help = ['fakeovo <nominal>'];
handler.tags = ['maker'];
handler.command = /^(fakeovo)$/i;
handler.limit = true;

export default handler;