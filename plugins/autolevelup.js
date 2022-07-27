const { color } = require('../lib/color')
const moment = require("moment-timezone")
let levelling = require('../lib/levelling')
module.exports = {
	before(m) {
		let user = global.db.data.users[m.sender]
		if (!user.autolevelup) return !0
		let before = user.level * 1
		while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++

		if (before !== user.level) {
			let chating = `Congratulations, you have leveled up!
*${before}* -> *${user.level}*
Use *.profile* to check`.trim()
			m.reply(chating)
			console.log(color(chating, 'pink'))
		}
	}
}
