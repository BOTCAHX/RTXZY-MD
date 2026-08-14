const __dirname = import.meta.dirname;
import gtts from 'node-gtts';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const defaultLang = 'id';
let handler: WaPlugin = async (m, { conn, args }) => {
  try {
    let lang = args[0];
    let text = args.slice(1).join(' ');
    if ((args[0] || '').length !== 2) {
      lang = defaultLang;
      text = args.join(' ');
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

    let res = await tts(text, lang);
    conn.sendFile(m.chat, res, 'tts.opus', null, m, true);
  } catch (e) {
    m.reply('*Contoh:* .tts hello world');
  }
};
handler.help = ['tts <teks>'];
handler.tags = ['tools'];
handler.command = /^tts$/i;
export default handler;

function tts(text, lang = 'id'): Promise<Buffer> {
  console.log(lang, text);
  return new Promise((resolve, reject) => {
    let tts = gtts(lang);
    let filePath = path.join(__dirname, '../tmp', (Date.now()) + '.wav');
    tts.save(filePath, text, (err, result) => {
      if (err) reject(err);
      else {
        fs.readFile(filePath, (err, data) => {
          if (err) reject(err);
          else {
            fs.unlink(filePath, err => {
              if (err) console.log(err);
            });
            resolve(data);
          }
        });
      }
    });
  });
}
