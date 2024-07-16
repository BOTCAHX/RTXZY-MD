/* TITENI NEK DIHAPUS
* BY NAAAZZZ
* NANDA
* JOIN SL COMMUNITY 
*/
const { drawBoard } = require('../lib/ular_tangga.js');

const getRandom = function (array) {
			return array[Math.floor(Math.random() * array.length)]
			}

    let data = [{
    	map: "https://telegra.ph/file/46a0c38104f79cdbfe83f.jpg", 
	    nazz: { 2:38, 7:14, 8:31, 15:26, 21:42, 28:84, 36:44, 51:67, 78:98, 71:91, 87:94, 16:6, 46:25, 49:11, 62:19, 64:60, 74:53, 89:68, 92:88, 95:75, 99:80 }, 
		name: "Classic", 
		stabil_x: 20,
		stabil_y: 20
	},
{
		map: "https://telegra.ph/file/46a0c38104f79cdbfe83f.jpg", 
		nazz: { 2:38, 7:14, 8:31, 15:26, 21:42, 28:84, 36:44, 51:67, 78:98, 71:91, 87:94, 16:6, 46:25, 49:11, 62:19, 64:60, 74:53, 89:68, 92:88, 95:75, 99:80 }, 
		name: "Classic 2",
		stabil_x: 20,
		stabil_y: 20
	}]

