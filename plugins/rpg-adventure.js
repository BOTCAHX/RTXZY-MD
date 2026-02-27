let handler = async (m, { conn, usedPrefix, owner }) => {
    try {
        let user = global.db.data.users[m.sender]

        // Check if the user has both sword and armor
        if (!user.sword) {
            conn.reply(m.chat, '⚔️ Kamu belum memiliki sword, ketik *' + usedPrefix + 'craft sword* untuk memulai adventure', m)
            return
        }

        if (!user.armor) {
            conn.reply(m.chat, '🛡️ Kamu belum memiliki armor, ketik *' + usedPrefix + 'craft armor* untuk memulai adventure', m)
            return
        }

        let __timers = (new Date - user.lastadventure)
        let _timers = (600000 - __timers) // 10 minutes in milliseconds
        let timers = clockString(_timers)
        if (user.healt > 79) {
            if (new Date - user.lastadventure > 600000) { // 10 minutes cooldown
                // Define monsters
                let monsters = [
                    { name: 'Goblin', health: 20, attack: 5 },
                    { name: 'Troll', health: 50, attack: 10 },
                    { name: 'Dragon', health: 100, attack: 20 },
                    { name: 'Zombie', health: 30, attack: 7 },
                    { name: 'Vampire', health: 40, attack: 15 },
                    { name: 'Werewolf', health: 70, attack: 17 },
                    { name: 'Skeleton', health: 25, attack: 8 },
                    { name: 'Orc', health: 60, attack: 12 },
                    { name: 'Witch', health: 45, attack: 14 },
                    { name: 'Golem', health: 80, attack: 18 },
                    { name: 'Demon', health: 120, attack: 25 },
                    { name: 'Phoenix', health: 150, attack: 30 },
                    { name: 'Hydra', health: 200, attack: 35 },
                    { name: 'Kraken', health: 250, attack: 40 },
                    { name: 'Minotaur', health: 300, attack: 45 },
                    { name: 'Basilisk', health: 350, attack: 50 },
                    { name: 'Griffin', health: 400, attack: 55 },
                    { name: 'Cyclops', health: 450, attack: 60 },
                    { name: 'Chimera', health: 500, attack: 65 },
                    { name: 'Leviathan', health: 550, attack: 70 }
                ]

                // Define bosses
                let bosses = [
                    { name: 'Ancient Dragon', health: 1000, attack: 100 },
                    { name: 'Dark Lord', health: 1200, attack: 120 },
                    { name: 'Titan', health: 1500, attack: 150 },
                    { name: 'Elder God', health: 2000, attack: 200 }
                ]

                // Pick a random monster or boss
                let isBoss = Math.random() < 0.1 // 10% chance to encounter a boss
                let enemy = isBoss ? bosses[Math.floor(Math.random() * bosses.length)] : monsters[Math.floor(Math.random() * monsters.length)]
                let enemyHealth = enemy.health
                let enemyAttack = enemy.attack

                // Simulate battle
                let userAttack = 10 // Example user attack power
                while (user.healt > 0 && enemyHealth > 0) {
                    enemyHealth -= userAttack
                    if (enemyHealth > 0) {
                        user.healt -= enemyAttack
                    }
                }

                if (user.healt <= 0) {
                    conn.reply(m.chat, `😵 Kamu kalah dalam pertarungan melawan ${enemy.name}. Sehatkan diri terlebih dahulu.`, m)
                    return
                }

                let armor = user.armor
                let rubah = user.rubah
                let kuda = user.kuda
                let kucing = user.kucing
                let serigala = user.serigala
                let _healt = `${Math.floor(Math.random() * 101)}`.trim()
                let healt = (_healt * 1)
                let exp = `${Math.floor(Math.random() * 10000)}`.trim()
                let uang = `${Math.floor(Math.random() * 100000)}`.trim()
                let _potion = ['1', '2', '3']
                let potion = _potion[Math.floor(Math.random() * _potion.length)]
                let _sampah = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50']
                let sampah = _sampah[Math.floor(Math.random() * _sampah.length)]
                let _diamond = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
                let diamond = _diamond[Math.floor(Math.random() * _diamond.length)]
                let _common = ['1', '2', '3']
                let common = _common[Math.floor(Math.random() * _common.length)]
let _uncommon = ['1', '2', '1', '2']
let uncommon = _uncommon[Math.floor(Math.random() * _uncommon.length)]
let _mythic = `${pickRandom(['1', '3', '1', '1', '2'])}`
let mythic = (_mythic * 1)
let _legendary = `${pickRandom(['1', '3', '1', '1', '2'])}`
let legendary = (_legendary * 1)
let itemrand = [`*Selamat anda mendapatkan item rare yaitu*\n${mythic} 🎁 Mythic Crate`, `*Selamat kamu mendapatkan item rare yaitu*\n${legendary} 🎁 Legendary Crate`]
let rendem = itemrand[Math.floor(Math.random() * itemrand.length)]
let peta = pickRandom([
    '🏯 Jepang', '🇰🇷 Korea', '🏝️ Bali', '🇺🇸 Amerika', '🇮🇶 Iraq', '🇸🇦 Arab', '🇵🇰 Pakistan', 
    '🇩🇪 German', '🇫🇮 Finlandia', '💤 Ke bawa dunia mimpi', '🌍 Ujung dunia', '🔴 Mars', '🇿🇼 Zimbabwe', 
    '🌕 Bulan', '🔵 Pluto', '☀️ Matahari', '💖 Hatinya dia', '🌲 Hutan Amazon', '🏜️ Gurun Sahara', 
    '🏔️ Pegunungan Himalaya', '🌊 Samudra Atlantik', '🏰 Kastil Terbengkalai', '🌌 Galaksi Andromeda', 
    '🏞️ Grand Canyon', '🏜️ Death Valley', '🏕️ Yosemite', '🏖️ Maldives', '🏙️ New York', '🇮🇳 India',
    '🇧🇷 Brazil', '🇿🇦 South Africa', '🇦🇺 Australia', '🇨🇦 Canada', '🇷🇺 Russia', '🇲🇽 Mexico', '🇳🇿 New Zealand',
    '🏞️ Patagonia', '🇫🇷 France', '🇪🇸 Spain', '🇮🇹 Italy', '🇬🇧 United Kingdom', '🇨🇭 Switzerland'
])
let str = `
🩸 Nyawa mu berkurang -${healt * 1} karena Kamu telah berpetualang sampai ${peta} dan melawan ${enemy.name}. Kamu mendapatkan:
✨ *Exp:* ${exp}
💰 *Uang:* ${uang}
🎫 *Tiketcoin:* 1
🗑️ *Sampah:* ${sampah}${potion == 0 ? '' : '\n🧪 *Potion:* ' + potion + ''}${diamond == 0 ? '' : '\n💎 *Diamond:* ' + diamond + ''}${common == 0 ? '' : '\n📦 *Common crate:* ' + common + ''}${uncommon == 0 ? '' : '\n🎁 *Uncommon crate:* ' + uncommon + ''}
`.trim()

setTimeout(() => {
    conn.reply(m.chat, str, m, {
        contextInfo: {
            externalAdReply: {
                mediaType: 1,
                title: wm,
                thumbnailUrl: 'https://telegra.ph/file/221ec27b2997f203569eb.jpg',
                renderLargerThumbnail: true,
                sourceUrl: ''
            }
        }
    })
}, 0)
setTimeout(() => {
    conn.reply(m.chat, rendem, m)
}, 1000)

user.healt -= healt * 1
user.exp += exp * 1
user.tiketcoin += 1
user.money += uang * 1
user.potion += potion * 1
user.diamond += diamond * 1
user.common += common * 1
user.uncommon += uncommon * 1
user.sampah += sampah * 1
user.mythic += mythic * 1
user.legendary += legendary * 1
user.lastadventure = new Date * 1

// Decrease sword and armor durability
user.sworddurability -= 1
user.armordurability -= 1

// Check for broken sword or armor
if (user.sworddurability <= 0) {
    user.sword = false
    conn.reply(m.chat, '⚔️ Sword kamu telah rusak, craft lagi untuk melanjutkan adventure.', m)
}
if (user.armordurability <= 0) {
    user.armor = false
    conn.reply(m.chat, '🛡️ Armor kamu telah rusak, craft lagi untuk melanjutkan adventure.', m)
}

} else {
    conn.reply(m.chat, `💧 Anda sudah berpetualang dan kelelahan, silahkan coba *${timers}* lagi`, m)
}
} else {
    conn.reply(m.chat, '🩸 Minimal 80 healt untuk bisa berpetualang, beli nyawa dulu dengan ketik *' + usedPrefix + 'shop buy potion <jumlah>*\ndan ketik *' + usedPrefix + 'use potion <jumlah>*', m)
}
} catch (e) {
    console.log(e)
    conn.reply(m.chat, 'Error', m)
}
}

handler.help = ['adventure']
handler.tags = ['rpg']
handler.command = /^(adventure)$/i
handler.limit = true
handler.group = true
handler.rpg = true
handler.fail = null

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000) // Hours
    let m = Math.floor(ms / 60000) % 60 // Minutes
    let s = Math.floor(ms / 1000) % 60 // Seconds
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
