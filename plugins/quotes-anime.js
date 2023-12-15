let fetch = require('node-fetch');
let handler = async (m, { conn }) => {
  try {
    // Fetch data dari api
    let res = await fetch(`https://api.botcahx.eu.org/api/random/quotesanime?apikey=${btc}`);
    let json = await res.json();

    // check data jika valid respom
    if (json.status && json.result && json.result.length > 0) {
      // select random response json
      let randomIndex = Math.floor(Math.random() * json.result.length);
      let animeQuote = json.result[randomIndex];

      // buat
      let cleanQuotes = animeQuote.quotes.replace(/[\n\r\t]/g, ' ');

      // Construct the reply message with the cleaned anime quote, character, and episode details
      let replyMessage = `${cleanQuotes}\n\nCharacter: ${animeQuote.karakter}\nAnime: ${animeQuote.anime}\nEpisode: ${animeQuote.episode}`;

      // Reply with the constructed message and send the image directly
      conn.sendFile(m.chat, animeQuote.gambar, 'image.jpg', replyMessage, m, false, { contextInfo: { mentionedJid: [m.sender] } });
    } else {
      throw 'Invalid API response';
    }
  } catch (e) {
    throw `Error: ${e.message || 'Internal server error!'}`;
  }
};

handler.help = ['anime'];
handler.tags = ['quotes'];
handler.command = /^(anime)$/i;

module.exports = handler;
