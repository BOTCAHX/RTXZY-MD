const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Masukkan jumlah level yang ingin ditambahkan pada pengguna. Contoh: .addlevel @user 10';
  }
    
  conn.chatRead(m.chat)
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  })

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    throw 'Tag pengguna yang ingin ditambahkan levelnya. Contoh: .addlevel @user 10';
  }

  let levelToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(levelToAdd)) {
    throw 'Jumlah level yang dimasukkan harus berupa angka. Contoh: .addlevel @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      level: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  // Add level to user
  users[mentionedJid].level += levelToAdd;

  conn.reply(m.chat, `Berhasil menambahkan ${levelToAdd} level untuk @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addlevel @user <jumlah level>'];
handler.tags = ['rpg'];
handler.command = /^addlevel$/i;
handler.owner = true;
handler.rpg = true;

module.exports = handler;
