import fs from 'fs';
import { exec } from 'child_process';
import cp from 'child_process';
import { promisify } from 'util';
let exec_ = promisify(exec).bind(cp);

let handler: WaPlugin = async (m, { conn, isROwner }) => {
   try {
      let zipFileName = `BackupScript.zip`;

      m.reply("Sedang memulai proses backup. Harap tunggu...");

      setTimeout(() => {
         let zipCommand = `zip -r ${zipFileName} * -x "node_modules/*"`;
         exec_(zipCommand, (err, stdout) => {
            if (err) {
               m.reply("Terjadi kesalahan saat membuat file zip.");
               console.error(err);
               return;
            }

            setTimeout(() => {
               if (fs.existsSync(zipFileName)) {
                  const file = fs.readFileSync(zipFileName);
                  conn.sendMessage(
                     m.chat,
                     {
                        document: file,
                        mimetype: "application/zip",
                        fileName: zipFileName,
                        caption: "Backup selesai. Silakan unduh file backup.",
                     },
                     { quoted: m }
                  );

                  setTimeout(() => {
                     fs.unlinkSync(zipFileName);
                     m.reply("File backup telah dihapus.");
                  }, 5000);
               } else {
                  m.reply("File zip tidak ditemukan.");
               }
            }, 60000); // Wait for 1 minute to ensure the zip file is created
         });
      }, 1000);
   } catch (error) {
      m.reply("Terjadi kesalahan saat melakukan backup.");
      console.error(error);
   }
};

handler.help = ["backupsc"];
handler.tags = ["owner"];
handler.command = ["backupsc"];
handler.owner = true;

export default handler;
