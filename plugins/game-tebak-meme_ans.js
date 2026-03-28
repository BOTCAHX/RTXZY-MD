let poin = 10000;
const similarity = require("similarity");
const threshold = 0.72;

let handler = (m) => m;

handler.before = async function (m) {
  let id = m.chat;
  if (!m.quoted) return !0;
  this.tebakmeme = this.tebakmeme ? this.tebakmeme : {};
  if (!(id in this.tebakmeme)) return !0;
  if (m.quoted.id !== this.tebakmeme[id][0].key.id) return !0;
  let json = this.tebakmeme[id][1];
  let Jawaban = json.Jawaban.toLowerCase().trim();
  let teksUser = (m.text || "").toLowerCase().trim();
  if (!teksUser) return !0;
  if (teksUser === Jawaban) {
    global.db.data.users[m.sender].money += this.tebakmeme[id][2];
    let caption3 = `*Benar!*\n+${this.tebakmeme[id][2]} money`;
    conn.sendMessage(m.chat,  { image: { url: json.Img }, caption: caption3},{ quoted: m })
    clearTimeout(this.tebakmeme[id][3]);
    delete this.tebakmeme[id];
  } else if (similarity(teksUser, Jawaban) >= threshold) {
    m.reply(`*Dikit Lagi!*`);
  } else {
    m.reply(`*Salah!*`);
  }
  return !0;
};

handler.exp = 0;
module.exports = handler;