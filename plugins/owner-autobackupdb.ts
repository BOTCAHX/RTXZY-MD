import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import path from 'path';
import Database from 'better-sqlite3';
const timeZone = 'Asia/Jakarta';

const getDbPath = () => {
    const prefix = global.opts?._?.[0] ? global.opts._[0] + '_' : '';
    return path.join('database', `${prefix}database.sqlite`);
};

const readDbFile = async (): Promise<Buffer> => {
    const dbPath = getDbPath();
    if (!fs.existsSync(dbPath)) throw new Error(`Database tidak ditemukan: ${dbPath}`);
    const tmpPath = path.join(os.tmpdir(), `db-backup-${Date.now()}.sqlite`);
    try {
        const db = new Database(dbPath, { readonly: true });
        try {
            await db.backup(tmpPath);
        } finally {
            db.close();
        }
        return fs.readFileSync(tmpPath);
    } catch (e) {
        global.conn?.logger?.warn?.(`[autobackup] backup gagal, fallback copy mentah: ${e?.message || e}`)
        return fs.readFileSync(dbPath);
    } finally {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }
};

const sendBackup = async (conn) => {
    const data = await readDbFile();
    await conn.sendMessage(global.numberowner + '@s.whatsapp.net', {
        document: data,
        mimetype: 'application/x-sqlite3',
        fileName: 'database.sqlite'
    });
};

let handler: WaPlugin = async (m, { conn, command, args, isOwner }) => {
    if (!isOwner) throw 'Perintah ini hanya untuk owner bot!';

    if (command === 'autobackup') {
        if (!args[0]) throw 'Silakan masukkan parameter on/off';

        let setting = args[0].toLowerCase();

        if (setting === 'on') {
            global.db.data.settings = global.db.data.settings || {};
            global.db.data.settings.autoBackup = true;

            try {
                await sendBackup(conn);
                m.reply('Auto backup telah diaktifkan! Backup akan dilakukan setiap 6 jam sekali.');
            } catch (error) {
                console.error('Error during backup:', error);
                m.reply('Terjadi kesalahan saat melakukan backup!');
            }

        } else if (setting === 'off') {
            global.db.data.settings = global.db.data.settings || {};
            global.db.data.settings.autoBackup = false;
            m.reply('Auto backup telah dinonaktifkan!');

        } else {
            throw 'Parameter tidak valid! Gunakan on/off';
        }
    }
};

const performAutoBackup = async (conn) => {
    if (!global.db.data.settings?.autoBackup) return;

    try {
        await sendBackup(conn);
        console.log('Auto backup performed successfully:', moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss'));
    } catch (error) {
        console.error('Error during auto backup:', error);
    }
};

const backupInterval = 6 * 60 * 60 * 1000; // every 6 hours; change this to adjust the backup interval
setInterval(() => {
    performAutoBackup(global.conn);
}, backupInterval);

handler.help = ['autobackup on/off'];
handler.tags = ['owner'];
handler.command = /^autobackup$/i;
handler.owner = true;

export default handler;
