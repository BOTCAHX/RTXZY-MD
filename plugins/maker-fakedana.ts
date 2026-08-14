let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        throw `Masukkan nominal saldo yang diinginkan!\n\n*Contoh:*\n${usedPrefix + command} 5000000`;
    }
    if (!/^\d+$/.test(text.trim())) {
        throw `*❌ Format salah!*\n\nHanya masukkan angka tanpa titik, koma, atau simbol lainnya.\n\n*Contoh yang benar:*\n${usedPrefix + command} 5000000`;
    }

    try {
        await m.reply('⏳ _Sedang membuat gambar saldo DANA..._');
        let apiUrl = `https://api.botcahx.eu.org/api/maker/canvas-fakeSaldoDana?apikey=${btc}&saldo=${encodeURIComponent(text.trim())}`;
        await conn.sendFile(m.chat, apiUrl, 'fakedana.jpg', 'Done!', m);
        
    } catch (e) {
        console.log(e);
        throw eror;
    }
};  

handler.help = ['fakedana <nominal>'];
handler.tags = ['maker'];
handler.command = /^(fakedana)$/i;
handler.limit = true;
handler.group = true;
export default handler;