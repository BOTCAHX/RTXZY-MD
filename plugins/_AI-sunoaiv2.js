const axios = require('axios');

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    let [prompt, duration] = text.split('|').map(s => s.trim());

    if (!prompt || !duration)
        return m.reply(`Contoh penggunaan:\n${usedPrefix + command} Kisah cinta di bawah bulan purnama | 60\n\nKeterangan:\n- Prompt: deskripsi atau lirik lagu\n- Duration: durasi lagu dalam detik`);

    await m.reply('⏳ Membuat lagu, mohon tunggu...\n*Pembuatan lagu bisa memakan waktu 2-5 menit*');

    try {
        const result = await generateMusic(prompt, duration);

        if (!result?.audioData || !result.audioData.length) throw '❌ Gagal mendapatkan audio.';

        let listInfo = result.audioData.map((item, i) => {
            return `🎵 *Audio ${i + 1}*\n*Judul:* ${item.songName}\n*Duration:* ${item.duration.toFixed(2)} detik\n*Audio URL:* ${item.audioUrl}`;
        }).join('\n\n');

        await m.reply(`✅ Berikut semua hasil yang tersedia:\n\n${listInfo}\n\nAlbum Art: ${result.albumArt || 'Tidak tersedia'}`);

        for (let i = 0; i < result.audioData.length; i++) {
            const audioItem = result.audioData[i];
            const audioBuffer = await axios.get(audioItem.audioUrl, { responseType: 'arraybuffer' }).then(res => res.data);

            await conn.sendMessage(m.chat, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                fileName: `${audioItem.songName.replace(/[^a-zA-Z0-9]/g, '_')}_${i + 1}.mp3`,
                ptt: false
            }, { quoted: m });
        }

    } catch (e) {
        console.error(e);
        m.reply('❌ Gagal membuat lagu');
    }
};

handler.command = handler.help = ['aimusicv2', 'musicgenv2', 'sunoaiv2'];
handler.tags = ['ai'];
handler.limit = true;

module.exports = handler;

async function generateMusic(prompt, duration) {
    const payload = {
        prompt,
        duration,
        aksesKey: global.aksesKey
    };

    const { data } = await axios.post('https://api.botcahx.eu.org/api/maker/aimusicv2', payload);

    let status = 'pending';
    let result = null;

    while (status === 'pending') {
        await new Promise(r => setTimeout(r, 10000));
        const { data: statusData } = await axios.get('https://api.botcahx.eu.org/api/maker/aimusicv2/status', {
            params: { jobId: data.jobId }
        });

        status = statusData.status;
        result = statusData.result;

        if (status === 'error') return { error: statusData.error };
        if (status === 'done') return result;
    }
}