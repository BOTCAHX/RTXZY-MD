let handler: WaPlugin = async (m, { isPrems, args, conn, text, command, usedPrefix }) => {
    let user = global.db.data.users[m.sender];

    const jobRequirements = {
        'gojek': { min: 10, max: 100000 },
        'kurir': { min: 10, max: 200000 },
        'sopir': { min: 10, max: 200000 },
        'karyawan indomaret': { min: 20, max: 300000 },
        'kantoran': { min: 30, max: 400000 },
        'dokter': { min: 50, max: 100000 },
        'frontend developer': { min: 40, max: 600000 },
        'web developer': { min: 40, max: 600000 },
        'backend developer': { min: 40, max: 600000 },
        'fullstack developer': { min: 50, max: 700000 },
        'game developer': { min: 40, max: 600000 },
        'pemain sepak bola': { min: 30, max: 500000 },
        'trader': { min: 40, max: 60000 },
        'hunter': { min: 20, max: 300000 },
        'polisi': { min: 100, max: 100000 }
    };

    function capitalizeFirstLetter(str) {
        let words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
        return words.join(" ");
    }

    if (!text || !Object.keys(jobRequirements).includes(text.toLowerCase())) {
        let kerjaan = `乂 *L I S T - J O B*

• Gojek 
• Kurir
• Sopir
• Karyawan Indomaret
• Kantoran
• Dokter
• Frontend Developer
• Web Developer
• Backend Developer
• Fullstack Developer
• Game Developer
• Pemain Sepak Bola
• Trader
• Hunter
• Polisi

• _Example_ : ${usedPrefix}${command} gojek`.trim();
        conn.reply(m.chat, kerjaan, m);
        return;
    }

    let job = text.toLowerCase();
    let kapital = capitalizeFirstLetter(job);
    let jobLevelRange = jobRequirements[job];

    if (user.level < jobLevelRange.min || user.level > jobLevelRange.max) {
        throw `Maaf, level Anda tidak mencukupi untuk menjadi ${kapital}. Level yang dibutuhkan adalah antara ${jobLevelRange.min} dan ${jobLevelRange.max}. Level Anda saat ini adalah ${user.level}.`;
    }

    setTimeout(() => {
        let lamarkerja1 = `Kamu telah memilih *${kapital}* sebagai pekerjaanmu

⤷ Tunggulah persetujuan dari pihak perusahaan dalam 1 menit agar diterima untuk bekerja.`.trim();
        conn.reply(m.chat, lamarkerja1, m);
    }, 0);

    setTimeout(() => {
        let lamarkerja2 = `🎉 Selamat, lamaran kerja kamu telah diterima oleh pihak perusahaan dan sekarang kamu dapat memulai untuk bekerja hari ini.

⤷ Ketik *.job* untuk melihat detail pekerjaan.`.trim();

        user.job = job;
    }, 30000);
};

handler.help = ['lamarkerja'];
handler.tags = ['rpg'];
handler.command = /^lamarkerja$/i;
handler.rpg = true
export default handler;

function capitalizeFirstLetter(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
}