import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🚩 *Masukan detail gambar!* `;
  try {
    conn.reply(m.chat, wait, m)
    const res = await fetch(`https://api.botcahx.eu.org/api/maker/text2img?apikey=${btc}&text=${text}`).then(res => res.buffer());
    conn.sendFile(m.chat, res, 'image.jpg', `Result: ${text}`, m);
  } catch (error) {
    m.reply(`Error: ${eror}`);
  }
};

handler.command = handler.help = ['text2img'];
handler.tags = ['ai'];
handler.limit = true;
export default handler;
