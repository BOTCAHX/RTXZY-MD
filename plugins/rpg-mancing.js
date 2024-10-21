let {
	MessageType
} = require('@adiwajshing/baileys');

let wm = global.wm;
let handler = async (m, {
	conn,
	usedPrefix,
	owner
}) => {
		let lastFishingTime = global.db.data.users[m.sender].lastmancing || 0;
		let timeDiff = Date.now() - lastFishingTime;
		let remainingTime = 180000 - timeDiff; 

		if (global.db.data.users[m.sender].fishingrod > 0) {
			if (timeDiff >= 180000) { 
				let ikan = Math.floor(Math.random() * 30);
				let lele = Math.floor(Math.random() * 15);
				let nila = Math.floor(Math.random() * 10);
				let bawal = Math.floor(Math.random() * 10);
				let udang = Math.floor(Math.random() * 39);
				let paus = Math.floor(Math.random() * 2);
				let kepiting = Math.floor(Math.random() * 27);

				let imageUrl = 'https://api.betabotz.eu.org/api/tools/get-upload?id=f/arit56zv.jpg';
				let totalCatch = nila + bawal + ikan + lele + udang + paus + kepiting;

				let mcng = `•  *Hasil Mancing:*
        
◦  🐟 Ikan nila: ${nila}
◦  🐡 Bawal: ${bawal}
◦  🐟 Lele: ${lele}
◦  🐟 Ikan: ${ikan}
◦  🦐 Udang: ${udang}
◦  🐋 Paus: ${paus}
◦  🦀 Kepiting: ${kepiting}`;

				setTimeout(() => {
					conn.sendFile(m.chat, imageUrl, 'mancing.jpg', mcng, m);
				}, 28000);
				setTimeout(() => {
					conn.reply(m.chat, `umpan di makan ikan!!, kamu tarik pancing nya!`, m)
				}, 18000);
				setTimeout(() => {
					conn.reply(m.chat, `tunggu sampai ikan makan umpan`, m)
				}, 8000);
				setTimeout(() => {
					conn.reply(m.chat, `pergi mancing🎣`, m)
				}, 0);

				global.db.data.users[m.sender].nila += nila;
				global.db.data.users[m.sender].ikan += ikan;
				global.db.data.users[m.sender].lele += lele;
				global.db.data.users[m.sender].bawal += bawal;
				global.db.data.users[m.sender].udang += udang;
				global.db.data.users[m.sender].lastmancing = Date.now();
				global.db.data.users[m.sender].udang += udang;
				global.db.data.users[m.sender].paus += paus ;
				global.db.data.users[m.sender].udang +=  udang;
				global.db.data.users[m.sender].kepiting += kepiting ;
				global.db.data.users[m.sender].fishingrod -= 1;
				global.db.data.users[m.sender].totalPancingan += totalCatch;
			} else {
				let remainingTimeStr = formatTime(remainingTime);
				conn.reply(m.chat, `kamu baru mancing, tunggu selama ${remainingTimeStr}`, m);
			}
		} else {
			conn.reply(m.chat, '[❗] kamu gak punya pancingan\' bikin dulu di craft 🎣', m);
		}
}

handler.help = ['mancing'];
handler.tags = ['rpg'];
handler.command = /^(mancing|memancing)$/i;

module.exports = handler;

function formatTime(ms) {
	let seconds = Math.floor(ms / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);

	seconds %= 60;
	minutes %= 60;
	hours %= 24;

	let hStr = hours.toString().padStart(2, '0');
	let mStr = minutes.toString().padStart(2, '0');
	let sStr = seconds.toString().padStart(2, '0');

	return `${hStr}:${mStr}:${sStr}`;
}