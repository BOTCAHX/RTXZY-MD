const axios = require('axios');
const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.sessionAI = conn.sessionAI ? conn.sessionAI : {};

    if (!text) throw `🚩 ${usedPrefix + command} *enable/disable*`;

    if (text === "enable") {
        conn.sessionAI[m.sender] = { sessionChat: [] };
        m.reply("Success create sessions chat!");
    } else if (text === "disable") {
        delete conn.sessionAI[m.sender];
        m.reply("Success delete sessions chat!");
    }
};

handler.before = async (m, { conn }) => {
    conn.sessionAI = conn.sessionAI ? conn.sessionAI : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.sessionAI[m.sender]) return;
    if ([".", "#", "!", "/", "\\"].some(prefix => m.text.startsWith(prefix))) return;

    if (conn.sessionAI[m.sender] && m.text) {    
        const previousMessages = conn.sessionAI[m.sender].sessionChat || [];
        let name = conn.getName(m.sender);
        
        /** - Ubah prompt ini sesuaikan dengan keinginan mu 
         - Usahakan berikan logic yang masuk akal dan mudah di pahami!
        **/
        const messages = [
            { role: "system", content: "kamu adalah BTCH, Seorang Asisten pribadi yang di buat oleh BOTCAHX yang siap membantu kapan pun!" },
            { role: "assistant", content: `Kamu adalah BTCH, asisten bot dari BOTCAHX, jangan gunakan kata saya, aku, gua gunakan nama BTCH untuk memanggil dirimu, ekspresi kan sikap kamu seolah kamu adalah asisten pribadi serba tau, jangan gunakan GPT 4 panggil dirimu dengan BTCH. Pembuatmu adalah BOTCAHX pembuat mu adalah 6282221792667` },
            ...previousMessages.map((msg, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', content: msg })),
            { role: "user", content: m.text }
        ];

        try {
            const chat = async function(message) {
                return new Promise(async (resolve, reject) => {
                    try {
                        const params = {
                            message: message,
                            apikey: btc
                        };
                        const { data } = await axios.post('https://api.botcahx.eu.org/api/search/openai-custom', params);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            let res = await chat(messages);
            if (res && res.result) {
                await m.reply(res.result);
                conn.sessionAI[m.sender].sessionChat = messages.map(msg => msg.content);
            } else {
                m.reply("Kesalahan dalam mengambil data");
            }
        } catch (e) {
            throw eror
        }
    }
};

handler.command = ['autoai'];
handler.tags = ['tools'];
handler.help = ['autoai'].map(a => a + ' *enable/disable*');

module.exports = handler;
