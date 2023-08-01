let handler = async (m, { conn, command }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command == 'gay') {
      const res = `https://api.botcahx.live/api/nsfw/gay?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'ahegao') {
      const res = `https://api.botcahx.live/api/nsfw/ahegao?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'ass') {
      const res = `https://api.botcahx.live/api/nsfw/ass?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'bdsm') {
      const res = `https://api.botcahx.live/api/nsfw/bdsm?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'blowjob') {
      const res = `https://api.botcahx.live/api/nsfw/blowjob?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
     if (command == 'cuckold') {
      const res = `https://api.botcahx.live/api/nsfw/cuckold?apikey=ct${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'cum') {
      const res = `https://api.botcahx.live/api/nsfw/cum?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'ero') {
      const res = `https://api.botcahx.live/api/nsfw/ero?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'femdom') {
      const res = `https://api.botcahx.live/api/nsfw/femdom?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'foot') {
      const res = `https://api.botcahx.live/api/nsfw/foot?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'gangbang') {
      const res = `https://api.botcahx.live/api/nsfw/gangbang?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'glasses') {
      const res = `https://api.botcahx.live/api/nsfw/glasses?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'hentai') {
      const res = `https://api.botcahx.live/api/nsfw/hentai?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'gifs') {
      const res = `https://api.botcahx.live/api/nsfw/gifs?apikey=${btc}`;
      await conn.sendFile(m.chat, res, null, '', m);
    }
    if (command == 'jahy') {
      const res = `https://api.botcahx.live/api/nsfw/jahy?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'manga') {
      const res = `https://api.botcahx.live/api/nsfw/manga?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'masturbation') {
      const res = `https://api.botcahx.live/api/nsfw/masturbation?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'neko') {
      const res = `https://api.botcahx.live/api/nsfw/neko?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'neko2') {
      const res = `https://api.botcahx.live/api/nsfw/neko2?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'orgy') {
      const res = `https://api.botcahx.live/api/nsfw/orgy?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'panties') {
      const res = `https://api.botcahx.live/api/nsfw/panties?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'pussy') {
      const res = `https://api.botcahx.live/api/nsfw/pussy?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'tentacles') {
      const res = `https://api.botcahx.live/api/nsfw/tentacles?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'yuri') {
      const res = `https://api.botcahx.live/api/nsfw/yuri?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'thighs') {
      const res = `https://api.botcahx.live/api/nsfw/thighs?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'zettai') {
      const res = `https://api.botcahx.live/api/nsfw/zettai?apikey=${btc}`;
      await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
   } catch (err) {
  console.error(err)
  throw "🚩 Terjadi kesalahan"
   };
};
handler.command = handler.help = ['gay','ahegao','ass','bdsm','blowjob','cuckold','cum','ero','femdom','foot','gangbang','glasses','hentai','gifs','jahy','manga','masturbation','neko','neko2','orgy','tentacles','pussy','panties','thighs','yuri','zettai']
handler.tags = ['nsfw']
handler.limit = true;
module.exports = handler;
