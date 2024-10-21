let handler = async (m, {
	conn,
	args
}) => {
	if (!args[0] || isNaN(args[0])) {
		throw '*Example*: .buyspeed 100';
	}

	/*conn.sendMessage(m.chat, {
		react: {
			text: '✅',
			key: m.key,
		}
	})*/

	let count = parseInt(args[0]);
	let hrg = 50000;
	let price = count * hrg;
	let users = global.db.data.users;
	let user = users[m.sender];
	if (price > user.money) {
		throw `Maaf, uang kamu tidak cukup untuk membeli ${count} speed. Harga 1 speed adalah ${hrg} money.\n\nMembutuhkan ${price} Money.`;
	}
	user.money -= price;
	user.speed += count;
	conn.reply(m.chat, `Berhasil membeli ${count} speed dengan harga ${price} money.`, m);
}

handler.help = ['buyspeed <jumlah>'];
handler.tags = ['rpg'];
handler.command = /^buyspeed$/i;
handler.register = true;

module.exports = handler;