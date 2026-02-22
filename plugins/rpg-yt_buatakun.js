// Handler function
let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender];

    try {
        if (command === 'createakunyt') {
            if (args.length === 0) {
                return m.reply("Silakan masukkan nama akun YouTube Anda.\nContoh: .createakunyt Mahiru");
            }

            // Menggabungkan semua argumen menjadi satu string (nama akun YouTube)
            let youtubeAccountName = args.join(' ');

            // Set nama akun YouTube untuk pengguna
            user.youtube_account = youtubeAccountName;
            m.reply(`Akun YouTube Anda telah berhasil dibuat/diedit\nchannel: ${youtubeAccountName}`);
        } else if (command === 'deleteakun') {
            // Check if user has a YouTube account
            if (!user.youtube_account) {
                return m.reply("Anda belum memiliki akun YouTube.");
            }

            // Delete user's YouTube account
            delete user.youtube_account;
            m.reply("Akun YouTube Anda telah dihapus dari sistem kami.");
        } else if (/live/i.test(command) && args[0] === 'youtuber') {
            // Periksa apakah pengguna memiliki akun YouTube
            if (!user.youtube_account) {
                return m.reply("Buat akun terlebih dahulu\nKetik: .createakunyt");
            }

            // Kode eksisting untuk perintah 'live youtuber'
            // ...
        } else {
            return await m.reply("Perintah tidak dikenali.\n*.akunyt*\n> ᴜɴᴛᴜᴋ ᴍᴇɴɢᴇᴄᴇᴋ ᴀᴋᴜɴ ʏᴏᴜᴛᴜʙᴇ ᴀɴᴅᴀ\n*.live [judul live]*\n> ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀᴋᴛɪᴠɪᴛᴀs ʟɪᴠᴇ sᴛʀᴇᴀᴍɪɴɢ.");
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

// Metadata
handler.help = ['createakunyt', 'deleteakun']; // Add 'deleteakun' to help commands
handler.tags = ['rpg'];
handler.command = /^(createakunyt|deleteakun)$/i; // Modify to include deleteakun command
handler.register = true;
handler.group = true;
handler.rpg = true;
module.exports = handler;