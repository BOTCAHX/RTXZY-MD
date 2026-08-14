import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, usedPrefix, text, command }) => {
    if (!text) throw `Example: \`${usedPrefix + command} kadita\``

    try {
        m.reply(wait);
        const res = await (await fetch(`https://api.botcahx.eu.org/api/search/heroml?hero=${encodeURIComponent(text)}&apikey=${btc}`)).json();
        const hero = res.result;
        let content = `*🎮 Mobile Legends Hero: ${hero.name || text} 🎮*\n\n`;

        const bInfo = [
            ['📌 Title', hero.title],
            ['🛡️ Role', hero.role],
            ['🎯 Specialty', hero.specialty],
            ['🛤️ Lane', hero.lane],
            ['💰 Price', hero.price],
            ['🚻 Gender', hero.gender],
            ['🌍 Origin', hero.origin],
            ['🆔 Internal Name', hero.internalName],
            ['📅 Release Date', hero.releaseDate],
            ['🔮 Resource', hero.resource],
            ['🪄 Damage Type', hero.damageType],
            ['🏹 Basic Attack', hero.basicAttack]
        ];
        content += bInfo.map(([label, value]) => `${label}: ${value || 'N/A'}`).join('\n') + '\n\n';

        content += `*🔢 Hero Number:*\n`;
        const heroNumber = hero.heroNumber || {};
        content += ['Previous', 'Current', 'Next'].map(key => 
            `  ◦ ${key}: ${heroNumber[key.toLowerCase()] || 'N/A'}`).join('\n') + '\n\n';
        content += `*📊 Ratings:*\n`;
        const ratings = hero.ratings || {};
        content += ['Durability', 'Offense', 'Control Effect', 'Difficulty'].map(key => 
            `  ◦ ${key}: ${ratings[key.toLowerCase()] || 0}/10`).join('\n') + '\n\n';

        content += `*🎙️ Voice Actor:*\n`;
        content += `  ◦ Japanese: ${hero.voiceActor?.japanese || 'N/A'}\n`;
        const englishVoice = hero.story?.match(/English\n\s*([^\n]+)/)?.[1] || 'N/A';
        content += `  ◦ English: ${englishVoice}\n\n`;

        content += `*🤝 Relationships:*\n`;
        content += Array.isArray(hero.relationships) && hero.relationships.length > 0 
            ? hero.relationships.map(r => `  ◦ ${r}`).join('\n') 
            : '  ◦ None\n';
        content += '\n';

        content += `*📈 Stats (Level 1 => Level 15):*\n`;
        const stats = hero.stats || {};
        const statFields = [
            ['HP', 'HP'],
            ['HP Regen', 'HP Regen'],
            ['Mana', 'Mana'],
            ['Mana Regen', 'Mana Regen'],
            ['Physical Attack', 'Physical Attack'],
            ['Magic Power', 'Magic Power', 'value'],
            ['Physical Defense', 'Physical Defense(Physical Damage Reduced)'],
            ['Magic Defense', 'Magic Defense(Magic Damage Reduced)'],
            ['Attack Speed', 'Attack Speed'],
            ['Attack Speed Ratio', 'Attack Speed Ratio', 'value'],
            ['Critical Damage', 'Critical Damage', 'value'],
            ['Movement Speed', 'Movement Speed', 'value'],
            ['Basic Attack Range', 'Basic Attack Range', 'value']
        ];
        content += statFields.map(([label, key, valueType = 'level']) => {
            const stat = stats[key] || {};
            return valueType === 'level'
                ? `  ◦ ${label}: ${stat.level1 || 'N/A'} => ${stat.level15 || 'N/A'}`
                : `  ◦ ${label}: ${stat.value || 'N/A'}`;
        }).join('\n') + '\n\n';

        content += `*🪄 Abilities:*\n`;
        content += Array.isArray(hero.abilities) && hero.abilities.length > 0
            ? hero.abilities.map(item => 
                `  ◦ ${item.name || 'Unknown'}: ${item.description || 'No description available'}`)
                .join('\n')
            : '  ◦ No abilities available\n';
        content += '\n\n';

        const cleanText = (text) => {
            if (!text) return 'N/A';
            return text
                .replace(/\\n/g, ' ')
                .replace(/[\n\t]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        };
        content += `*📖 Lore:*\n${cleanText(hero.lore)}\n\n`;
        content += `*📜 Story:*\n${cleanText(hero.story)}\n\n`;

        const imageUrl = hero.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLClzmCZRv9Ly5D-xaVy16Ph4VvI0-fP-hAWGSlcB2q5PzSLcwav9TBZc&s=10';
        await conn.sendFile(m.chat, imageUrl, 'heroml.jpg', content, m);

    } catch (error) {
      throw eror
    }
};

handler.command = /^heroml$/i;
handler.tags = ['internet'];
handler.help = ['heroml <hero_name>'];
handler.limit = true;

export default handler;
