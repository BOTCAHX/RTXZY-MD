const axios = require('axios');
const { setInterval } = require('timers');

let lastGempaData = null; 

async function getGempaInfo() {
    try {
        const url = `https://api.botcahx.eu.org/api/search/gempa?apikey=${btc}`;
        const response = await axios.get(url);
        const res = response.data.result.result;

        if (!res) {
            console.log('Data gempa tidak tersedia');
            return;
        }


        if (lastGempaData && lastGempaData.waktu === res.waktu) {
            console.log('Data gempa belum berubah, tidak ada pengingat.');
            return;
        }

        lastGempaData = res; 

        const gempaInfo = {
            waktu: res.waktu,
            lintang: res.Lintang,
            bujur: res.Bujur,
            magnitude: res.Magnitudo,
            kedalaman: res.Kedalaman,
            wilayah: res.Wilayah,
            potensi: res.Potensi,
            gambar: res.image
        };

        console.log(`
        Waktu Gempa: ${gempaInfo.waktu}
        Magnitudo: ${gempaInfo.magnitude}
        Wilayah: ${gempaInfo.wilayah}
        Potensi: ${gempaInfo.potensi}
        Gambar: ${gempaInfo.gambar}
        `);

        sendGempaReminderToGroups(gempaInfo); 
    } catch (error) {
        console.error('[❗] Terjadi kesalahan saat mengambil data gempa:', error);
    }
}

async function sendGempaReminderToGroups(gempaInfo) {
    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (chat.notifgempa) {
            const reminderMessage = `🚨 *PENGINGAT GEMPA BUMI* 🚨\n\n🕒 Waktu: ${gempaInfo.waktu}\n🌍 Wilayah: ${gempaInfo.wilayah}\n💥 Magnitudo: ${gempaInfo.magnitude}\n🌐 Lintang: ${gempaInfo.lintang}\n🌐 Bujur: ${gempaInfo.bujur}\n🔍 Kedalaman: ${gempaInfo.kedalaman}\n🌊 Potensi: ${gempaInfo.potensi}\n📷 Gambar Peta: ${gempaInfo.gambar}\n\nJaga keselamatan kalian!`;
            await sendReminderToGroup(chatId, reminderMessage); 
        }
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); 
}


function startGempaReminder() {
    setInterval(() => {
        console.log('Mengecek data gempa terbaru...');
        getGempaInfo();
    }, 60 * 60 * 1000); 
}

startGempaReminder();