let handler = async (m, { conn, text, command }) => {
	conn.ulartangga = conn.ulartangga ? conn.ulartangga : {};
    const ut = conn.ulartangga;
    const nazz_cmd = {
        create: () => {
            if(ut[m.chat]) throw "Masih ada sesi permainan di chat ini!";
            let anu = getRandom(data) 
            ut[m.chat] = { date: Date.now(), status: 'WAITING', host: m.sender, players: {}, map: anu.map, map_name: anu.name, ular_tangga: anu.nazz, stabil_x: anu.stabil_x, stabil_y: anu.stabil_y};
            ut[m.chat].players[m.sender] = { rank: 'HOST', langkah: 1 };
            return m.reply(`Sukses membuat room ular tangga dengan id "${m.chat}"`);
        },
        join: () => {
            if(!ut[m.chat]) throw "Tidak ada sesi permainan di chat ini!";
            if(ut[m.chat].players[m.sender]) return conn.sendMessage(m.chat, { text: `Anda sudah bergabung ke room @${ut[m.chat].host.split("@")[0]}`, mentions: [ut[m.chat].host] }, { quoted: m }) 
            if(Object.keys(ut[m.chat].players).length >= 4) throw "Player sudah melebihi limit!";
            if(ut[m.chat].status === 'PLAYING') throw "Game sedang berjalan, tidak dapat bergabung";
            ut[m.chat].players[m.sender] = { rank: 'MEMBER', langkah: 1 };
            return conn.sendMessage(m.chat, { text: `Sukses bergabung ke room @${ut[m.chat].host.split("@")[0]}`, mentions: [ut[m.chat].host] }, { quoted: m }) 
        },
        delete: () => {
            if(!ut[m.chat]) throw "Tidak ada sesi permainan di chat ini!";
            if((ut[m.chat].host !== m.sender) && ((Date.now() - ut[m.chat].date) < 300000)) throw "Anda tidak dapat menghapus sesi permainan, karena anda bukanlah host, anda dapat menghapus session setelah "+timeToFixed(300000 - (Date.now() - ut[m.chat].date))
            if((ut[m.chat].host !== m.sender) && (ut[m.chat].status === 'PLAYING') && ((Date.now() - ut[m.chat].date) < 1000000)) throw "Anda tidak dapat menghapus sesi permainan, karena anda bukanlah host dan permainan sedang berlangsung, anda dapat menghapus session setelah "+timeToFixed(1000000 - (Date.now() - ut[m.chat].date))
            delete ut[m.chat];
           m.reply(`Sukses menghapus sesi permainan dengan id "${m.chat}"`) 
        },
        info: async() => {
            if(!ut[m.chat]) throw "Tidak ada sesi permainan di chat ini!"; 
            return conn.sendMessage(m.chat, { text: `*Room Info*:
Host: @${ut[m.chat].host.split("@")[0]}
Status: ${ut[m.chat].status}
Map: ${ut[m.chat].map_name}
Players: ${Object.keys(ut[m.chat].players).length}/4
${Object.keys(ut[m.chat].players).map(v => "- @"+v.split("@")[0]).join("\n") }`, mentions: Object.keys(ut[m.chat].players) }, { quoted: m }) 
        },
        start: () => {
            if(!ut[m.chat]) throw "Tidak ada sesi permainan di chat ini!";
            if(ut[m.chat].status === 'PLAYING') throw "Pemainan sedang berjalan!"
            if(ut[m.chat].host !== m.sender) throw "Hanya host yang dapat memulai permainan!";
            ut[m.chat].status = "PLAYING";
            m.reply("Permainan dimulai!");
            start(m, ut, conn)
        }, 
       exit: () => {
       	if(!ut[m.chat]) throw "Tidak ada sesi permainan di chat ini!";
       if(!Object.keys(ut[m.chat].players).includes(m.sender)) throw "Anda tidak bergabung di pemainan!"
       delete ut[m.chat].players[m.sender]
       m.reply("Sukses keluar dari permainan") 
       if(!(Object.keys(ut[m.chat].players).length)) {
delete ut[m.chat]
       return m.reply("Karena tidak ada players, maka sesi permainan akan di hapus") 
       }
       if(ut[m.chat].status === 'PLAYING') {
       	const players = Object.keys(ut[m.chat].players)
        conn.sendMessage(m.chat, { text: `Giliran @${players[ut[m.chat].turn %= players.length].split("@")[0]} untuk mengetik *kocok*`, mentions: [players[ut[m.chat].turn %= players.length]] }, { quoted: m }) 
       }
       if(!Object.keys(ut[m.chat].players).includes(ut[m.chat].host)) {
       	let host = Object.keys(ut[m.chat].players)[0]
       	ut[m.chat].host = host
	       ut[m.chat].players[host].rank = 'HOST'
	conn.sendMessage(m.chat, { text: `Di karenakan host keluar, kedudukan host akan di pindah ke @${host.split("@")[0]}`, mentions: [host] }, { quoted: m }) 
       }
      }
    };
    if(!text || !Object.keys(nazz_cmd).includes(text)) return conn.sendMessage(m.chat, { text: `Halo! Selamat datang di Ular Tangga, permainan klasik yang penuh petualangan dan tantangan! Di sini, pemain harus melewati rintangan dan naik tangga untuk mencapai angka 100 dan menjadi pemenang. Tapi hati-hati, ada ular licin yang bisa membuatmu turun kembali, dan tangga yang akan membantumu meloncat lebih cepat ke puncak! 🐍🎲\n\nAyo, bergabunglah dalam petualangan seru di Ular Tangga dan rasakan keseruannya! 🎯🎮\n\nBerikut ini beberapa command ular tangga:\n${Object.keys(nazz_cmd).map(v => "⬡ "+v).join("\n")}\n\nContoh penggunaan: .ulartangga create`, contextInfo: {
            externalAdReply: {  
                title: 'Ular Tangga', 
                body: 'Created by nazz',
                thumbnailUrl: "https://telegra.ph/file/f5d7192eea4848b112d7b.jpg", 
                sourceUrl: 'youtube.com',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }}, { quoted: m }) 
    await nazz_cmd[text]();
    }

handler.command = /^(ulartangga|ut)$/i
handler.help = "ulartangga";
handler.tags = "game";
handler.owner = false

handler.before = async function (m, { conn, text, command }) {
	var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
	conn.ulartangga = conn.ulartangga ? conn.ulartangga : {};
    const ut = conn.ulartangga;
	if(body.toLowerCase().split(" ")[0] !== "kocok" || !ut.hasOwnProperty(m.chat)) return
	await kocok(m, ut, conn) 
	}

module.exports = handler;

async function kocok(m, ut, conn) {
        if(!ut[m.chat]) return;
        const players = Object.keys(ut[m.chat].players);
        if(!players.includes(m.sender)) return;
        const turns = (ut[m.chat].turn >= players.length) ? (ut[m.chat].turn %= players.length) : ut[m.chat].turn;
        if(players.indexOf(m.sender) !== turns) throw "Bukan giliran anda!";
        let warna = ["Merah","Kuning","Hijau","Biru"][players.indexOf(m.sender)]
        const dadu = Math.floor(Math.random() * 6 + 1)
       let key = await conn.sendMessage(m.chat, { sticker: { url: `https://raw.githubusercontent.com/fgmods/fg-team/main/games/dados/${dadu}.webp` }, packname: "Created by Naaazzzzz", author: "Naaazzzzz" }, { quoted: m })
        ut[m.chat].turn += 1;
        ut[m.chat].players[m.sender].langkah += dadu;
        let langkah = ut[m.chat].players[m.sender].langkah - dadu
        if(ut[m.chat].players[m.sender].langkah > 100) ut[m.chat].players[m.sender].langkah = 100 - (ut[m.chat].players[m.sender].langkah - 100);
        let nazz = ut[m.chat].ular_tangga
        let teks;
        if(Object.keys(nazz).includes(ut[m.chat].players[m.sender].langkah.toString())) {
            teks = ut[m.chat].players[m.sender].langkah > nazz[ut[m.chat].players[m.sender].langkah] ? "\nAnda termakan ular" : "\nAnda menaiki tangga";
            ut[m.chat].players[m.sender].langkah = nazz[ut[m.chat].players[m.sender].langkah];
        }
        const user1 = (ut[m.chat].players[players[0]]?.langkah ?? null) || null;
        const user2 = (ut[m.chat].players[players[1]]?.langkah ?? null) || null;
        const user3 = (ut[m.chat].players[players[2]]?.langkah ?? null) || null;
        const user4 = (ut[m.chat].players[players[3]]?.langkah ?? null) || null;
        if(ut[m.chat].players[m.sender].langkah === 100) {
        	global.db.data.users[m.sender].limit += 5
        global.db.data.users[m.sender].exp += 1000
        global.db.data.users[m.sender].coin += 5
            await conn.sendMessage(m.chat, { image: await drawBoard(ut[m.chat].map, user1, user2, user3, user4, ut[m.chat].stabil_x, ut[m.chat].stabil_y), caption: `@${m.sender.split("@")[0]} Menang\n+1000 exp\n+5 limit\n+5 Koin`, mentions: [m.sender] }, { quoted: key });
            delete ut[m.chat];
            return
        }
        return await conn.sendMessage(m.chat, { image: await drawBoard(ut[m.chat].map, user1, user2, user3, user4, ut[m.chat].stabil_x, ut[m.chat].stabil_y), caption: `${warna} *${langkah}* --> *${ut[m.chat].players[m.sender].langkah}*${teks ? teks:""}\nMenunggu @${players[ut[m.chat].turn %= players.length].split("@")[0]} mengetik *kocok*`, mentions: [players[ut[m.chat].turn %= players.length]]}, { quoted: key });
    }

async function start(m, ut, conn) {
    const players = Object.keys(ut[m.chat].players);
    if(!players.includes(m.sender)) return;
    let nazz_players = `Merah: @${players[0].split("@")[0]}`;
    if(players[1]) {
        nazz_players += `\nKuning: @${players[1].split("@")[0]}`
    }
    if(players[2]) {
        nazz_players += `\nHijau: @${players[2].split("@")[0]}`;
    }
    if(players[3]) {
        nazz_players += `\nBiru: @${players[3].split("@")[0]}`;
    }
    const teks = `*ULAR TANGGA*
    
${nazz_players}

Menunggu @${players[0].split("@")[0]} mengetik *kocok*`;
    conn.sendMessage(m.chat, { image: await drawBoard(ut[m.chat].map, 1, null, null, null, ut[m.chat].stabil_x, ut[m.chat].stabil_y), caption: teks, mentions: conn.parseMention(teks) }, { quoted: m })
    ut[m.chat].turn = 0
}

function timeToFixed(milliseconds) {
        var seconds = Math.floor(milliseconds / 1000);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var remainingSeconds = seconds % 60;
        return hours + ' Jam ' + minutes + ' Menit ' + remainingSeconds + ' Detik';
    }