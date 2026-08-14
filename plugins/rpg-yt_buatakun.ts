let handler: WaPlugin = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender];

    try {
        if (command === 'createakunyt') {
            if (args.length === 0) {
                return m.reply("Silakan masukkan nama akun YouTube Anda.\nContoh: .createakunyt Mahiru");
            }

            let youtubeAccountName = args.join(' ');

            user.youtube_account = youtubeAccountName;
            m.reply(`Akun YouTube Anda telah berhasil dibuat/diedit\nchannel: ${youtubeAccountName}`);
        } else if (command === 'deleteakun') {
            if (!user.youtube_account) {
                return m.reply("Anda belum memiliki akun YouTube.");
            }

            delete user.youtube_account;
            m.reply("Akun YouTube Anda telah dihapus dari sistem kami.");
        } else if (/live/i.test(command) && args[0] === 'youtuber') {
            if (!user.youtube_account) {
                return m.reply("Buat akun terlebih dahulu\nKetik: .createakunyt");
            }

            // Existing code for the 'live youtuber' command
        } else {
            return await m.reply("Perintah tidak dikenali.\n*.akunyt*\n> ᴜɴᴛᴜᴋ ᴍᴇɴɢᴇᴄᴇᴋ ᴀᴋᴜɴ ʏᴏᴜᴛᴜʙᴇ ᴀɴᴅᴀ\n*.live [judul live]*\n> ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀᴋᴛɪᴠɪᴛᴀs ʟɪᴠᴇ sᴛʀᴇᴀᴍɪɴɢ.");
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

handler.help = ['createakunyt', 'deleteakun'];
handler.tags = ['rpg'];
handler.command = /^(createakunyt|deleteakun)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;