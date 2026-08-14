let handler: WaPlugin = async (m, { conn, command, usedPrefix, text, participants }) => {
    const groups = Object.keys(conn.chats)
    .filter(key => key.endsWith('@g.us'))
    .map(key => conn.chats[key]);
    let [id, expired] = text.split('|');
    if (!text) {
    const list = groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join('\n');
    const teks = '`L I S T - G R O U P - J O I N I N G`\n\n'
    let _info = `Perintah salah, contoh: ${usedPrefix + command} <nomor grup>|<jumlah hari>`
    conn.reply(m.chat, `${teks}`+`${list}\n\n${_info}`, m);
    } else if (id && /^\d+$/.test(id)) {
    const index = parseInt(id) - 1;
    if (index >= 0 && index < groups.length) {
        let d = new Date(Date.now() + 3600000)
        let locale = 'id'
        let date = d.toLocaleDateString(locale, {
                 day: 'numeric',
                 month: 'long',
                 year: 'numeric' 
                })
        let jumlahHari = 86400000 * +expired;
        let now = Date.now();
        let group = groups[index];
        let who = group.id
        let namegc = await conn.getName(who);
        switch(command) {
            case "addsewa":
                if (!expired) throw "masukan angka untuk menambah jangka waktu jangka waktu"
                if (!global.db.data.chats[who]) global.db.data.chats[who] = {};
    
                if (global.db.data.chats[who].expired && now < global.db.data.chats[who].expired) {
                    global.db.data.chats[who].expired += jumlahHari;
                } else {
                    global.db.data.chats[who].expired = now + jumlahHari;
                }
                let capt = `[ *Groups Notifikasi* ]
  
  *Menambahkan jangka waktu sewa group bot.*
  *Nama group:* ${namegc}
  *Id group:* ${who}
  *Tanggal:* ${date}
  *Jangka waktu:* ${msToDate(global.db.data.chats[who].expired - now)}
  hai all member, terimakasih telah sewa bot kami`
                await conn.sendMessage(who, { text: capt,
                })
                conn.reply(m.chat, `Berhasil menetapkan hari kadaluarsa untuk Grup ini selama ${expired} hari.\n\nHitung Mundur: ${msToDate(global.db.data.chats[who].expired - now)}`, m);
                break;
            case 'delsewa':
                if (!global.db.data.chats[who]) throw `Grup tidak ditemukan di database.`;
                global.db.data.chats[who].expired = false;
                await conn.groupLeave(who)
                m.reply(`Berhasil menghapus hari kadaluarsa untuk Grup ini, dan keluar dari group ini`);
                break;
            case 'setsewa':
                let remainingTime = global.db.data.chats[who].expired - Date.now();
                if (!global.db.data.chats[who]) throw `Grup tidak ditemukan di database.`;
                if (!expired) throw "masukan angka untuk mengubah jangka waktu"
                m.reply(wait)
                global.db.data.chats[who].expired = now + jumlahHari;
                let caption = `[ *Groups Notifikasi* ]
  
  *Perubahan jangka waktu sewa group bot.*
  *Nama group:* ${namegc}
  *Id group:* ${who}
  *Tanggal: ${date}
  *Jangka waktu:* ${msToDate(global.db.data.chats[who].expired - now)}
  hai all member, owner bot ku telah mengubah waktu sewa gc bot`
                await conn.sendMessage(who, { text: caption,
                });
            await sleep(3000)
                conn.reply(m.chat, `Berhasil menetapkan hari kadaluarsa untuk Grup ini selama ${expired} hari.\n\nHitung Mundur: ${msToDate(global.db.data.chats[who].expired - now)}`, m);
          break;
            }
            } else {
            conn.reply(m.chat, 'Grup dengan urutan tersebut tidak ditemukan.', m);
            }
        } else {
            const gcname = groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join('\n');
            const tekss = '`L I S T - G R O U P - J O I N I N G`\n\n'
            let info = `Perintah salah, contoh: ${usedPrefix + command} <nomor grup>|<jumlah hari>`
            conn.reply(m.chat, `${tekss}`+`${gcname}\n\n${info}`, m);
        }
     };
  handler.help = ['addsewa','delsewa','setsewa']
  handler.tags = ['owner']
  handler.command = /^(addsewa|delsewa|setsewa)$/i
     
  handler.owner = true
     
  export default handler
  
  function msToDate(ms) {
      let temp = ms;
      let days = Math.floor(temp / (24 * 60 * 60 * 1000));
      let daysms = temp % (24 * 60 * 60 * 1000);
      let hours = Math.floor((daysms) / (60 * 60 * 1000));
      let hoursms = daysms % (60 * 60 * 1000);
      let minutes = Math.floor((hoursms) / (60 * 1000));
      let minutesms = hoursms % (60 * 1000);
      let sec = Math.floor((minutesms) / 1000);
      return `${days} hari ${hours} jam ${minutes} menit`;
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
