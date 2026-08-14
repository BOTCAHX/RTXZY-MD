const cooldown = 300000; // Default cooldown (5 minutes in milliseconds)
const cooldownAfterWork = 5 * 60 * 1000; // Cooldown after working (5 minutes in milliseconds)

let handler: WaPlugin = async (m, { isPrems, conn, text, usedPrefix, command }) => {
    const user = global.db.data.users[m.sender];

    if (user.job === 'Pengangguran') {
        throw `Kamu belum mempunyai pekerjaan. Ketik *${usedPrefix}lamarkerja* untuk melamar pekerjaan`;
    }


    if (user.jail === true) {
        throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*';
    }
    if (user.culik === true) {
        throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam sel penculik!*';
    }
        

    // Check cooldown between jobs and the post-work 5-minute cooldown
    if (Date.now() - user.pekerjaansatu < cooldown || user.pekerjaansatu + cooldownAfterWork > new Date()) {
        let remainingTime;
        if (Date.now() - user.pekerjaansatu < cooldown) {
            remainingTime = user.pekerjaansatu + cooldown - Date.now();
        } else {
            remainingTime = user.pekerjaansatu + cooldownAfterWork - Date.now();
        }
        let formattedTime = new Date(remainingTime).toISOString().substr(11, 8);
        throw `Kamu sudah pergi bekerja sebelumnya. Tunggu selama *${formattedTime}* untuk bekerja lagi`;
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
        'pembunuh bayaran': [31000, 31000, 40000],    
        'pemburu manusia': [31000, 31000, 40000],        
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

export default handler;