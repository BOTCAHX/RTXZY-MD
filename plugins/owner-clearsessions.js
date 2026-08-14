import fs from 'fs';
import { join } from 'path';

let handler = async (m, { conn }) => {

  const dirname = global.opts?._?.[0] || 'sessions';
  const deletedFiles = [];

  if (!fs.existsSync(dirname)) {
    return conn.reply(m.chat, 'Folder sesi tidak ditemukan.', m);
  }

  // Reset penuh: hapus SEMUA file sesi (state.sqlite, state.sqlite-shm,
  // state.sqlite-wal, dan sisa file lain). Setelah restart bot akan logout
  // dan minta pairing/QR baru.
  fs.readdirSync(dirname).forEach(file => {
    const full = join(dirname, file);
    try {
      if (fs.statSync(full).isFile()) {
        fs.unlinkSync(full);
        deletedFiles.push(full);
      }
    } catch { /* skip yang gagal dihapus */ }
  });

  if (deletedFiles.length > 0) {
    console.log('Deleted files:', deletedFiles);
    conn.reply(m.chat, `Sesi dihapus (${deletedFiles.length} file):\n${deletedFiles.join('\n')}\n\n⚠️ Bot akan logout & minta pairing/QR baru saat restart.`, m);
  } else {
    conn.reply(m.chat, 'tidak ada file yang tersisa di folder sesi', m);
  }
};

handler.help = ['clearsession'];
handler.tags = ['owner'];
handler.command = /^(clearsession|clearsessions)$/i;
handler.rowner = true;

export default handler;
