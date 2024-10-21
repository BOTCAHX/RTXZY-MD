let handler = async (m, {
	conn,
	args
}) => {
	if (!args[0] || isNaN(args[0])) {
		throw '*Example*: .buyattack 100';
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
		throw `Maaf, uang kamu tidak cukup untuk membeli ${count} attack. Harga 1 attack adalah ${hrg} money.\n\nMembutuhkan ${price} Money.`;
	}
	user.money -= price;
	user.attack += count;
	conn.reply(m.chat, `Berhasil membeli ${count} attack dengan harga ${price} money.`, m);
}

handler.help = ['buyattack <jumlah>'];
handler.tags = ['rpg'];
handler.command = /^buyattack$/i;
handler.register = true;

module.exports = handler;