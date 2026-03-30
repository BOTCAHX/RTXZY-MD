const axios = require('axios');

let handler = async (m, { conn, text, command }) => {
// kosong
};

handler.before = async (m, { conn }) => {
    try {
        if (!m.isGroup) return;
        conn.selfai = conn.selfai || {};
        if (m.isBaileys && m.fromMe) return;
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            const botNumber = conn.user.jid.split('@')[0];
            
            const isMention = m.mentionedJid.some(mentioned => 
                mentioned.includes(botNumber)
            );
            
            if (isMention) {
                const filter = m.text.replace(/@\d+/g, '').trim();
                
                if (filter.toLowerCase() === '/reset') {
                    delete conn.selfai[m.sender];
                    await m.reply('Session chat berhasil direset.');
                    return true;
                }
                
                // Jika mau ada fitur reset global sessions AI
                /**if (filter.toLowerCase() === '/resetall') {
                    conn.selfai = {};
                    await m.reply('Semua session chat berhasil direset.');
                    return true;
                }
                **/
                
                if (filter.toLowerCase().startsWith('/imagine')) {
                    const imagePrompt = filter.replace('/imagine', '').trim();
                    if (!imagePrompt) {
                        await m.reply('Silakan berikan deskripsi gambar yang ingin dibuat.');
                        return true;
                    }

                    try {
                        await conn.sendPresenceUpdate('composing', m.chat);
                        const response = await axios.get(`https://api.botcahx.eu.org/api/search/openai-image?apikey=${global.btc}&text=${encodeURIComponent(imagePrompt)}`, {
                            responseType: 'arraybuffer'
                        });
                        
                        const image = response.data;
                        await conn.sendFile(m.chat, image, 'aiimg.jpg', null, m);
                    } catch (error) {
                        console.error(error)
                        await m.reply('Terjadi kesalahan saat membuat gambar. Mohon coba lagi.');
                    }
                    return true;
                }

                await conn.sendPresenceUpdate('composing', m.chat);
                
                if (!filter) {
                    const empty_response = [
                        `Hi ${m.name}, how can I assist you today?`,
                        `Ada yang bisa saya bantu, ${m.name}?`,
                        `Hai ${m.name}, silakan beritahu saya apa yang Anda butuhkan.`,
                        `${m.name}, saya siap membantu. Ada pertanyaan?`,
                        `Apa yang ingin kamu diskusikan, ${m.name}?`
                    ];
                    
                    const _response_pattern = empty_response[Math.floor(Math.random() * empty_response.length)];
                    
                    await m.reply(_response_pattern);
                    return true;
                }

                if (!conn.selfai[m.sender]) {
                    conn.selfai[m.sender] = { sessionChat: [] };
                }
                
                if ([".", "#", "!", "/", "\\"].some(prefix => filter.startsWith(prefix))) return;
                
                const previousMessages = conn.selfai[m.sender].sessionChat || [];
                /**
                Custom Prompt bagian ini
                **/
                const messages = [
                    { role: "system", content: "kamu adalah BTCH, Seorang Asisten pribadi yang di buat oleh BOTCAHX yang siap membantu kapan pun!" },
                    { role: "assistant", content: `Saya BTCH, asisten pribadi yang siap membantu kamu kapan pun! Apa yang bisa saya bantu hari ini?` },
                    ...previousMessages.map((msg, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', content: msg })),
                    { role: "user", content: filter }
                ];
                
                try {
                    const chat = async function(message) {
                        return new Promise(async (resolve, reject) => {
                            try {
                                const params = {
                                    message: message,
                                    apikey: global.btc
                                };
                                const { data } = await axios.post('https://api.botcahx.eu.org/api/search/openai-custom-v2', params);
                                resolve(data);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    };
                    
                    let res = await chat(messages);
                    if (res && res.result) {
                        await m.reply(res.result);
                        conn.selfai[m.sender].sessionChat = [
                            ...conn.selfai[m.sender].sessionChat,
                            filter,
                            res.result
                        ];
                    } else {
                        m.reply("Kesalahan dalam mengambil data silahkan @mention /reset untuk mencoba percakapan baru.");
                    }
                } catch (e) {
                    console.error(e);
                    m.reply("Terjadi kesalahan dalam memproses permintaan.");
                }
                return true;
            }
        }
        return true;
    } catch (error) {
        console.error(error);
        return true;
    }
};

module.exports = handler;
