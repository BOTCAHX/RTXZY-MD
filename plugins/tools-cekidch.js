let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Silakan masukkan link channel WhatsApp.\nContoh:\n${usedPrefix + command} https://whatsapp.com/channel/0029VbAI9JCBKfi5qXq9yJ01`
  try {
    let channelId;
    
    if (text.includes('whatsapp.com/channel/')) {
      channelId = text.split('whatsapp.com/channel/')[1].split('/')[0];
    } else if (text.includes('wa.me/channel/')) {
      channelId = text.split('wa.me/channel/')[1].split('/')[0];
    } else {
      channelId = text;
    }
    
    try {
      const idNewsletter = await conn.newsletterMetadata('invite', channelId);
      
      let response = `📢 *Informasi Channel WhatsApp*\n\n`;
      response += `📛 *Nama Channel*: ${idNewsletter.thread_metadata.name.text}\n`;
      response += `🆔 *ID Channel*: ${idNewsletter.id}\n`;
      response += `📊 *Status*: ${idNewsletter.state.type}\n`;
      response += `👥 *Jumlah Subscriber*: ${idNewsletter.thread_metadata.subscribers_count}\n`;
      response += `✅ *Verifikasi*: ${idNewsletter.thread_metadata.verification}\n`;
      response += `⏰ *Waktu Dibuat*: ${new Date(parseInt(idNewsletter.thread_metadata.creation_time) * 1000).toLocaleString()}\n`;
      response += `📝 *Deskripsi*:\n${idNewsletter.thread_metadata.description.text}\n`;
      
      let previewUrl = null;
      if (idNewsletter.thread_metadata.preview && idNewsletter.thread_metadata.preview.direct_path) {
        previewUrl = 'https://mmg.whatsapp.net' + idNewsletter.thread_metadata.preview.direct_path;
        await conn.sendFile(m.chat, previewUrl, 'preview.jpg', response, m);
      } else {
        return m.reply(response);
      }
    } catch (err) {
      return m.reply(`*Error*: ID channel tidak valid atau channel tidak ditemukan.\n\nID yang digunakan: ${channelId}`);
    }
  } catch (err) {
    return m.reply(`*Error*: ${err.message || 'Terjadi kesalahan saat memeriksa channel'}`);
  }
}

handler.command = ['cekidch'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = true;

export default handler;
