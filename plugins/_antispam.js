/*
@ bagian ini pengaturan untuk antispam nya
- Format waktu nya milisecond 
*/

const SPAM_TOTALSPAM = 5; // Total Spam 
const SPAM_RESET_TIME = 30000; // Reset time di sesi spam
const MAX_MESSAGE_DELAY = 2000; // delay maksimal pesan di terima oleh bot
const SPAM_BAN_DURATION = 180000 // waktu ban user

exports.before = async function (m) {
    if (!this.spam) this.spam = {}
    if (!this.groupStatus) this.groupStatus = {}
    
    if (!global.spam) return;
    
    let user = db.data.users[m.sender] || {};
    let chat = db.data.chats[m.chat] || {};
    
    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chat.isBanned) return;
    
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
    if (user.banned) return;

    const processSpam = async () => {
        if (!this.spam[m.sender] || !global.spam) return;
        
        if (this.spam[m.sender].count >= SPAM_TOTALSPAM) {
            user.banned = true;

            const groupId = m.chat;

            try {
                if (m.isGroup && global.gcspam) {
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
                            text: `🚫 SPAM TERDETEKSI!\n\nPengguna @${m.sender.split('@')[0]} telah mengirim ${SPAM_TOTALSPAM} pesan berturut-turut.\nGrup ditutup selama 3 menit.\nPelaku spam dibanned sementara.`,
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
                        }, SPAM_BAN_DURATION);
                    }
                } else {
                    await this.sendMessage(m.chat, { 
                        text: `🚫 SPAM TERDETEKSI!\n\nPengguna @${m.sender.split('@')[0]} telah mengirim ${SPAM_TOTALSPAM} pesan berturut-turut.\nPelaku spam dibanned sementara.`,
                        mentions: [m.sender]
                    });

                    setTimeout(async () => {
                        user.banned = false;
                        await this.sendMessage(m.chat, {
                            text: `✅ @${m.sender.split('@')[0]} telah di unban.`,
                            mentions: [m.sender]
                        });
                    }, SPAM_BAN_DURATION);
                }
            } catch (e) {
                console.error(e);
            }

            user.lastBanned = now + SPAM_BAN_DURATION;
            delete this.spam[m.sender];
        }
    };

    const currentTime = Number(m.messageTimestamp) || Date.now();

    if (this.spam[m.sender]) {
        const timeSinceLast = currentTime - this.spam[m.sender].lastspam;

        if (timeSinceLast <= MAX_MESSAGE_DELAY) {
            this.spam[m.sender].count++;
            this.spam[m.sender].lastspam = currentTime;
            await processSpam();
        } else {
            this.spam[m.sender] = {
                jid: m.sender,
                count: 1,
                lastspam: currentTime
            };
        }
    } else {
        this.spam[m.sender] = {
            jid: m.sender,
            count: 1,
            lastspam: currentTime
        };
    }

    setTimeout(() => {
        if (
            this.spam[m.sender] &&
            Date.now() - this.spam[m.sender].lastspam >= SPAM_RESET_TIME
        ) {
            delete this.spam[m.sender];
        }
    }, SPAM_RESET_TIME);
};
