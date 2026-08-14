import axios from 'axios';
import { setInterval } from 'timers';
import type { WaApiJson } from '../types/api.js';

let location = 'Jakarta'; 

async function getWeatherInfo() {
    try {
        const url = `https://api.botcahx.eu.org/api/tools/cuaca?query=${encodeURIComponent(location)}&apikey=${btc}`;
        const response = await axios.get(url);
        const res = response.result as WaApiJson | undefined;

        if (!res) {
            console.log('Data cuaca tidak tersedia');
            return;
        }
        const weatherInfo = {
            location: res.location,
            country: res.country,
            weather: res.kondisi,
            currentTemp: res.currentTemp,
            maxTemp: res.maxTemp,
            minTemp: res.minTemp, 
            humidity: res.humidity,
            windSpeed: res.angin,
        };
        

        console.log(`
        Lokasi: ${weatherInfo.location}
        Cuaca: ${weatherInfo.weather}
        Suhu saat ini: ${weatherInfo.currentTemp}
        Suhu tertinggi: ${weatherInfo.maxTemp}
        Suhu terendah: ${weatherInfo.minTemp}
        Kelembapan: ${weatherInfo.humidity}
        Angin: ${weatherInfo.windSpeed}
        `);

        sendWeatherReminderToGroups(weatherInfo);
    } catch (error) {
        console.error('[❗] Terjadi kesalahan saat mengambil data cuaca:', error);
    }
}

async function sendWeatherReminderToGroups(weatherInfo) {
    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (chat.notifcuaca) {
            const reminderMessage = `🌤️ *PENGINGAT CUACA* 🌤️\n\n📍 Lokasi: ${weatherInfo.location}\n🌍 Negara: ${weatherInfo.country}\n🌦️ Cuaca: ${weatherInfo.weather}\n🌡️ Suhu saat ini: ${weatherInfo.currentTemp}\n🌡️ Suhu tertinggi: ${weatherInfo.maxTemp}\n🌡️ Suhu terendah: ${weatherInfo.minTemp}\n💧 Kelembapan: ${weatherInfo.humidity}\n🌬️ Angin: ${weatherInfo.windSpeed}\n\nTetap waspada dan jaga kesehatan!`;
            await sendReminderToGroup(chatId, reminderMessage); 
        }
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text });
}

function checkTimeAndSendWeather() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Adjust the hours below to change when the reminder runs
    if ((hours === 7 || hours === 12 || hours === 18) && minutes === 0) { 
        console.log('Mengambil data cuaca terbaru...');
        getWeatherInfo(); 
    }
}

function startDailyWeatherReminder() {
    setInterval(() => {
        checkTimeAndSendWeather(); 
    }, 60 * 1000); // Check every 60 seconds
}

startDailyWeatherReminder();