import moment from 'moment-timezone';

const timeZone = 'Asia/Jakarta';

let handler: WaPlugin = async (m, { conn, command, args, isOwner, isAdmin, usedPrefix }) => {
    let chat = global.db.data.chats[m.chat];
    if (!m.isGroup) throw 'Perintah ini hanya bisa digunakan di grup!';
    if (!(isAdmin || isOwner)) throw 'Perintah ini hanya bisa digunakan oleh admin grup!';

    if (command === 'aktif' && args[0] === 'closegc') {
        if (args.length < 2) throw `Format salah! Gunakan *${usedPrefix + command} jam tutup|jam buka*\nContoh: ${usedPrefix + command} 21|5`;
        let [closeTime, openTime] = args[1].split('|').map(Number);
        if (isNaN(closeTime) || isNaN(openTime)) throw 'Jam tutup dan buka harus berupa angka!';
        chat.autoGc = { closeTime, openTime };
        m.reply(`Auto group close/open diaktifkan. Grup akan tutup pukul ${closeTime}:00 dan buka pukul ${openTime}:00.`);
    } else if (command === 'mati' && args[0] === 'closegc') {
        delete chat.autoGc;
        m.reply('Auto group close/open dinonaktifkan.');
    }
};

handler.command = /^(aktif|mati)$/i;
handler.help = ['aktif closegc jam tutup|jam buka', 'mati closegc'];
handler.tags = ['group'];
handler.admin = true;
handler.group = true;

export default handler;


const checkGroupsStatus = async (conn) => {
    const currentHour = moment().tz(timeZone).hour();

    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (!chat.autoGc) continue;

        const { closeTime, openTime } = chat.autoGc;

        if (currentHour === closeTime && chat.groupStatus !== 'closed') {
            try {
                await conn.groupSettingUpdate(chatId, 'announcement');
                await conn.sendMessage(chatId, { text: `( OTOMATIS ) 𝖦𝖱𝖮𝖴𝖯 𝖢𝖫𝖮𝖲𝖤, 𝖣𝖠𝖭 𝖠𝖪𝖠𝖭 𝖣𝖨𝖡𝖴𝖪𝖠 𝖩𝖠𝖬 ${openTime}:00 𝖶𝖨𝖡` });
                chat.groupStatus = 'closed';
            } catch (error) {
                console.error(`Error closing group ${chatId}:`, error);
            }
        }

        if (currentHour === openTime && chat.groupStatus !== 'opened') {
            try {
                await conn.groupSettingUpdate(chatId, 'not_announcement');
                await conn.sendMessage(chatId, { text: `( OTOMATIS ) 𝖦𝖱𝖮𝖴𝖯 𝖮𝖯𝖤𝖭, 𝖣𝖠𝖭 𝖠𝖪𝖠𝖭 𝖣𝖨𝖳𝖴𝖳𝖴𝖯 𝖩𝖠𝖬 ${closeTime}:00 𝖶𝖨𝖡` });
                chat.groupStatus = 'opened';
            } catch (error) {
                console.error(`Error opening group ${chatId}:`, error);
            }
        }
    }
};

const interval = 60000;
setInterval(() => {
    checkGroupsStatus(conn);
}, interval);
