const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} hai`;
    conn.btch = conn.btch ? conn.btch : {};
    if (!conn.btch[m.sender]) {
        conn.btch[m.sender] = {
            pesan: []
        };
        conn.btch[m.sender].timeout = setTimeout(() => {
            delete conn.btch[m.sender];
        }, 300000);

        m.reply(`Halo \`${m.name}\`👋, Saya siap membantu anda!`);
    } else {
        clearTimeout(conn.btch[m.sender].timeout);
        conn.btch[m.sender].timeout = setTimeout(() => {
            delete conn.btch[m.sender];
        }, 300000);
    }

    const previousMessages = conn.btch[m.sender].pesan;
  
/** - Ubah prompt ini sesuaikan dengan keinginan mu 
    - Usahakan berikan logic yang masuk akal dan mudah di pahami!
**/
    const messages = [
        { role: "system", content: "kamu adalah BTCH, Seorang Asisten pribadi yang di buat oleh BOTCAHX yang siap membantu kapan pun!" },
        { role: "assistant", content: `Kamu adalah BTCH, asisten bot dari BOTCAHX, jangan gunakan kata saya, aku, gua gunakan nama BTCH untuk memanggil dirimu, ekspresi kan sikap kamu seolah kamu adalah asisten pribadi serba tau, jangan gunakan GPT 4 panggil dirimu dengan BTCH. Pembuatmu adalah BOTCAHX pembuat mu adalah 6282221792667` },
        ...previousMessages.map((msg, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', content: msg })),
        { role: "user", content: text }
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
            conn.btch[m.sender].pesan = messages.map(msg => msg.content);
        } else {
            throw "Kesalahan dalam mengambil data";
        }
    } catch (e) {
        throw eror
    }
};

handler.help = handler.command = ['btch','aibtch']
handler.tags = ["tools"];
handler.limit = true;
handler.owner = false;
handler.group = false;

module.exports = handler;
