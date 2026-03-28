const fetch = require('node-fetch');

const modes = {
  noob: { bonus: 10, time: 20000, money: 500 },
  easy: { bonus: 20, time: 30000, money: 1000 },
  medium: { bonus: 40, time: 40000, money: 2500 },
  hard: { bonus: 100, time: 60000, money: 5000 },
  master: { bonus: 250, time: 70000, money: 10000 },
  grandmaster: { bonus: 500, time: 90000, money: 25000 },
  legendary: { bonus: 1000, time: 120000, money: 50000 },
  mythic: { bonus: 3000, time: 150000, money: 75000 },
  god: { bonus: 5000, time: 200000, money: 100000 },
};

let handler = async (m, { conn, args, usedPrefix }) => {

  conn.math = conn.math ? conn.math : {};
  
  const modeList = Object.keys(modes);
  if (args.length < 1) {
    throw `
Silakan pilih tingkat kesulitan.
${modeList.join(" | ")}

Contoh penggunaan: ${usedPrefix}math medium
`.trim();
  }

  let mode = args[0].toLowerCase();
  if (!(mode in modes)) {
    throw `Mode tidak ditemukan!\n${modeList.join(' | ')}`;
  }

  let id = m.chat;
  if (id in conn.math) {
    return conn.reply(m.chat, 'Masih ada soal yang belum terjawab di chat ini.', conn.math[id][0]);
  }

  try {
    const url = `https://api.botcahx.eu.org/api/game/math?apikey=${btc}`;
    const res = await fetch(url);
    const json = await res.json();
    const soalDitemukan = json.filter(q => q.level && q.level.toLowerCase() === mode);
    const data = soalDitemukan[Math.floor(Math.random() * soalDitemukan.length)];

    if (!data || !data.soal || !data.jawaban || !data.jawabanGanda) {
      throw new Error('Format API tidak sesuai.');
    }

    const { bonus, time, money } = modes[mode];
    let pilihan = data.jawabanGanda;
    let options = pilihan.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n');
    let indexJawaban = pilihan.indexOf(data.jawaban);
    let hurufJawaban = String.fromCharCode(65 + indexJawaban);

    let caption = `
Berapa jawaban dari *${data.soal}*?

${options}

┌─⊷ *SOAL*
▢ Level: *${data.level}*
▢ Timeout: ${(time / 1000).toFixed(2)} detik
▢ Bonus: +${bonus} XP & +${money} Money
▢ *Balas/ replay soal ini untuk menjawab dengan a, b, c, atau d*
└──────────────

`.trim();

    conn.math[id] = [
      await conn.reply(m.chat, caption, m),
      {
        jawaban: hurufJawaban, 
        jawabanAsli: data.jawaban, 
        pilihan: pilihan,
        bonus,
        money,
        time
      },
      4,
      setTimeout(() => {
        if (conn.math[id]) {
          conn.reply(
            m.chat,
            `Waktu habis!\nJawaban: *${hurufJawaban} (${data.jawaban})*`,
            conn.math[id][0]
          );
          delete conn.math[id];
        }
      }, time)
    ];

  } catch (e) {
    console.error(e);
    m.reply('Error ambil soal.');
  }
};

handler.help = ['math <mode>'];
handler.tags = ['game'];
handler.command = /^math/i;

module.exports = handler;