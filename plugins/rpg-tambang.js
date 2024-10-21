const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createTambangs() {
    const areaNames = [
        "Emas", "Perak", "Berlian", "Batu Permata", "Uranium", "Emas Hitam",
        "Kristal", "Rubi", "Safir", "Topaz", "Ametis", "Zamrud", "Opal", "Kuarsa",
        "Safir Merah", "Topaz Biru", "Ametis Ungu", "Rubi Merah", "Emas Putih",
        "Berlian Biru", "Batu Permata Hitam", "Uranium Radioaktif", "Kristal Langka",
        "Diam", "Pirus", "Garnet", "Kalimaya", "Kuarsit", "Lapis Lazuli", "Rodokrosit",
        "Yaspis", "Malakit", "Hessonit", "Peridot", "Amber", "Kornerupin",
        "Morganit", "Labradorit", "Akuamarin", "Tanzanite", "Batu Delima", "Akuamarin",
        "Kunzit", "Maw-sit-sit", "Sphene", "Kyanite", "Alexandrite", "Variscite",
        "Tambang Baru 1", "Tambang Baru 2", "Tambang Baru 3"
    ];

    let tambangs = areaNames.map((areaName, i) => ({
        area: `Tambang ${areaName}`,
        txt: areaName.toLowerCase().replace(/ /g, "_"),
        reward: {
            exp: 50 + (i * 50),
            resources: {
                diamond: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                gold: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                stone: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                emerald: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                coal: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                iron: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0
            }
        }
    }));
    return tambangs;
}

function formatTime(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n' + d, ' *Hari ☀️*\n', h, ' *Jam 🕐*\n', m, ' *Menit ⏰*\n', s, ' *Detik ⏱️*'].map(v => v.toString().padStart(2, 0)).join('');
}

async function handler(m, { conn, text }) {
    conn.tambang = conn.tambang || {};
    let user = global.db.data.users[m.sender];

    if (m.sender in conn.tambang) {
        if (conn.tambang[m.sender].currentArea >= conn.tambang[m.sender].areas.length) {
            return m.reply("🏆 Anda telah menyelesaikan semua area pertambangan.");
        }
        return m.reply("⏳ Anda masih memiliki area pertambangan yang belum selesai. Silakan selesaikan terlebih dahulu.");
    } else {
        if (text === 'start') {
            let tambangs = createTambangs();

            if (!user) return m.reply("📝 Silakan daftar untuk bermain game.");
            if (user.healt === 0 || user.stamina === 0) return m.reply("❗ Stamina/healt Anda kurang dari 100.");
            if (typeof user.exp !== "number") global.db.data.users[m.sender].exp = 0;
            if (typeof user.resources !== "object") global.db.data.users[m.sender].resources = { diamond: 0, emerald: 0, coal: 0, iron: 0 };
            if (typeof user.kerjasatu !== "number") global.db.data.users[m.sender].kerjasatu = 0;

            const cooldown = 5 * 60 * 1000; // 5 menit cooldown
            let timers = cooldown - (Date.now() - (user.kerjasatu || 0));
            if (timers > 0) return m.reply(`Silakan tunggu ${formatTime(timers)} lagi sebelum memulai pertambangan baru.`);

            let { area, txt, reward } = tambangs[0]; // Start with the first area
            let currentArea = 0;
            let hasilTambang = 0;
            let totalReward = { diamond: 0, emerald: 0, coal: 0, iron: 0 };

            conn.tambang[m.sender] = {
                areas: tambangs,
                currentArea,
                hasilTambang,
                lastTambangTime: Date.now(),
                totalReward,
            };

            let caption = `🏞️ *AREA PERTAMBANGAN:* ${area}\n\n🪨 Ketik *'${txt}'* untuk memulai pertambangan di area ini.\n🔍 Jumlah hasil tambang yang didapatkan: ${hasilTambang}\n💰 Exp yang didapatkan: ${reward.exp}\n💎 Resources yang didapatkan: Diamond: ${reward.resources.diamond}, Emerald: ${reward.resources.emerald}, Coal: ${reward.resources.coal}, Iron: ${reward.resources.iron}`;

            return m.reply(caption);
        } else {
            let instructions = "🏅 Selamat datang di game pertambangan!\n";
            instructions += "Ketik *'tambang start'* untuk memulai pertambangan.\n";
            instructions += "Ketik *'stop'* untuk menghentikan pertambangan saat sedang bermain.";

            return m.reply(instructions);
        }
    }
}

handler.before = async m => {
    conn.tambang = conn.tambang || {};
    if (!(m.sender in conn.tambang)) return;
    if (m.isBaileys) return;

    let { areas, currentArea, hasilTambang, lastTambangTime, totalReward } = conn.tambang[m.sender];
    const cooldown = 5 * 60 * 1000; // 5 menit cooldown
    let user = global.db.data.users[m.sender];

    let msg = m.text.toLowerCase();
    if (msg === 'stop') {
        m.reply("❌ Pertambangan telah dihentikan. Ketik *'tambang start'* untuk memulai pertambangan kembali.");
        delete conn.tambang[m.sender];
        return false;
    } else if (currentArea < areas.length) {
        if (areas[currentArea].txt === msg) {
            let { area, reward } = areas[currentArea];
            user.exp += reward.exp;
            for (let resource in reward.resources) {
                user.resources[resource] += reward.resources[resource];
                totalReward[resource] += reward.resources[resource];
            }
            hasilTambang++;
            currentArea++;
            conn.tambang[m.sender].currentArea = currentArea;
            conn.tambang[m.sender].hasilTambang = hasilTambang;
            conn.tambang[m.sender].totalReward = totalReward;
            conn.tambang[m.sender].lastTambangTime = Date.now();

            if (currentArea >= areas.length) {
                m.reply(`🎉 Selamat! Anda telah menyelesaikan semua area pertambangan.\nTotal hasil tambang: ${hasilTambang}\nExp yang didapatkan: ${reward.exp}\nTotal resources yang didapatkan: Diamond: ${totalReward.diamond}, Emerald: ${totalReward.emerald}, Coal: ${totalReward.coal}, Iron: ${totalReward.iron}`);
                delete conn.tambang[m.sender];
                return false;
            } else {
                let nextArea = areas[currentArea].area;
                let caption = `🏞️ *AREA PERTAMBANGAN:* ${nextArea}\n\n🪨 Ketik *'${areas[currentArea].txt}'* untuk memulai pertambangan di area ini.\n🔍 Jumlah hasil tambang yang didapatkan: ${hasilTambang}\n💰 Exp yang didapatkan: ${reward.exp}\n💎 Resources yang didapatkan: Diamond: ${reward.resources.diamond}, Emerald: ${reward.resources.emerald}, Coal: ${reward.resources.coal}, Iron: ${reward.resources.iron}\n\n> ketik *stop* untuk berhenti`;
                m.reply(caption);
                return false;
            }
        }
    }
};

handler.help = ['tambang'];
handler.tags = ['rpg'];
handler.command = /^(tambang)$/i;
handler.group = true;
handler.register = true;

module.exports = handler;