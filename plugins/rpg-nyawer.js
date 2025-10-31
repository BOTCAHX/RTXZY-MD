let handler = async(m, { groupMetadata, command, conn, text, args, usedPrefix }) => {
    // Validasi input
    if (!args[0] || isNaN(args[0])) {
        throw '*Example*: .sawer 1000';
    }
    
    let count = parseInt(args[0]);
    
    // Validasi jumlah minimal
    if (count < 1) {
        return m.reply('Jumlah sawer minimal 1');
    }
    
    let user = global.db.data.users[m.sender];
    
    // Cek apakah pengirim punya cukup uang
    if (user.money < count) {
        return m.reply(`Money kamu tidak cukup untuk sawer sebanyak ${count}`);
    }
    
    // **COOLDOWN SYSTEM - 5 DETIK**
    if (!user.sawerCooldown) {
        user.sawerCooldown = 0;
    }
    
    let now = Date.now();
    let cooldownTime = 5000; // 5 detik dalam milidetik
    let timeLeft = user.sawerCooldown - now;
    
    if (timeLeft > 0) {
        let seconds = Math.ceil(timeLeft / 1000);
        return m.reply(`⏰ Sabar bos, jangan spam!\nFitur sawer ada jeda *${seconds} detik* lagi.`);
    }
    
    // Inisialisasi database grup jika belum ada
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {};
    }
    
    if (!global.db.data.chats[m.chat].sawerQueue) {
        global.db.data.chats[m.chat].sawerQueue = [];
    }
    
    if (!global.db.data.chats[m.chat].sawerIndex) {
        global.db.data.chats[m.chat].sawerIndex = 0;
    }
    
    let chat = global.db.data.chats[m.chat];
    
    // Ambil semua member kecuali pengirim
    let allMembers = groupMetadata.participants.map(v => v.id).filter(v => v !== m.sender);
    
    if (allMembers.length === 0) {
        return m.reply('Tidak ada member lain di grup ini');
    }
    
    // Update queue jika ada perubahan member (ada yang keluar/masuk)
    if (chat.sawerQueue.length === 0 || chat.sawerQueue.length !== allMembers.length) {
        chat.sawerQueue = [...allMembers];
        chat.sawerIndex = 0;
    }
    
    // Ambil penerima berdasarkan index saat ini
    let recipient = chat.sawerQueue[chat.sawerIndex];
    
    // Jika penerima tidak ada di grup lagi, skip ke berikutnya
    if (!allMembers.includes(recipient)) {
        chat.sawerQueue = [...allMembers];
        chat.sawerIndex = 0;
        recipient = chat.sawerQueue[chat.sawerIndex];
    }
    
    // **VALIDASI USER TERDAFTAR**
    if (!global.db.data.users[recipient]) {
        // Skip ke member berikutnya dan coba lagi
        let attempts = 0;
        let maxAttempts = allMembers.length;
        
        while (attempts < maxAttempts) {
            chat.sawerIndex = (chat.sawerIndex + 1) % chat.sawerQueue.length;
            recipient = chat.sawerQueue[chat.sawerIndex];
            
            if (global.db.data.users[recipient]) {
                break; // Ketemu user yang terdaftar
            }
            attempts++;
        }
        
        // Jika semua member belum terdaftar
        if (!global.db.data.users[recipient]) {
            return m.reply(`❌ Maaf bot tidak bisa mengirim uang ke *@${recipient.split`@`[0]}* karena dia belum terdaftar di dalam bot.\n\n_Suruh dia ketik .daftar atau .menu dulu ya!_`, null, { mentions: [recipient] });
        }
    }
    
    let recipientData = global.db.data.users[recipient];
    
    // Proses transfer
    user.money -= count;
    recipientData.money += count;
    
    // **SET COOLDOWN** (5 detik dari sekarang)
    user.sawerCooldown = now + cooldownTime;
    
    // Update index untuk giliran berikutnya
    chat.sawerIndex = (chat.sawerIndex + 1) % chat.sawerQueue.length;
    
    // Cari giliran berikutnya yang terdaftar
    let nextRecipient = chat.sawerQueue[chat.sawerIndex];
    let nextAttempts = 0;
    while (!global.db.data.users[nextRecipient] && nextAttempts < allMembers.length) {
        chat.sawerIndex = (chat.sawerIndex + 1) % chat.sawerQueue.length;
        nextRecipient = chat.sawerQueue[chat.sawerIndex];
        nextAttempts++;
    }
    
    let hsl = `🎁 *SAWER BERGILIRAN*\n\n` +
              `*@${recipient.split`@`[0]}* mendapat saweran dari @${m.sender.split`@`[0]}\n` +
              `💰 Jumlah: *${count}*\n\n` +
              `_Giliran selanjutnya: @${nextRecipient.split`@`[0]}_`;
    
    conn.reply(m.chat, hsl, m, { mentions: [recipient, m.sender, nextRecipient] });
}

handler.help = ['sawer <jumlah>'];
handler.tags = ['rpg'];
handler.command = /^(sawer|nyawer)$/i;
handler.group = true;
module.exports = handler;