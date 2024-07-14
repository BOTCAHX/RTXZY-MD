let fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.sessionAI = conn.sessionAI ? conn.sessionAI : {};

    if (!text) throw `🚩 ${usedPrefix + command} *enable/disable*`;

    if (text === "enable") {
        conn.sessionAI[m.sender] = { pesan: [] };
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
        const name = conn.getName(m.sender);
        const messages = [...conn.sessionAI[m.sender].pesan, `p`, m.text];
        try {                      
            const encodedText = encodeURIComponent(m.text);
            const data = await (await fetch(`https://api.botcahx.eu.org/api/search/openai-chat?text=${encodedText}&apikey=${btc}`)).json();
            await conn.sendMessage(m.chat, { text: data.message }, { quoted: m });
            conn.sessionAI[m.sender].pesan = messages;
        } catch (e) {
            throw eror;
        }
    }
};

handler.command = ['autoai'];
handler.tags = ['tools'];
handler.help = ['autoai'].map(a => a + ' *enable/disable*');

module.exports = handler;
