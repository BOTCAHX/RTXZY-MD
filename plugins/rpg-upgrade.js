const handler = async (m, {
    conn,
    command,
    args,
    usedPrefix
}) => {
    try {
        let user = global.db.data.users[m.sender];
        let fishingrod = user.fishingrod * 1;
        let pickaxe = user.pickaxe * 1;
        let sword = user.sword * 1;
        let armor = user.armor * 1;
        let katana = user.katana * 1;
        let axe = user.axe * 1;
        let bow = user.bow * 1;
        let pisau = user.pisau * 1;

        let type = (args[0] || '').toLowerCase();
        let prefix = usedPrefix;

        let lmao1 = `乂 *U P G R A D E*

乂 *L I S T - U P G R A D E*
*[ 🎣 ]* • FishingRod
*[ ⛏️ ]* • Pickaxe
*[ 🗡 ]* • Sword
*[ 🛡 ]* • Armor
*[ 🦯 ]* • Katana
*[ 🏹 ]* • Bow
*[ 🪓 ]* • Axe
*[ 🔪 ]* • Pisau

乂 *H O W - U P G R A D E*
• _Example_ :
.uptool _sword_
`.trim();

        switch (type) {
            case 'fishingrod':
                if (fishingrod == 0) {
                    m.reply(`anda belum memiliki *🎣FishingRod*\nuntuk mendapatkannya ketik *${usedPrefix}craft fishingrod*`);
                } else if (fishingrod > 9) {
                    m.reply(`*🎣FishingRod* kamu sudah level max`);
                } else {
                    let _kayu = fishingrod * 25;
                    let _string = fishingrod * 15;
                    let _money = fishingrod * 10000;
                    if (user.kayu < _kayu || user.string < _string || user.money < _money) {
                        m.reply(`Material kamu kurang!!${user.kayu < _kayu ? `\n🪵Kayu Kamu Kurang *${_kayu - user.kayu}*` : ''}${user.string < _string ? `\n🧶String Kamu Kurang *${_string - user.string}*` : ''}${user.money < _money ? `\n💰Uang Kamu Kurang *${_money - user.money}*` : ''}`);
                    } else {
                        user.fishingrod += 1;
                        user.kayu -= _kayu;
                        user.string -= _string;
                        user.money -= _money;
                        user.fishingroddurability = 0;
                        user.fishingroddurability += fishingrod * 50;
                        m.reply(`Succes mengupgrade *🎣FishingRod*`);
                    }
                }
                break;
            case 'pickaxe':
                if (pickaxe == 0) {
                    m.reply(`anda belum memiliki *⛏Pickaxe*\nuntuk memilikinya ketik *${usedPrefix}craft pickaxe*`);
                } else if (pickaxe > 9) {
                    m.reply(`*⛏Pickaxe* kamu sudah level max`);
                } else {
                    let __batu = pickaxe * 25;
                    let __kayu = pickaxe * 15;
                    let __money = pickaxe * 15000;
                    if (user.batu < __batu || user.kayu < __kayu || user.money < __money) {
                        m.reply(`Material Anda Kurang!!${user.batu < __batu ? `\n🪨Batu kamu kurang *${__batu - user.batu}*` : ''}${user.kayu < __kayu ? `\n🪵Kayu kamu kurang *${__kayu - user.kayu}*` : ''}${user.money < __money ? `\n💰Uang kamu kurang *${__money - user.money}*` : ''}`);
                    } else {
                        user.pickaxe += 1;
                        user.kayu -= __kayu;
                        user.batu -= __batu;
                        user.money -= __money;
                        user.pickaxedurability = 0;
                        user.pickaxedurability += pickaxe * 50;
                        m.reply(`Succes mengupgrade *⛏Pickaxe*`);
                    }
                }
                break;
                case 'axe':
                if (axe == 0) {
                    m.reply(`anda belum memiliki *🪓 Axe*\nuntuk memilikinya ketik *${usedPrefix}craft axe*`);
                } else if (axe > 9) {
                    m.reply(`*🪓 axe* kamu sudah level max`);
                } else {
                    let __batu = axe * 25;
                    let __kayu = axe * 15;
                    let __money = axe * 15000;
                    if (user.batu < __batu || user.kayu < __kayu || user.money < __money) {
                        m.reply(`Material Anda Kurang!!${user.batu < __batu ? `\n🪨Batu kamu kurang *${__batu - user.batu}*` : ''}${user.kayu < __kayu ? `\n🪵Kayu kamu kurang *${__kayu - user.kayu}*` : ''}${user.money < __money ? `\n💰Uang kamu kurang *${__money - user.money}*` : ''}`);
                    } else {
                        user.axe += 1;
                        user.kayu -= __kayu;
                        user.batu -= __batu;
                        user.money -= __money;
                        user.axedurability = 0;
                        user.axedurability += axe * 50;
                        m.reply(`Succes mengupgrade *🪓 Axe*`);
                    }
                }
                break;
                case 'bow':
                if (bow == 0) {
                    m.reply(`anda belum memiliki *🏹 Bow*\nuntuk memilikinya ketik *${usedPrefix}craft bow*`);
                } else if (bow > 9) {
                    m.reply(`*🏹 bow* kamu sudah level max`);
                } else {
                    let __batu = bow * 25;
                    let __kayu = bow * 15;
                    let __money = bow * 15000;
                    if (user.batu < __batu || user.kayu < __kayu || user.money < __money) {
                        m.reply(`Material Anda Kurang!!${user.batu < __batu ? `\n🪨Batu kamu kurang *${__batu - user.batu}*` : ''}${user.kayu < __kayu ? `\n🪵Kayu kamu kurang *${__kayu - user.kayu}*` : ''}${user.money < __money ? `\n💰Uang kamu kurang *${__money - user.money}*` : ''}`);
                    } else {
                        user.bow += 1;
                        user.kayu -= __kayu;
                        user.batu -= __batu;
                        user.money -= __money;
                        user.bowdurability = 0;
                        user.bowdurability += axe * 50;
                        m.reply(`Succes mengupgrade *🏹 Bow*`);
                    }
                }
                break;
            case 'sword':
                if (sword == 0) {
                    m.reply(`anda belum memiliki *🗡Sword*\nuntuk memilikinya ketik *${usedPrefix}craft sword*`);
                } else if (sword > 9) {
                    m.reply(`*🗡Sword* kamu sudah level max`);
                } else {
                    let _iron = sword * 25;
                    let ___kayu = sword * 15;
                    let ___money = sword * 10000;
                    if (user.iron < _iron || user.kayu < ___kayu || user.money < ___money) {
                        m.reply(`Material Anda Kurang!!${user.iron < _iron ? `\n🔩Iron kamu kurang *${_iron - user.iron}*` : ''}${user.kayu < ___kayu ? `\n🪵Kayu kamu kurang *${___kayu - user.kayu}*` : ''}${user.money < ___money ? `\n💰Uang kamu kurang *${___money - user.money}*` : ''}`);
                    } else {
                        user.sword += 1;
                        user.iron -= _iron;
                        user.kayu -= ___kayu;
                        user.money -= ___money;
                        user.sworddurability = 0;
                        user.sworddurability += sword * 50;
                        m.reply(`Succes mengupgrade *🗡Sword*`);
                    }
                }
                break;
                case 'pisau':
                if (pisau == 0) {
                    m.reply(`anda belum memiliki *🔪Pisau*\nuntuk memilikinya ketik *${usedPrefix}craft pisau*`);
                } else if (pisau > 9) {
                    m.reply(`*🔪Pisau* kamu sudah level max`);
                } else {
                    let _iron = pisau * 25;
                    let ___kayu = pisau * 15;
                    let ___money = pisau * 10000;
                    if (user.iron < _iron || user.kayu < ___kayu || user.money < ___money) {
                        m.reply(`Material Anda Kurang!!${user.iron < _iron ? `\n🔩Iron kamu kurang *${_iron - user.iron}*` : ''}${user.kayu < ___kayu ? `\n🪵Kayu kamu kurang *${___kayu - user.kayu}*` : ''}${user.money < ___money ? `\n💰Uang kamu kurang *${___money - user.money}*` : ''}`);
                    } else {
                        user.pisau += 1;
                        user.iron -= _iron;
                        user.kayu -= ___kayu;
                        user.money -= ___money;
                        user.pisaudurability = 0;
                        user.pisaudurability += pisau * 50;
                        m.reply(`Succes mengupgrade *🔪Pisau*`);
                    }
                }
                break;
            case 'katana':
                if (katana == 0) {
                    m.reply(`anda belum memiliki *🦯Katana*\nuntuk memilikinya ketik *${usedPrefix}craft katana`);
                } else if (katana > 9) {
                    m.reply(`*🦯Katana* kamu sudah level max`);
                } else {
                    let _iron = katana * 30;
                    let ___kayu = katana * 15;
                    let ___diamond = katana * 10;
                    let ___emerald = katana * 5;
                    let ___money = katana * 50000;
                    if (user.iron < _iron || user.kayu < ___kayu || user.diamond < ___diamond || user.emerald < ___emerald || user.money < ___money) {
                        m.reply(`Material Anda Kurang!!${user.iron < _iron ? `\n🔩Iron kamu kurang *${_iron - user.iron}*` : ''}${user.kayu < ___kayu ? `\n🪵Kayu kamu kurang *${___kayu - user.kayu}*` : ''}${user.diamond < ___diamond ? `\n💎Diamond kamu kurang *${___diamond - user.diamond}*` : ''}${user.emerald < ___emerald ? `\n🟩Emerald kamu kurang *${___emerald - user.emerald}*` : ''}${user.money < ___money ? `\n💰Uang kamu kurang *${___money - user.money}*` : ''}`);
                    } else {
                        user.katana += 1;
                        user.iron -= _iron;
                        user.kayu -= ___kayu;
                        user.diamond -= ___diamond;
                        user.emerald -= ___emerald;
                        user.money -= ___money;
                        user.katanadurability = 0;
                        user.katanadurability += katana * 50;
                        m.reply(`Succes mengupgrade *🦯Katana*`);
                    }
                }
                break;
            case 'armor':
                if (armor == 0) {
                    m.reply(`anda belum memiliki *🛡armor*\nuntuk memilikinya ketik *${usedPrefix}craft armor*`);
                } else if (armor > 9) {
                    m.reply(`*🛡 Armor* kamu sudah level max`);
                } else {
                    let __iron = armor * 10;
                    let ___diamond = armor * 5;
                    let ___money = armor * 30000;
                    if (user.iron < __iron || user.diamond < ___diamond || user.money < ___money) {
                        m.reply(`Material Anda Kurang!!${user.iron < __iron ? `\n🔩 iron kamu kurang *${__iron - user.iron}*` : ''}${user.diamond < ___diamond ? `\n💎 Diamond kamu kurang *${___diamond - user.diamond}*` : ''}${user.money < ___money ? `\n💰Uang kamu kurang *${___money - user.money}*` : ''}`);
                    } else {
                        user.armor += 1;
                        user.iron -= __iron;
                        user.diamond -= ___diamond;
                        user.money -= ___money;
                        user.armordurability = 0;
                        user.armordurability += armor * 50;
                        m.reply(`Succes mengupgrade *🛡Armor*`);
                    }
                }
                break;
            default:
                await conn.reply(m.chat, lmao1, m, {
                    contextInfo: {
                        externalAdReply: {
                            mediaType: 1,
                            title: 'BETABOTZ RPG',
                            thumbnailUrl: 'https://telegra.ph/file/97dba25a7bd8084913166.jpg',
                            renderLargerThumbnail: true,
                            sourceUrl: ''
                        }
                    }
                });
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};

handler.help = ['uptool'];
handler.tags = ['rpg'];
handler.command = /^(up(tool)?)$/i;
handler.fail = null;
handler.group = true;

module.exports = handler;