import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} Oppo A5S|OPPO A3S`;
    
    let [phone1, phone2] = text.split('|').map(item => item.trim());
    if (!phone1 || !phone2) throw `*Example:* ${usedPrefix + command} Oppo A5S|OPPO A3S`;
    
    try {
        await m.reply(wait);
        let json = await fetch(`https://api.botcahx.eu.org/api/tools/compare-phone?hp1=${encodeURIComponent(phone1)}&hp2=${encodeURIComponent(phone2)}&apikey=${btc}`).then(res => res.json());
        let res = json.result;
        
        let caption = `⦿  *C O M P A R E - P H O N E*\n\n`;
        caption += `	◦  *Phone 1* : ${res.phone1.title || 'N/A'}\n`;
        caption += `	◦  *Phone 2* : ${res.phone2.title || 'N/A'}\n\n`;
        
        let sections = res.sections || [];
        sections.forEach(section => {
            if (section.rows && section.rows.length > 0) {
                let hasValidData = section.rows.some(row => row.value1 || row.value2);
                if (hasValidData && section.section !== 'UMUM') {
                    caption += `	⭔ *${section.section}*\n`;
                    section.rows.forEach(row => {
                        if (row.label) {
                            caption += `	◦  *${row.label}*\n`;
                            caption += `	   📱 ${res.phone1.title}: ${row.value1 || '-'}\n`;
                            caption += `	   📱 ${res.phone2.title}: ${row.value2 || '-'}\n\n`;
                        }
                    });
                }
            }
        });
        
        caption += `\n🔍 *Source* : carisinyal.com`;
        
        await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender] }, { quoted: m });
        
    } catch (e) {
        console.log(e);
        throw eror;
    }
};

handler.help = ['comparephone <phone1|phone2>'];
handler.tags = ['tools'];
handler.command = /^(comparephone|comparehp|cp)$/i;
handler.limit = true;

export default handler;
