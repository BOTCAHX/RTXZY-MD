import fetch from 'node-fetch';

let handler: WaPlugin = async (m, {
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `*Example:* ${usedPrefix + command} <token>`;
    m.reply(wait)
    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/tools/2fa?token=${encodeURIComponent(text)}&apikey=${btc}`)).json();
        let content = `*2FA Verification Result*\n\n`;

        if (res.status && res.result) {
            content += `  ◦ *Token:* ${res.result.token}\n`;
        } else {
            content += 'Token gagal didapatkan!.';
        }
        await m.reply(content);
    } catch (error) {
        throw eror
    }
};

handler.command = handler.help = ['2fa', 'authenticator', 'autentikator'];
handler.tags = ['tools'];
handler.limit = true;
export default handler;
