let fetch = require('node-fetch');
let handler = async (m, { conn }) => {
  try {
    // Fetch data from your API
    const res = await fetch(`https://api.botcahx.live/api/random/quotesanime?apikey=${btc}`);
    const json = await res.json();

    // Check if the API response has the expected structure
    if (json.status && json.result && json.result.length > 0) {
      // Randomly select an anime quote from the API response
      let RandomPick = Math.floor(Math.random() * json.result.length);
      let animeQuote = json.result[RandomPick];

      // Replace special characters that might cause issues with spaces in the quote text

      // Construct the reply message with the cleaned anime quote, character, and episode details
      let replyMessage = `"${animeQuote.quotes}"\n\nCharacter: ${animeQuote.karakter}\nAnime: ${animeQuote.anime}\nEpisode: ${animeQuote.episode}`;

      // Reply with the constructed message and send the image directly

      conn.sendFile(m.chat, animeQuote.gambar, 'image.jpg', replyMessage, m, null, { contextInfo: { mentionedJid: [m.sender] } });
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
