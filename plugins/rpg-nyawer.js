let handler = async(m, { groupMetadata, command, conn, text, args, usedPrefix }) => {
    //if (!Number(text)) throw 'Masukkan Angka';
    if (!args[0] || isNaN(args[0])) {
		throw '*Example*: .sawer 1000';
	};
	let count = parseInt(args[0]);
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps[Math.floor(Math.random() * ps.length)]; // Memilih secara acak peserta dari array ps
    let name = await conn.getName(m.sender);
    let user = global.db.data.users[m.sender];
    let aa = global.db.data.users[a];
    
    if (user.money < count) return m.reply(`money kamu tidak cukup untuk sawer sebanyak ${count}`)

    let hsl = `*@${a.split`@`[0]}* Kamu mendapatkan saweran dari @${m.sender.split`@`[0]} sebesar *${count}* `;
    user.money -= count;
    aa.money += count;

    conn.reply(m.chat, hsl, m);
}

handler.help = ['sawer'];
handler.tags = ['rpg'];
handler.command = /^(sawer|nyawer)$/i;
handler.group = true;
module.exports = handler;