import moment from 'moment-timezone';
import fs from 'fs';
const timeZone = 'Asia/Jakarta';

let handler = async (m, { conn, command, args, isOwner }) => {
    if (!isOwner) throw 'Perintah ini hanya untuk owner bot!';
    
    if (command === 'autobackup') {
        if (!args[0]) throw 'Silakan masukkan parameter on/off';
        
        let setting = args[0].toLowerCase();
        
        if (setting === 'on') {
            global.db.data.settings = global.db.data.settings || {};
            global.db.data.settings.autoBackup = true;
            
            try {
                let db = fs.readFileSync('./database.json');
                await conn.sendMessage(global.numberowner + '@s.whatsapp.net', {
                    document: db,
                    mimetype: 'application/json',
                    fileName: 'database.json'
                });
                
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
        let db = fs.readFileSync('./database.json');
        
        await conn.sendMessage(global.numberowner + '@s.whatsapp.net', {
            document: db,
            mimetype: 'application/json',
            fileName: 'database.json'
        });
        
        console.log('Auto backup performed successfully:', moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss'));
    } catch (error) {
        console.error('Error during auto backup:', error);
    }
};

const backupInterval = 6 * 60 * 60 * 1000; // ini 6 jam sekali kalo pengen ubah waktu backup nya ubah sja format time nya
setInterval(() => {
    performAutoBackup(conn);
}, backupInterval);

handler.help = ['autobackup on/off'];
handler.tags = ['owner'];
handler.command = /^autobackup$/i;
handler.owner = true;

export default handler;
