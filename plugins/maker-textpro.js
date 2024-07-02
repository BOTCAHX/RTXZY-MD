/** let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `🚩 *Contoh:* ${usedPrefix + command} botcahx`
    const dates = new Date(); 
    const timestamp = dates.getTime();     
    const date = new Date(timestamp);
    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedTime = hour + ":" + minutes + ":" + seconds;
 await conn.reply(m.chat, wait, m)
  try {
    if (command == 'giraffe') {
      const res = `https://api.botcahx.eu.org/api/textpro/giraffe?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'magma') {
      const res = `https://api.botcahx.eu.org/api/textpro/magma?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'hallowen') {
      const res = `https://api.botcahx.eu.org/api/textpro/hallowen-text?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'valentine') {
      const res = `https://api.botcahx.eu.org/api/textpro/valentine?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'valentine2') {
      const res = `https://api.botcahx.eu.org/api/textpro/valentine2?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
     if (command == 'neonlight') {
      const res = `https://api.botcahx.eu.org/api/textpro/neon-light?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
     if (command == 'neongalaxy') {
      const res = `https://api.botcahx.eu.org/api/textpro/neon-galaxy?text=?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
     if (command == 'neongreen') {
      const res = `https://api.botcahx.eu.org/api/textpro/neon-green?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'brokenglass') {
      const res = `https://api.botcahx.eu.org/api/textpro/broken-glass?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'artpapper') {
      const res = `https://api.botcahx.eu.org/api/textpro/art-papper?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'glossy') {
      const res = `https://api.botcahx.eu.org/api/textpro/glossy?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'watercolor') {
      const res = `https://api.botcahx.eu.org/api/textpro/water-color?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'multicolor') {
      const res = `https://api.botcahx.eu.org/api/textpro/multi-color?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'robot') {
      const res = `https://api.botcahx.eu.org/api/textpro/robot?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'scifi') {
      const res = `https://api.botcahx.eu.org/api/textpro/scifi?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'neondevil') {
      const res = `https://api.botcahx.eu.org/api/textpro/neon-devil?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'skytext') {
      const res = `https://api.botcahx.eu.org/api/textpro/sky-text?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'vintage') {
      const res = `https://api.botcahx.eu.org/api/textpro/vintage?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'writing') {
      const res = `https://api.botcahx.eu.org/api/textpro/writing?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'engraved') {
      const res = `https://api.botcahx.eu.org/api/textpro/engraved?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'gluetext') {
      const res = `https://api.botcahx.eu.org/api/textpro/glue-text?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'pornhub') {
      const res = `https://api.botcahx.eu.org/api/textpro/pornhub?text=${encodeURIComponent(text)}&text2=hub&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'holograpic') {
      const res = `https://api.botcahx.eu.org/api/textpro/holograpic?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'deluxesilver') {
      const res = `https://api.botcahx.eu.org/api/textpro/deluxe-silver?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'fabric') {
      const res = `https://api.botcahx.eu.org/api/textpro/fabric?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'wicker') {
      const res = `https://api.botcahx.eu.org/api/textpro/wicker?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'toxic') {
      const res = `https://api.botcahx.eu.org/api/textpro/toxic-bokeh?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'strawberry') {
      const res = `https://api.botcahx.eu.org/api/textpro/stroberi?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'bread') {
      const res = `https://api.botcahx.eu.org/api/textpro/bread?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'lava') {
      const res = `https://api.botcahx.eu.org/api/textpro/larva?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'koi') {
      const res = `https://api.botcahx.eu.org/api/textpro/koi?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'blood') {
      const res = `https://api.botcahx.eu.org/api/textpro/horor-blood?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'honey') {
      const res = `https://api.botcahx.eu.org/api/textpro/honey?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'ice') {
      const res = `https://api.botcahx.eu.org/api/textpro/ice?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'rusty') {
      const res = `https://api.botcahx.eu.org/api/textpro/rusty?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'captainamerica') {
      const res = `https://api.botcahx.eu.org/api/textpro/captain?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'gradient') {
      const res = `https://api.botcahx.eu.org/api/textpro/3d-gradient?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'christmas') {
      const res = `https://api.botcahx.eu.org/api/textpro/christmas?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'dropwater') {
      const res = `https://api.botcahx.eu.org/api/textpro/drop-water?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'blackpink') {
      const res = `https://api.botcahx.eu.org/api/textpro/black-pink?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'blackpink2') {
      const res = `https://api.botcahx.eu.org/api/textpro/black-pink2?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'wolflogo') {
      const res = `https://api.botcahx.eu.org/api/textpro/logo-wolf?text=${formattedTime}&text2=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'naturalleaves') {
      const res = `https://api.botcahx.eu.org/api/textpro/natural-leaves?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'harrypotter') {
      const res = `https://api.botcahx.eu.org/api/textpro/logo-wolf2?text=${formattedTime}&text2=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == '3dstone') {
      const res = `https://api.botcahx.eu.org/api/textpro/3dstone?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == '1917') {
      const res = `https://api.botcahx.eu.org/api/textpro/1917?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'thunder2') {
      const res = `https://api.botcahx.eu.org/api/textpro/thunder2?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'space') {
      const res = `https://api.botcahx.eu.org/api/textpro/space?text=${encodeURIComponent(text)}&text2=${formattedTime}&&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'hallowen2') {
      const res = `https://api.botcahx.eu.org/api/textpro/hallowen?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'jokerlogo') {
      const res = `https://api.botcahx.eu.org/api/textpro/joker-logo?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'blood') {
      const res = `https://api.botcahx.eu.org/api/textpro/blood?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'grafity') {
      const res = `https://api.botcahx.eu.org/api/textpro/grafity-text?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'grafity2') {
      const res = `https://api.botcahx.eu.org/api/textpro/grafity-text2?text=${encodeURIComponent(text)}&text2=&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'glitch') {
      const res = `https://api.botcahx.eu.org/api/textpro/glitch?text=${encodeURIComponent(text)}&text2=${formattedTime}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'glitch2') {
      const res = `https://api.botcahx.eu.org/api/textpro/glitch2?text=${encodeURIComponent(text)}&text2=${formattedTime}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'glitch3') {
      const res = `https://api.botcahx.eu.org/api/textpro/glitch3?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'ninjalogo') {
      const res = `https://api.botcahx.eu.org/api/textpro/ninja-logo?text=${encodeURIComponent(text)}&text2=${formattedTime}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'avengers') {
      const res = `https://api.botcahx.eu.org/api/textpro/avengers-logo?text=${encodeURIComponent(text)}&text2=Avengers&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'marvelstudio') {
      const res = `https://api.botcahx.eu.org/api/textpro/marvel-logo2?text=${encodeURIComponent(text)}&text2=Studio&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'marvelstudio2') {
      const res = `https://api.botcahx.eu.org/api/textpro/marvel-logo3?text=${encodeURIComponent(text)}&text2=Studio&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
    }
    if (command == 'batman') {
      const res = `https://api.botcahx.eu.org/api/textpro/batman-logo?text=${encodeURIComponent(text)}&apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'textpro.jpeg', '', m);
   } 
   } catch (err) {
  console.error(err)
  throw "🚩 Terjadi kesalahan"
   };
};
handler.command = handler.help = ['giraffe','magma','batman','marvelstudio2','marvelstudio','avengers','ninjalogo','glitch3','glitch2','glitch','grafity','grafity2','blood','jokerlogo','hallowen2','space','thunder2','1917','3dstone','harrypotter','wolflogo','naturalleaves','blackpink','blackpink2','dropwater','christmas','gradient','captainamerica','rusty','ice','honey','blood','koi','lava','bread','strawberry','toxic','wicker','fabric','pornhub','holograpic','deluxesilver','writing','engraved','gluetext','neondevil','skytext','vintage','multicolor','robot','scifi','artpapper','glossy','watercolor','neongreen','brokenglass','artpapper','valentine2','neonlight','neongalaxy','magma','hallowen','valentine']
handler.tags = ['maker'];
handler.limit = true;
module.exports = handler;
**/
