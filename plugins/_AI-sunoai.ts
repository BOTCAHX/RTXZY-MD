import axios from 'axios';

let handler: WaPlugin = async (m, { conn, text, args, usedPrefix, command }) => {
    let [title, style, ...lyricsArr] = text.split('|').map(s => s.trim());
    let lyrics = lyricsArr.join('|');

    if (!title || !style || !lyrics)
        return m.reply(`Contoh penggunaan:\n${usedPrefix + command} Judul Lagu | Style Musik | Lirik\n\nContoh:\n${usedPrefix + command} Sahabat | Chinese song, donghua sound, female singing | kembalilah untuk bersama...`);

    await m.reply('⏳ Membuat lagu, mohon tunggu...\n*Pembuatan lagu bisa lebih dari 2-5 menit*');

    try {
        const result = await generateMusic(
            title,
            style,
            lyrics,
        );

        if (!result?.data || !result.data.length) {
            throw '❌ Gagal mendapatkan audio.';
        }

        let listInfo = result.data.map((item, i) => {
            return `🎵 *Audio ${i + 1}*\n*Judul:* ${item.title}\n*Style:* ${item.tags}\n*Audio URL:* ${item.audio_url}`;
        }).join('\n\n');

        await m.reply(`✅ Berikut semua hasil yang tersedia:\n\n${listInfo}`);

        for (let i = 0; i < result.data.length; i++) {
            const audioItem = result.data[i];
            const audioBuffer = await axios.get(audioItem.audio_url, {
                responseType: 'arraybuffer'
            }).then(res => res.data);

            await conn.sendMessage(m.chat, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                fileName: `${audioItem.title}_${i + 1}.mp3`,
                ptt: false
            }, { quoted: m });
        }

    } catch (e) {
        console.error(e);
        m.reply('❌ Gagal membuat lagu');
    }
};

handler.command = handler.help = ['aimusic', 'musicgen', 'sunoai'];
handler.tags = ['ai'];
handler.limit = true;

export default handler;

async function generateMusic(title, style, lyrics) {
    const payload = {
        title,
        style,
        lyrics,
        aksesKey: aksesKey
    };

    const { data } = await axios.post('https://api.botcahx.eu.org/api/maker/aimusic', payload);

    let status = 'pending';
    let result = null;
    while (status === 'pending') {
        await new Promise(r => setTimeout(r, 10000));
        const { data: statusData } = await axios.get('https://api.botcahx.eu.org/api/maker/aimusic/status', {
            params: { jobId: data.jobId }
        });
        status = statusData.status;
        result = statusData.result;
        if (status === 'error') {
            return { error: statusData.error };
        }
        if (status === 'done') {
            return result;
        }
    }
}
