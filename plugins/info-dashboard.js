let handler = async (m, { conn }) => {
let stats = Object.entries(db.data.stats).map(([key, val]) => {
let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  let handlers = stats.slice(0, 50).map(({
   name, 
   total, 
   last,
   success,
   lastSuccess
 }, i) => {
    return `*${i + 1}.* *${name}*\n   • *Hits* : ${total}\n   • *Success* : ${success}\n   • *Last Used* : ${getTime(last)}\n   • *Last Success* : ${formatTime(lastSuccess)}`;
}).join('\n\n');
  conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: handlers, 
      contextInfo: {
        externalAdReply: {
          title: wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://telegra.ph/file/cf4f28ed3b9ebdfb30adc.png',
          sourceUrl: ''
        }
      },
      mentions: [m.sender]
    }
  }, {})
};

handler.command = handler.help = ['dashboard','totalhits']
handler.tags = ['info']
module.exports = handler;

function formatTime(time) {
  const date = new Date(time);
  const month = getMonthName(date.getMonth());
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

function getMonthName(month) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[month];
}

function getTime(ms) {
	var now = parseMs(+new Date() - ms)
	if (now.days) return `${now.days} days ago`
	else if (now.hours) return `${now.hours} hours ago`
	else if (now.minutes) return `${now.minutes} minutes ago`
	else return `a few seconds ago`
}
function parseMs(ms) {
	if (typeof ms !== 'number') throw 'Parameters must be filled with numbers'
	return {
		days: Math.trunc(ms / 86400000),
		hours: Math.trunc(ms / 3600000) % 24,
		minutes: Math.trunc(ms / 60000) % 60,
		seconds: Math.trunc(ms / 1000) % 60,
		milliseconds: Math.trunc(ms) % 1000,
		microseconds: Math.trunc(ms * 1000) % 1000,
		nanoseconds: Math.trunc(ms * 1e6) % 1000
	}
}
