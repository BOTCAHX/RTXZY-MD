import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { usedPrefix, command, text }) => {
    try {
        if (command === 'growgarden' && !text) {
            m.reply(`Please specify a subcommand: \`stock\` or \`weather\`\nExample: \`${usedPrefix + command} stock\` or \`${usedPrefix + command} weather\``);
            return;
        }
        m.reply(wait);
        if (text.toLowerCase() === 'stock') {
            let res = await (await fetch(`https://api.botcahx.eu.org/api/webzone/grow-and-garden-stock?apikey=${btc}`)).json();
            let content = `*🌱 G R O W  &  G A R D E N  S T O C K S 🌱*\n\n`;

            if (res.status && res.result) {
                content += `*🌾 Seeds Stocks:*\n`;
                res.result.seeds.items.forEach(item => {
                    content += `  ◦ ${item}\n`;
                });
                content += `  *Last Update*: ${res.result.seeds.lastUpdate}\n`;

                content += `\n*🛠️ Gear Stocks:*\n`;
                res.result.gears.items.forEach(item => {
                    content += `  ◦ ${item}\n`;
                });
                content += `  *Last Update*: ${res.result.gears.lastUpdate}\n`;

                content += `\n*🥚 Egg Stocks:*\n`;
                res.result.eggs.items.forEach(item => {
                    content += `  ◦ ${item}\n`;
                });
                content += `  *Last Update*: ${res.result.eggs.lastUpdate}\n`;

                content += `\n*🎨 Cosmetic Stocks:*\n`;
                res.result.cosmetic.items.forEach(item => {
                    content += `  ◦ ${item}\n`;
                });
                content += `  *Last Update*: ${res.result.cosmetic.lastUpdate}\n`;

                content += `\n*☀️ Summer Stocks:*\n`;
                res.result.summer.items.forEach(item => {
                    content += `  ◦ ${item}\n`;
                });
                content += `  *Last Update*: ${res.result.summer.lastUpdate}\n`;

                content += `\n*🛒 Merchant Stocks:*\n`;
                res.result.merchant.items.forEach(item => {
                    content += `  ◦ ${item}\n`;
                });
                content += `  *Last Update*: ${res.result.merchant.lastUpdate}\n`;
            } else {
                content += 'Data stok tidak ditemukan.';
            }
            await m.reply(content);
        } else if (text.toLowerCase() === 'weather') {
            let res = await (await fetch(`https://api.botcahx.eu.org/api/webzone/grow-and-garden-weather?apikey=${btc}`)).json();
            let content = `*🌦️ G R O W  &  G A R D E N  W E A T H E R 🌦️*\n\n`;

            if (res.status && res.result) {
                content += `📌 *Current Weather*:\n${res.result.result}\n`;
                content += `⏰ *Ends*: ${res.result.endsStatus}\n`;
                content += `📅 *Last Update*: ${res.result.lastUpdate}\n\n`;
                
                content += `*📜 Weather History:*\n`;
                res.result.history.forEach(item => {
                    content += `  ◦ ${item.description}\n`;
                    content += `    *Ends*: ${item.endsStatus}\n`;
                    content += `    *Time*: ${item.time}\n\n`;
                });
            } else {
                content += 'Data cuaca tidak ditemukan.';
            }
            await m.reply(content);
        } else {
            m.reply(`Please specify a subcommand: \`stock\` or \`weather\`\nExample: \`${usedPrefix + command} stock\` or \`${usedPrefix + command} weather\``);
            return;
        }
    } catch (error) {
        throw eror
    }
};

handler.command = ['growgarden'];
handler.tags = ['internet'];
handler.limit = true;
export default handler;
