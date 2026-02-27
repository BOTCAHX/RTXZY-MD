const { loadBaileys } = require('../baileys-loader.mjs');

let baileys;

function msToDate(ms) {
    let temp = ms;
    let days = Math.floor(temp / (24 * 60 * 60 * 1000));
    let daysms = temp % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysms / (60 * 60 * 1000));
    let hoursms = daysms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursms / (60 * 1000));
    let minutesms = hoursms % (60 * 1000);
    let sec = Math.floor(minutesms / 1000);
    return `${days} hari ${hours} jam ${minutes} menit`;
}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!baileys) {
    baileys = await loadBaileys();
  }

  const { proto } = baileys;
  
    let who = text;
    switch (command) {
        case 'listsewa':
            let sewaList = Object.entries(global.db.data.chats)
                .filter(([_, chat]) => chat.expired && chat.expired > Date.now())
                .map(([id, _]) => id);

            if (sewaList.length === 0) {
                await conn.reply(m.chat, `Tidak ada grup yang memiliki masa sewa aktif.`, m);
            } else {
                let listText = '‹ Daftar Grup Sewa Aktif:\n\n';
                for (let i = 0; i < sewaList.length; i++) {
                    let chatId = sewaList[i];
                    let remainingTime = global.db.data.chats[chatId].expired - Date.now();
                    let groupInfo = conn.chats[chatId] || { subject: 'Tidak Dikenal' };
                    let name = groupInfo.subject;
                    listText += `*${i + 1}.* *Nama*: ${name}\n  *ID*: ${chatId}\n  *Sisa Waktu*: ${msToDate(remainingTime)}\n\n`;
                }
                await conn.reply(m.chat, listText, m);
            }
            break;

        case 'ceksewa':
            if (!text) throw `Contoh penggunaan: ${usedPrefix + command} <nomor urut>\n\nGunakan *${usedPrefix}listsewa* untuk melihat daftar grup sewa aktif.`;
            if (!/^\d+$/.test(who)) throw "Nomor urut harus berupa angka!";

            let sewaListCek = Object.entries(global.db.data.chats)
                .filter(([_, chat]) => chat.expired && chat.expired > Date.now())
                .map(([id, _]) => id);

            let index = parseInt(who) - 1;
            if (index < 0 || index >= sewaListCek.length) throw "Nomor urut tidak valid!";

            let chatId = sewaListCek[index];
            let chatData = global.db.data.chats[chatId];
            let remainingTime = chatData.expired - Date.now();
            let groupInfo = conn.chats[chatId] || { subject: 'Tidak Dikenal' };
            let name = groupInfo.subject;

            await conn.reply(m.chat, `Informasi Sewa Grup *${name}*:\n\n*ID*: ${chatId}\n*Sisa Waktu*: ${msToDate(remainingTime)}`, m);
            break;
    }
};

handler.help = ['listsewa', 'ceksewa <nomor urut>'];
handler.tags = ['owner'];
handler.command = /^(listsewa|ceksewa|csewa)$/i;
handler.owner = true

module.exports = handler;
