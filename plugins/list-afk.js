async function handler(m, { conn }) {
  let afkUsers = Object.entries(global.db.data.users).filter(
    ([_, user]) => user.afk > -1,
  );

  if (afkUsers.length > 0) {
    let mentionsArray = []; 

    let usersText = afkUsers.map(([jid, user]) => {
      mentionsArray.push(jid); 

      let reason = user.afkReason
        ? "• *ALASAN* : " + user.afkReason
        : "• *TANPA ALASAN*";
      let duration = new Date() - user.afk;

      return `@${jid.split("@")[0]} (Jangka waktu: ${formatTime(duration)})\n${reason}`;
    });
    await conn.sendMessage(
      m.chat,
      {
        text: `*LIST AFK* :\n\n${usersText.join("\n\n")}`,
        mentions: mentionsArray,
      },
      { quoted: m },
    );
  } else {
    conn.reply(m.chat, "Tidak ada pengguna yang sedang AFK saat ini.", m);
  }
}

handler.command = handler.help = ['listafk'];
handler.tags = ['main'];
handler.group = true

module.exports = handler;

function formatTime(ms) {
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);

  let timeString = "";
  if (days > 0) timeString += `${days} hari `;
  if (hours > 0) timeString += `${hours} jam `;
  if (minutes > 0) timeString += `${minutes} menit `;
  if (seconds > 0) timeString += `${seconds} detik`;

  return timeString.trim();
}
