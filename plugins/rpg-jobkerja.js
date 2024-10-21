const cooldown = 300000; // Cooldown default (5 menit dalam milidetik)
const cooldownAfterWork = 5 * 60 * 1000; // Cooldown setelah bekerja selama 5 menit (dalam milidetik)

let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
    const user = global.db.data.users[m.sender];

    if (user.jail === true) {
        throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*';
    }

    // Cek cooldown antara pekerjaan dan cooldown setelah bekerja selama 5 menit
    if (new Date() - user.pekerjaansatu < cooldown || user.pekerjaansatu + cooldownAfterWork > new Date()) {
        let remainingTime;
        if (new Date() - user.pekerjaansatu < cooldown) {
            remainingTime = user.pekerjaansatu + cooldown - new Date();
        } else {
            remainingTime = user.pekerjaansatu + cooldownAfterWork - new Date();
        }
        let formattedTime = new Date(remainingTime).toISOString().substr(11, 8);
        throw `Kamu sudah pergi bekerja sebelumnya. Tunggu selama *${formattedTime}* untuk bekerja lagi`;
    }

    if (user.job == '-') {
        throw 'Kamu belum mempunyai pekerjaan. Ketik */lamarkerja* untuk melamar pekerjaan';
    }

    const jobList = {
        'gojek': [11000, 10000, 10000],
        'kantoran': [32000, 32000, 40000],
        'game developer': [420000, 410000, 400000],
        'backend developer': [130000, 130000, 140000],
        'web developer': [72000, 72000, 80000],
        'sopir': [26000, 25000, 25000],
        'kurir': [15000, 14000, 14000],
        'frontend developer': [52000, 52000, 60000],
        'fullstack developer': [210000, 210000, 200000],
        'pemain sepak bola': [900000, 900000, 1000000],
        'karyawan indomaret': [27000, 27000, 30000],
        'polisi': [31000, 31000, 40000],
        'trader': [1700000, 1700000, 2000000],
        'dokter': [1700000, 1700000, 2000000],
        'hunter': [1700000, 1700000, 2000000]
    };

    if (jobList[user.job]) {
        let [moneyMax, expMax, bankMax] = jobList[user.job];
        let money = Math.floor(Math.random() * moneyMax);
        let exp = Math.floor(Math.random() * expMax);
        let bank = Math.floor(Math.random() * bankMax);

        user.money += money;
        user.exp += exp;
        user.jobexp += 1;
        user.pekerjaansatu = new Date().getTime();

        let message = `*Berikut pendapatan dari pekerjaan ${user.job}* 
        \n• Money : Rp. ${money}
        \n• Exp : ${exp}
        \n• Tingkat Kerja Keras : +1 🧟‍♂️`;

        conn.reply(m.chat, message, m);
    }
};
handler.help = ['jobkerja'];
handler.tags = ['rpg'];
handler.command = /^(jobkerja)$/i;
handler.limit = true;

module.exports = handler;