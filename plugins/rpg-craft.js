let handler = async (m, { conn, command, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase();
    let _type = (args[0] || '').toLowerCase();
    let user = global.db.data.users[m.sender];

    let caption = `*B L A C K S M I T H*

> *L I S T - C R A F T*
*[ ⛏️ ]* • Pickaxe 
*[ ⚔️ ]* • Sword 
*[ 🎣 ]* • Fishingrod 
*[ 🥼 ]* • Armor 
*[ 🦯 ]* • Katana 
*[ 🪓 ]* • Axe 
*[ 🏹 ]* • Bow 
*[ 🔪 ]* • Pisau 

> *R E C E I P T*
*[ ⛏️ ]* • _Pickaxe_
• _10_ || *Kayu*
• _5_ || *Batu*
• _5_ || *Iron*
• _20_ || *String*

*[ 🪓 ]* • _Axe_
• _15_ || *Kayu*
• _10_ || *Batu*
• _15_ || *Iron*
• _10_ || *String*

*[ ⚔️ ]* • _Sword_
• _10_ || *Kayu*
• _15_ || *Iron*

*[ 🔪 ]* • _Pisau_
• _15_ || *Kayu*
• _20_ || *Iron*

*[ 🏹 ]* • _Bow_
• _10_ || *Kayu*
• _5_ || *Iron*
• _10_ || *String*

*[ 🎣 ]* • _Fishingrod_
• _10_ || *Kayu*
• _2_ || *Iron*
• _20_ || *String*

*[ 🥼 ]* • _Armor_
• _5_ || *Iron*
• _1_ || *Diamond*

*[ 🦯 ]* • _Katana_
• _10_ || *Kayu*
• _15_ || *Iron*
• _5_ || *Diamond*
• _3_ || *Emerald*

> *H O W - C R A F T*
• _Example_ :
.craft _sword_
`.trim();

    try {
        if (/craft|Crafting|blacksmith/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
            switch (type) {
                case 'pickaxe':
                    if (user.pickaxe > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.batu < 5 || user.kayu < 10 || user.iron < 5 || user.string < 20) return m.reply(`Barang tidak cukup!\nUntuk membuat pickaxe. Kamu memerlukan : ${user.kayu < 10 ? `\n${10 - user.kayu} kayu🪵` : ''} ${user.iron < 5 ? `\n${5 - user.iron} iron⛓` : ''}${user.string < 20 ? `\n${20 - user.string} String🕸️` : ''}${user.batu < 5 ? `\n${5 - user.batu} Batu 🪨` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 5;
                    user.batu -= 5;
                    user.string -= 20;
                    user.pickaxe += 1;
                    user.pickaxedurability = 40;
                    m.reply("Sukses membuat 1 pickaxe 🔨");
                    break;                  
                case 'sword':
                    if (user.sword > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.kayu < 10 || user.iron < 15) return m.reply(`Barang tidak cukup!\nUntuk membuat sword. Kamu memerlukan :${user.kayu < 10 ? `\n${10 - user.kayu} kayu🪵` : ''}${user.iron < 15 ? `\n${15 - user.iron} iron⛓️` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 15;
                    user.sword += 1;
                    user.sworddurability = 40;
                    m.reply("Sukses membuat 1 sword 🗡️");
                    break;
                    case 'pisau':
                    if (user.pisau > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.kayu < 15 || user.iron < 20) return m.reply(`Barang tidak cukup!\nUntuk membuat pisau. Kamu memerlukan :${user.kayu < 15 ? `\n${15 - user.kayu} kayu🪵` : ''}${user.iron < 20 ? `\n${20 - user.iron} iron⛓️` : ''}`);
                    user.kayu -= 15;
                    user.iron -= 20;
                    user.pisau += 1;
                    user.pisaudurability = 40;
                    m.reply("Sukses membuat 1 pisau 🔪");
                    break;
                    case 'axe':
                    if (user.axe > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.batu < 10 || user.kayu < 15 || user.iron < 15 || user.string < 10) return m.reply(`Barang tidak cukup!\nUntuk membuat axe. Kamu memerlukan : ${user.kayu < 10 ? `\n${10 - user.kayu} kayu🪵` : ''} ${user.iron < 5 ? `\n${5 - user.iron} iron⛓` : ''}${user.string < 20 ? `\n${20 - user.string} String🕸️` : ''}${user.batu < 5 ? `\n${5 - user.batu} Batu 🪨` : ''}`);
                    user.kayu -= 15;
                    user.iron -= 15;
                    user.batu -= 10;
                    user.string -= 10;
                    user.axe += 1;
                    user.axedurability = 40;
                    m.reply("Sukses membuat 1 axe 🪓");
                    break;
                case 'fishingrod':
                    if (user.fishingrod > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.kayu < 20 || user.iron < 5 || user.string < 20) return m.reply(`Barang tidak cukup!\nUntuk membuat pancingan. Kamu memerlukan :${user.kayu < 20 ? `\n${20 - user.kayu} kayu🪵` : ''}${user.iron < 5 ? `\n${5 - user.iron} iron⛓` : ''}${user.string < 20 ? `\n${20 - user.string} String🕸️` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 2;
                    user.string -= 20;
                    user.fishingrod += 1;
                    user.fishingroddurability = 40;
                    m.reply("Sukses membuat 1 Pancingan 🎣");
                    break;
                    case 'bow':
                    if (user.bow > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.kayu < 10 || user.iron < 5 || user.string < 10) return m.reply(`Barang tidak cukup!\nUntuk membuat bow. Kamu memerlukan :${user.kayu < 20 ? `\n${20 - user.kayu} kayu🪵` : ''}${user.iron < 5 ? `\n${5 - user.iron} iron⛓` : ''}${user.string < 20 ? `\n${20 - user.string} String🕸️` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 5;
                    user.string -= 10;
                    user.bow += 1;
                    user.bowdurability = 40;
                    m.reply("Sukses membuat 1 Bow 🏹");
                    break;
                case 'katana':
                    if (user.katana > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.kayu < 10 || user.iron < 15 || user.diamond < 5 || user.emerald < 3) return m.reply(`Barang tidak cukup!\nUntuk membuat katana. Kamu memerlukan :${user.kayu < 10 ? `\n${10 - user.kayu} kayu🪵` : ''}${user.iron < 15 ? `\n${15 - user.iron} iron⛓` : ''}${user.diamond < 5 ? `\n${5 - user.diamond} Diamond💎` : ''}${user.emerald < 3 ? `\n${3 - user.emerald} Emerald 🟩` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 15;
                    user.diamond -= 5;
                    user.emerald -= 3;
                    user.katana += 1;
                    user.katanadurability = 40;
                    m.reply("Sukses membuat 1 Katana 🦯");
                    break;
                case 'armor':
                    if (user.armor > 0) return m.reply('Kamu sudah memilik ini');
                    if (user.iron < 5 || user.diamond < 1) return m.reply(`Barang tidak cukup!\nUntuk membuat armor. Kamu memerlukan :${user.iron < 5 ? `\n${5 - user.iron} Iron ⛓️` : ''}${user.diamond < 1 ? `\n${1 - user.diamond} Diamond 💎` : ''}`);
                    user.iron -= 5;
                    user.diamond -= 1;
                    user.armor += 1;
                    user.armordurability = 50;
                    m.reply("Sukses membuat 1 Armor 🥼");
                    break;
                default:
                    await conn.reply(m.chat, caption, m, {
                        contextInfo: {
                            externalAdReply: {
                                mediaType: 1,
                                title: 'BOTCAHX RPG',
                                thumbnailUrl: 'https://telegra.ph/file/ed878d04e7842407c2b89.jpg',
                                renderLargerThumbnail: true,
                                sourceUrl: ''
                            }
                        }
                    });
            }
        } else if (/enchant|enchan/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
            switch (_type) {
                case 't':
                    break;
                case '':
                    break;
                default:
                    m.reply(caption);
            }
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

handler.help = ['craft', 'blacksmith'];
handler.tags = ['rpg'];
handler.command = /^(craft|crafting|chant|blacksmith)/i;
handler.register = true;
handler.group = true;
handler.rpg = true

module.exports = handler;
