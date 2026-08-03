const exports = {};

const SPAM_THRESHOLD = 5; // Total pesan yang dianggap spam
const SPAM_WINDOW = 1000; // Jendela waktu (1 detik) - Sekejap mata!

exports.before = async function (m) {
    if (!this.spam) this.spam = {};
    if (!this.groupStatus) this.groupStatus = {};
    
    let user = global.db.data.users[m.sender] || {};
    let chat = global.db.data.chats[m.chat] || {};
    
    // Aktif di private chat atau jika di grup dan antispam aktif
    if (m.isGroup && !chat.antispam) return;
    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chat.isBanned) return;
    
    // Hanya tangkap pesan yang berawalan prefix (command)
    if (
        !m.text?.startsWith('.') &&
        !m.text?.startsWith('#') &&
        !m.text?.startsWith('!') &&
        !m.text?.startsWith('/') &&
        !m.text?.startsWith('\\')
    ) return;

    const now = Date.now();
   
    if (user.banned && now >= user.lastBanned) {
        user.banned = false;
        this.sendMessage(m.chat, {
            text: `@${m.sender.split('@')[0]} telah di unban dari sistem spam.`,
            mentions: [m.sender]
        });
    }
    
    if (user.banned) return true; // Stop pemrosesan jika masih di ban

    // Inisialisasi array history waktu pengiriman pesan user
    if (!this.spam[m.sender]) this.spam[m.sender] = [];
    
    // Tambahkan waktu pesan sekarang ke history
    this.spam[m.sender].push(now);
    
    // Bersihkan history dari pesan yang lebih lama dari SPAM_WINDOW (10 detik)
    this.spam[m.sender] = this.spam[m.sender].filter(time => now - time <= SPAM_WINDOW);

    // Jika dalam jendela 10 detik terdapat SPAM_THRESHOLD (5) pesan, maka BAN
    if (this.spam[m.sender].length >= SPAM_THRESHOLD) {
        user.banned = true;
        const groupId = m.chat;
        const banDuration = m.isGroup ? 180000 : 30000; // 3 menit untuk grup, 30 detik untuk PC
        user.lastBanned = now + banDuration;
        
        // Hapus history spam karena sudah ditindak
        delete this.spam[m.sender];
        
        try {
            if (m.isGroup) {
                if (!this.groupStatus[groupId]) {
                    this.groupStatus[groupId] = {
                        isClosing: false,
                        originalName: (await this.groupMetadata(groupId)).subject
                    };
                }

                if (!this.groupStatus[groupId].isClosing) {
                    this.groupStatus[groupId].isClosing = true;
                    await this.groupSettingUpdate(groupId, 'announcement');
                    await this.groupUpdateSubject(groupId, `${this.groupStatus[groupId].originalName} (SPAM)`);
                    
                    await this.sendMessage(groupId, {
                        text: `🚫 SPAM TERDETEKSI!\n\nPengguna @${m.sender.split('@')[0]} telah mengirim ${SPAM_THRESHOLD} pesan berturut-turut dalam waktu singkat.\nGrup ditutup selama 3 menit.\nPelaku spam dibanned sementara.`,
                        mentions: [m.sender]
                    });

                    setTimeout(async () => {
                        try {
                            user.banned = false;
                            await this.groupSettingUpdate(groupId, 'not_announcement');
                            await this.groupUpdateSubject(groupId, this.groupStatus[groupId].originalName);
                            await this.sendMessage(groupId, {
                                text: `✅ Grup telah dibuka kembali.\n@${m.sender.split('@')[0]} telah di unban.`,
                                mentions: [m.sender]
                            });
                            this.groupStatus[groupId].isClosing = false;
                        } catch {
                            console.error('Error reopening group');
                        }
                    }, banDuration);
                }
            } else {
                await this.sendMessage(m.chat, { 
                    text: `🚫 SPAM TERDETEKSI!\n\nPengguna @${m.sender.split('@')[0]} telah mengirim ${SPAM_THRESHOLD} pesan berturut-turut dalam waktu singkat.\nPelaku spam dibanned sementara selama 30 detik.`,
                    mentions: [m.sender]
                });

                setTimeout(async () => {
                    user.banned = false;
                    await this.sendMessage(m.chat, {
                        text: `✅ @${m.sender.split('@')[0]} telah di unban.`,
                        mentions: [m.sender]
                    });
                }, banDuration);
            }
        } catch (e) {
            console.error(e);
        }
        
        return true; // Stop eksekusi command karena user spam
    }
};

export default exports;
