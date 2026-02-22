let axios = require('axios');
let moment = require('moment-timezone');

const timeZone = 'Asia/Jakarta';

async function getPrayerTimesAndSetReminders() {
    try {
        let city = 'jakarta';
        let url = `https://api.botcahx.eu.org/api/tools/jadwalshalat?kota=${city}&apikey=${btc}`;
        let response = await axios.get(url);

        let data = response.data;
        if (!data || data.result.code !== 200) {
            console.log(`[❗] Jadwal shalat untuk kota ${city.toUpperCase()} tidak ditemukan atau tidak tersedia.`);
            return;
        }
        const prayerTimes = getPrayerTimes(data);
        
        if (prayerTimes) {
            let jadwal = prayerTimes.timings;
            console.log(`
┌「 ${city.toUpperCase()} 」  
├ Subuh: ${jadwal.Fajr}
├ Dzuhur: ${jadwal.Dhuhr}
├ Ashar: ${jadwal.Asr}
├ Maghrib: ${jadwal.Maghrib}
├ Isya: ${jadwal.Isha}
└──────────`);

            setPrayerTimers(jadwal);
        } else {
            console.log(`[❗] Tidak ada data jadwal sholat untuk tanggal hari ini.`);
        }

    } catch (error) {
        console.error(`[❗] Terjadi kesalahan saat mengambil data.`);
    }
}

function getPrayerTimes(jsonData) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const todayString = `${day}-${month}-${year}`;

    for (const item of jsonData.result.data) {
        if (item.date.gregorian.date === todayString) {
            return item;
        }
    }
    return null;
}

function setPrayerTimers(jadwal) {
    let now = new Date();

    function calculateTimeDifference(prayerTime) {
        let cleanTime = prayerTime.replace(' (WIB)', '');
        let [hours, minutes] = cleanTime.split(':').map(Number);
        let prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        return prayerDate.getTime() - now.getTime();
    }

    let prayerTimes = [
        { name: 'Subuh', time: jadwal.Fajr },
        { name: 'Dzuhur', time: jadwal.Dhuhr },
        { name: 'Ashar', time: jadwal.Asr },
        { name: 'Maghrib', time: jadwal.Maghrib },
        { name: 'Isya', time: jadwal.Isha },
    ];

    for (let prayer of prayerTimes) {
        let timeDifference = calculateTimeDifference(prayer.time);

        if (timeDifference > 0) {
            setTimeout(() => {
                sendPrayerReminderToGroups(prayer.name, prayer.time);
            }, timeDifference);
        }
    }
}

async function sendPrayerReminderToGroups(prayerName, prayerTime) {
    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (chat.notifsholat) {
            const reminderMessage = `⏰ *PENGINGAT SHOLAT*\n\n🚨 Waktu Sholat ${prayerName} telah tiba!\nJam: ${prayerTime}\nJangan lupa untuk melaksanakan sholat.`;
            await sendReminderToGroup(chatId, reminderMessage); 
        }
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); 
}

function startDailyPrayerReminder() {
    getPrayerTimesAndSetReminders();

    setInterval(() => {
        let now = new Date();
        console.log(`Mengambil jadwal sholat untuk hari ini (${now.toLocaleDateString()})`);
        getPrayerTimesAndSetReminders();
    }, 6 * 60 * 60 * 1000); // setiap 6 jam seklai get data dari api
}

startDailyPrayerReminder();
