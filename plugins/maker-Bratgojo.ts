let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `Masukkan teks yang ingin dijadikan gambar!\n\n*Contoh:*\n${usedPrefix + command} Gojo Comeback`;
  }

  try {
    m.reply(`⏳ Tunggu sebentar, sedang membuat gambar...`);
    let apiUrl = `https://api.botcahx.eu.org/api/maker/canvas-bratGojo?apikey=${btc}&text=${encodeURIComponent(text)}`;
    await conn.sendFile(m.chat, apiUrl, "bratgojo.jpg", "Done!", m);
  } catch (e) {
    console.log(e);
    throw eror;
  }
};

handler.help = ["bratgojo <teks>"];
handler.tags = ["maker"];
handler.command = /^(bratgojo)$/i;
handler.limit = true;
handler.group = true;

export default handler;
