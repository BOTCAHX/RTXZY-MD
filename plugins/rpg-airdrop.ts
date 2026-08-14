import fetch from 'node-fetch';
import fs from 'fs';

let timeout = 3600000 // 1 hour in milliseconds

let handler: WaPlugin = async (m, { conn, args, usedPrefix, DevMode }) => {
  
    let u = global.db.data.users[m.sender];
    let time = u.lastclaim + 3600000; // 1 hour in milliseconds
    if (Date.now() - u.lastclaim < 3600000) throw `*Sudah Melakukan Pencarian Airdrop!* 🪙\nHarus menunggu selama agar bisa mencari Airdrop kembali selama ${clockString(time - Date.now())}`;
    let Aku = `${Math.floor(Math.random() * 101)}`.trim();
    let Kamu = `${Math.floor(Math.random() * 81)}`.trim(); 
    let A = (+Aku);
    let K = (+Kamu);

    if (A > K) {
      let _sampah = Array.from({length: 50}, (_, i) => (i + 1).toString());
      let sampah = _sampah[Math.floor(Math.random() * _sampah.length)];
      let kayu = _sampah[Math.floor(Math.random() * _sampah.length)];
      let batu = _sampah[Math.floor(Math.random() * _sampah.length)];
      conn.sendFile(m.chat, 'https://telegra.ph/file/60437ce6d807b605adf5e.jpg', 'zonk.jpg', `*Airdrop Ampas!* Ternyata isinya tidak sesuai ekspektasi\n\n*Rewards*\n• *Sampah:* ${sampah}\n• *Kayu:* ${kayu}\n• *Batu:* ${batu}`, m);
      u.sampah += parseInt(sampah);
      u.kayu += parseInt(kayu);
      u.batu += parseInt(batu);
      u.lastclaim = Date.now();
    } else if (A < K) {
      let _limit = ['10', '20', '30'];
      let limit = _limit[Math.floor(Math.random() * _limit.length)];
      let _money = ['10000', '100000', '500000'];
      let money = _money[Math.floor(Math.random() * _money.length)];
      let _point = ['10000', '100000', '500000'];
      let point = _point[Math.floor(Math.random() * _point.length)];
      conn.sendFile(m.chat, 'https://telegra.ph/file/d3bc1d7a97c62d3baaf73.jpg', 'rare.jpg', `*Airdrop Rare!*, Kamu mendapatkan Kotak Airdrop *Rare*\n\nSelamat kamu mendapatkan *Rewards*\n• *Limit:* ${limit}\n• *Money:* ${money}\n• *Point:* ${point}`, m);
      u.limit += parseInt(limit);
      u.money += parseInt(money);
      u.poin += parseInt(point);
      u.lastclaim = Date.now();
    } else {
      conn.sendFile(m.chat, 'https://telegra.ph/file/5d71027ecbcf771b299fb.jpg', 'zonk.jpg', `*Airdrop Zonks!*, Kamu mendapatkan Kotak Airdrop *Zonk (Kosong)*\n\nSelamat kamu mendapatkan *Rewards*\n• *Money:* -1.000.000\n• *Isi:* Angin`, m);
      u.money -= 1000000;
      u.lastclaim = Date.now();
    }
};

handler.help = ['airdrop'];
handler.tags = ['rpg'];
handler.command = /^(airdrop)$/i;
handler.group = true;
handler.rpg = true
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ['\n*' + d + '* _Hari_ ☀️\n ', '*' + h + '* _Jam_ 🕐\n ', '*' + m + '* _Menit_ ⏰\n ', '*' + s + '* _Detik_ ⏱️ '].map(v => v.toString().padStart(2, '0')).join('');
}