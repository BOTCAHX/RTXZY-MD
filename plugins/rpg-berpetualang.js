const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createAdventures() {
    const areaNames = [
        "Hutan Belantara", "Desa Tersembunyi", "Gua Misterius", "Puncak Gunung", "Danau Terpencil",
        "Lembah Hijau", "Kastil Terbengkalai", "Pulau Rahasia", "Hutan Gelap", "Reruntuhan Kuno",
        "Kuil Terlupakan", "Ladang Pertempuran", "Kamp Pengungsi", "Hutan Bambu", "Desa Pantai",
        "Hutan Salju", "Padang Gurun", "Gua Kristal", "Kamp Bajak Laut", "Rawa Berkabut",
        "Gunung Berapi", "Gua Bawah Air", "Istana Es", "Lautan Badai", "Gua Naga"
    ];

    let adventures = areaNames.map((areaName, i) => ({
        area: `Petualangan di ${areaName}`,
        txt: areaName.toLowerCase().replace(/ /g, "_"),
        reward: {
            exp: 50 + (i * 50),
            loot: {
                potion: Math.floor(Math.random() * 10) + 1,
                diamond: Math.floor(Math.random() * 5) + 1,
                emas: Math.floor(Math.random() * 10) + 1,
                money: Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000,
                limit: Math.floor(Math.random() * 10) + 1
            }
        }
    }));
    return adventures;
}

function formatTime(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n' + d, ' *Hari ☀️*\n', h, ' *Jam 🕐*\n', m, ' *Menit ⏰*\n', s, ' *Detik ⏱️*'].map(v => v.toString().padStart(2, 0)).join('');
}

async function handler(m, { conn, text }) {
    conn.adventure = conn.adventure || {};
    let user = global.db.data.users[m.sender];

    if (m.sender in conn.adventure) {
        if (conn.adventure[m.sender].currentArea >= conn.adventure[m.sender].areas.length) {
            return m.reply("🏆 Anda telah menyelesaikan semua area petualangan.");
        }
        return m.reply("⏳ Anda masih memiliki area petualangan yang belum selesai. Silakan selesaikan terlebih dahulu.");
    } else {
        if (text === 'start') {
            let adventures = createAdventures();

            if (!user) return m.reply("📝 Silakan daftar untuk bermain game.");
            if (user.healt === 0 || user.stamina === 0) return m.reply("❗ Stamina/health Anda kurang dari 100.");
            if (typeof user.exp !== "number") global.db.data.users[m.sender].exp = 0;
            if (typeof user.loot !== "object") global.db.data.users[m.sender].loot = { potion: 0, diamond: 0, emas: 0, money: 0, limit: 0 };
            if (typeof user.lastGameTime !== "number") global.db.data.users[m.sender].kerjasatu = 0;

            const cooldown = 5 * 60 * 1000; // 5 menit cooldown
            let timers = cooldown - (Date.now() - (user.kerjasatu || 0));
            if (timers > 0) return m.reply(`Silakan tunggu ${formatTime(timers)} lagi sebelum memulai petualangan baru.`);

            let { area, txt, reward } = adventures[0]; // Start with the first area
            let currentArea = 0;
            let hasilPetualangan = 0;
            let totalReward = { potion: 0, diamond: 0, emas: 0, money: 0, limit: 0 };

            conn.adventure[m.sender] = {
                areas: adventures,
                currentArea,
                hasilPetualangan,
                lastPetualanganTime: Date.now(),
                totalReward,
            };

            let caption = `🏞️ *AREA PETUALANGAN:* ${area}\n\n🪓 Ketik *'${txt}'* untuk memulai petualangan di area ini.\n🔍 Jumlah hasil petualangan yang didapatkan: ${hasilPetualangan}\n💰 Exp yang didapatkan: ${reward.exp}\n🎁 Loot yang didapatkan: Potion: ${reward.loot.potion}, Diamond: ${reward.loot.diamond}, emas: ${reward.loot.emas}, Money: ${reward.loot.money}, Limit: ${reward.loot.limit}`;

            return m.reply(caption);
        } else {
            let instructions = "🏅 Selamat datang di game petualangan!\n";
            instructions += "Ketik *'berpetualang start'* untuk memulai petualangan.\n";
            instructions += "Ketik *'stop'* untuk menghentikan petualangan saat sedang bermain.";

            return m.reply(instructions);
        }
    }
}

handler.before = async m => {
    conn.adventure = conn.adventure || {};
    if (!(m.sender in conn.adventure)) return;
    if (m.isBaileys) return;

    let { areas, currentArea, hasilPetualangan, lastPetualanganTime, totalReward } = conn.adventure[m.sender];
    const cooldown = 5 * 60 * 1000; // 5 menit cooldown
    let user = global.db.data.users[m.sender];

    let msg = m.text.toLowerCase();
    if (msg === 'stop') {
        m.reply("❌ Petualangan telah dihentikan. Ketik *'berpetualang start'* untuk memulai petualangan kembali.");
        delete conn.adventure[m.sender];
        return false;
    } else if (currentArea < areas.length) {
        if (areas[currentArea].txt === msg) {
            let { area, reward } = areas[currentArea];
            user.exp += reward.exp;
            for (let item in reward.loot) {
                user.loot[item] += reward.loot[item];
                totalReward[item] += reward.loot[item];
            }
            hasilPetualangan++;
            currentArea++;
            conn.adventure[m.sender].currentArea = currentArea;
            conn.adventure[m.sender].hasilPetualangan = hasilPetualangan;
            conn.adventure[m.sender].totalReward = totalReward;
            conn.adventure[m.sender].lastPetualanganTime = Date.now();

            if (currentArea >= areas.length) {
                m.reply(`🎉 Selamat! Anda telah menyelesaikan semua area petualangan.\nTotal hasil petualangan: ${hasilPetualangan}\nExp yang didapatkan: ${reward.exp}\nTotal loot yang didapatkan: Potion: ${totalReward.potion}, Diamond: ${totalReward.diamond}, emas: ${totalReward.emas}, Money: ${totalReward.money}, Limit: ${totalReward.limit}`);
                delete conn.adventure[m.sender];
                return false;
            } else {
                let nextArea = areas[currentArea].area;
                let caption = `🏞️ *AREA PETUALANGAN:* ${nextArea}\n\n🪓 Ketik *'${areas[currentArea].txt}'* untuk memulai petualangan di area ini.\n🔍 Jumlah hasil petualangan yang didapatkan: ${hasilPetualangan}\n💰 Exp yang didapatkan: ${reward.exp}\n🎁 Loot yang didapatkan: Potion: ${reward.loot.potion}, Diamond: ${reward.loot.diamond}, emas: ${reward.loot.emas}, Money: ${reward.loot.money}, Limit: ${reward.loot.limit}\n\n> ketik *stop* untuk berhenti`;
                m.reply(caption);
                return false;
            }
        }
    }
};

handler.help = ['berpetualang'];
handler.tags = ['rpg'];
handler.command = /^(berpetualang)$/i;
handler.group = true;
handler.limit = true;
handler.register = true;
module.exports = handler;