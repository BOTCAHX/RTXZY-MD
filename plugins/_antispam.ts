const exports: WaPlugin = {} as WaPlugin;

const SPAM_THRESHOLD = 5; // Number of messages that count as spam
const SPAM_WINDOW = 1000; // Time window (1 second)

exports.before = async function (m) {
    if (!this.spam) this.spam = {};
    if (!this.groupStatus) this.groupStatus = {};
    
    let user = global.db.data.users[m.sender] || {};
    let chat = global.db.data.chats[m.chat] || {};
    
    // Only run in private chats, or groups with antispam enabled
    if (m.isGroup && !chat.antispam) return;
    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chat.isBanned) return;
    
    // Only process messages that start with a command prefix
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
    
    if (user.banned) return true; // Stop processing while still banned

    // Initialize the user's message timestamp history
    if (!this.spam[m.sender]) this.spam[m.sender] = [];
    
    this.spam[m.sender].push(now);
    
    // Drop timestamps older than SPAM_WINDOW
    this.spam[m.sender] = this.spam[m.sender].filter(time => now - time <= SPAM_WINDOW);

    // Ban a user who sends SPAM_THRESHOLD (5) messages within the window
    if (this.spam[m.sender].length >= SPAM_THRESHOLD) {
        user.banned = true;
        const groupId = m.chat;
        const banDuration = m.isGroup ? 180000 : 30000; // 3 minutes for groups, 30 seconds for private chats
        user.lastBanned = now + banDuration;
        
        // Delete history now that action has been taken
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
        
        return true; // Stop command execution; the user is banned for spam
    }
};

export default exports;
