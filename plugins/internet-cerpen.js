 /*
   Created By Dana
   Source From: https://github.com/DanaPutra133/Aquabot-V3/blob/main/aqua%20bot/plugins/search-cerpen.js
   Github: https://github.com/DanaPutra133/Aquabot-V3/
   Created At: 13 June 2024
   Dont Delete This Watermark and Sell This Code !!!!
*/

const fetch = require('node-fetch')

//mulai

let handler = async (m, {conn, command}) => {
  try {
    let cerdn = `----( *${command.toUpperCase()}* )----\n\n`;

    if (command === 'cerpenremaja') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=remaja&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenanak') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=anak&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenmisteri') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=misteri&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenbudaya') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=budaya&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenromantis') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=romantis&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpengalau') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=galau&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpengokil') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=gokil&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpeninspiratif') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=inspiratif&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenkehidupan') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=kehidupan&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpensastra') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=sastra&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenjepang') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=jepang&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenkorea') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=korea&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenkeluarga') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=keluarga&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenpersahabatan') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=persahabatan&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenkristen') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=kristen&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenramadhan') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=ramadhan&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenliburan') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=liburan&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenlingkungan') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=lingkungan&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }
    else if(command === 'cerpenmengharukan') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/story/cerpen?type=mengharukan&apikey=${btc}`)).json();
        cerdn += `Judul: *${res.result.title}*\nAuthor: *${res.result.author}*\nKategori: *${res.result.kategori}*\nLolos: *${res.result.lolos}*\n\n*Cerita:* ${res.result.cerita}\n `
    }

    await m.reply(cerdn);
    
      } catch (e) {
        console.log(e);
        m.reply('Maaf, cerpen tidak di temukan');
        await conn.sendMessage(m.chat, {
          react: {
              text: '😞',
              key: m.key,
          }
      })
      }

};



handler.help = handler.command = ['cerpenremaja', 'cerpenanak', 'cerpenbudaya', 'cerpenmisteri', 'cerpenromantis', 'cerpencinta', 'cerpengokil', 'cerpengalau', 'cerpenkehidupan', 'cerpeninspiratif', 'cerpensastra', 'cerpenjepang', 'cerpenkorea', 'cerpenkeluarga', 'cerpenpersahabatan', 'cerpenkristen', 'cerpenramadhan', 'cerpenhiburan', 'cerpenlingkungan', 'cerpenmengharukan'];
handler.tags = ['internet']
handler.limit = true;

module.exports = handler

//dana_putra13
