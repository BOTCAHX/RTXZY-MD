let handler = m => m;

handler.before = async function (m) {
  let users = global.db.data.users[m.sender];
  if (!m.quoted || m.quoted.sender != this.user.jid || !/^Berapa jawaban dari/i.test(m.quoted.text)) return !0;
  
  this.math = this.math ? this.math : {};
  let id = m.chat;
  
  if (!(id in this.math)) {
    return m.reply('Soal itu telah berakhir atau kadaluwarsa.');
  }
  
  if (m.quoted.id == this.math[id][0].key.id) {
    let math = JSON.parse(JSON.stringify(this.math[id][1]));
    
    if (m.text == math.jawaban) {
      users.exp += math.bonus;
      users.money += math.money;
      
      clearTimeout(this.math[id][3]);
      delete this.math[id];
      
      m.reply(`🎉 *Jawaban Benar!* 🎉\n\nKamu mendapatkan:\n+${math.bonus} XP\n+${math.money} Money`);
    } else {
      this.math[id][2]--;
      if (this.math[id][2] == 0) {
        clearTimeout(this.math[id][3]);
        delete this.math[id];
        m.reply(`*Kesempatan habis!* 😥\nJawaban yang benar adalah: *${math.jawaban}*`);
      } else {
        m.reply(`*Jawaban Salah!* ❌\nMasih ada ${this.math[id][2]} kesempatan.`);
      }
    }
  }
  return !0;
};

module.exports = handler;