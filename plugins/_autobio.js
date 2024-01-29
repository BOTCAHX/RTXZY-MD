module.exports = {
  before: async function all(m) {
    if (global.autobio) {
      setInterval(async () => {
        let uptime = process.uptime() * 1000;
        let bio = `🤖 Aktif Selama: ${clockString(uptime)} | 💌 by: ${wm}`;
        await this.updateProfileStatus(bio).catch(_ => _);
      }, 60000);
    }
  }
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
