let handler = async (m, { conn, args }) => {
  let chats = global.db.data.chats;

  let mutedChats = Object.entries(chats).filter(([_, chat]) => chat.isBanned);
  if (args[0]) {
    let index = parseInt(args[0]) - 1;
    if (isNaN(index) || index < 0 || index >= mutedChats.length) {
      return m.reply('Nomor yang kamu masukkan tidak valid.');
    }

    let [chatId] = mutedChats[index];
    chats[chatId].isBanned = false;
    m.reply(`Berhasil meng-unmute grup dengan ID: ${chatId}`);
  } else {
    if (mutedChats.length === 0) {
      m.reply('Tidak ada grup yang sedang di-mute.');
    } else {
      let list = mutedChats.map(([id], i) => `${i + 1}. ${id}`).join('\n');
      m.reply(`Daftar grup yang di-mute:\n\n${list}\n\nKetik *listmute [nomor]* untuk meng-unmute.`);
    }
  }
};

handler.help = ['listmute'];
handler.tags = ['owner'];
handler.command = ['listmute'];
handler.owner = true;

export default handler;
