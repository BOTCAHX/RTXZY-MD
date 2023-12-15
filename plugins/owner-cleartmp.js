const { readdirSync, statSync, unlinkSync } = require('fs');
const { join } = require('path');

let handler = async (m, { conn, usedPrefix, args }) => {

  const tmp = ['./tmp'];
  const filenames = [];

  tmp.forEach(dirname => {
    readdirSync(dirname).forEach(file => {
      filenames.push(join(dirname, file));
    });
  });

  const deletedFiles = [];

  filenames.forEach(file => {
    const stats = statSync(file);

    if (stats.isDirectory()) {
      console.log(`Skipping directory: ${file}`);
    } else {
      unlinkSync(file);
      deletedFiles.push(file);
    }
  });

  conn.reply(m.chat, 'Success!', m);

  if (deletedFiles.length > 0) {
    console.log('Deleted files:', deletedFiles);
    conn.reply(m.chat, `Deleted files:\n${deletedFiles.join('\n')}`, m);
  }

  if (deletedFiles.length == 0) {
    conn.reply(m.chat, 'tidak ada file yang tersisa di tmp', m);
  }
};

handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = /^(cleartmp)$/i;
handler.rowner = true;

module.exports = handler;
