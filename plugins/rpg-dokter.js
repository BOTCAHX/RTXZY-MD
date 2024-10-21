const STATES = {
  IDLE: 0,
  SEARCHING: 1,
  FIGHTING: 2,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handler = async (m, { conn, usedPrefix, command, args }) => {
  const sender = m.sender;
  const user = global.db.data.users[sender]
  conn.playerr = conn.playerr || {};
  const player = conn.playerr[sender] || { Balance: 0, Pasien_Sembuh: 0, Waktu_Sembuh: 0, Obat_Super: 0, Lv: 1, State: STATES.IDLE };

  if (command === "dokter") {
    if (args.length === 0) {
      conn.reply(m.chat, "*👨‍⚕ Cara Bermain Game Dokter Dan Pasien 👨‍⚕*\n\n" +
        "🔍 Gunakan perintah *.dokter cari* untuk mencari pasien secara acak.\n" +
        "🚑 Anda akan menemukan jejak pencuri dan harus melakukan tindakan tertentu untuk menangkapnya.\n" +
        "💰 Anda akan mendapatkan imbalan jika berhasil menangkap pencuri.\n" +
        "💉 Pilih tindakan dari: .dokter beriobat, rawat, suntik dan operasi.\n" +
        "🔍 Gunakan perintah *.dokter <tindakan>* untuk merawat dan menyembuhkan pasien.\n" +
        "🔎 Anda dapat membeli obat super *.dokter item obat-super* untuk meningkatkan peluang menyembuhkan pasien.\n" +
        "🏆 Cek peringkat Anda dengan perintah *.dokter leaderboard*.\n" +
        "ℹ️ Gunakan perintah *.dokter status* untuk melihat status Anda saat ini.", m, {
        contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: '120363248530706545@newsletter', 
newsletterName: '>>BETABOTZ RPG<<', 
serverMessageId: -1
},
          externalAdReply: {
            mediaType: 1,
            title: 'BETABOTZ RPG',
            thumbnailUrl: 'https://telegra.ph/file/505b8d95fd7ee7b9481e3.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
          }
        }
      });
      return;
    }

    const subCommand = args[0];
    if (subCommand === "cari") {
      if (player.State !== STATES.IDLE) {
        return conn.reply(m.chat, "*🔍 Sedang dalam pencarian...*", m);
      }

      if (Date.now() - player.Waktu_Sembuh < 30000) {
        return conn.reply(m.chat, "*⏱️ Anda harus menunggu sebentar sebelum dapat mencari kembali.*", m);
      }

      player.State = STATES.SEARCHING;
      player.Waktu_Sembuh = Date.now();

      const level = player.Lv;
      const thiefActions = {
        1: ".dokter beriobat",
        2: ".dokter rawat",
        3: ".dokter suntik",
        4: ".dokter operasi",
      };
      const thiefAction = thiefActions[level];

      conn.reply(m.chat, `*🔍 Anda menemukan pasien level ${level}!* Untuk menyembuhkan pasien, lakukan tindakan: *${thiefAction.toUpperCase()}*.`, m);

      player.ThiefAction = thiefAction;
    } else if (subCommand === "status") {
      conn.reply(m.chat, `*👨‍⚕ Status Dokter 👨‍⚕*\n\n🔍 Sedang Mencari Pasien: ${player.State === STATES.SEARCHING ? "Ya" : "Tidak"}\n🚑 Pasien Sembuh: ${player.Pasien_Sembuh}\n💰 Balance: Rp${player.Balance.toLocaleString()}\n🏆 Level Pasien: ${player.Lv}`, m);
    } else if (subCommand === "item") {
      if (args.length === 1) {
        conn.reply(m.chat, "*🛒 Item Shop 🛒*\n\nObat Super - 500 coins\n" +
          `Gunakan *${usedPrefix}dokter item obat-super* untuk membeli kaca pembesar.`, m);
      } else {
        const item = args[1]?.toLowerCase();
        if (item === "obat-super") {
          if (player.Obat_Super) {
            return conn.reply(m.chat, "*🛒 Anda sudah memiliki obat super.*", m);
          }

          if (player.Balance < 500) {
            return conn.reply(m.chat, "*🛒 Balance Anda tidak cukup untuk membeli obat super.*", m);
          }

          player.Obat_Super = 1;
          player.Balance -= 500;
          conn.reply(m.chat, "*🛒 Anda berhasil membeli obat super.* Gunakan '.dokter cari' untuk meningkatkan peluang menyembuhkan pasien.", m);
        } else {
          conn.reply(m.chat, "*🛒 Item yang dimaksud tidak ditemukan.*", m);
        }
      }
    } else if (subCommand === "leaderboard") {
      // Sort playerr based on the number of thieves caught (descending order)
      const leaderboard = Object.entries(conn.playerr)
        .map(([playerId, playerData]) => ({ id: playerId, Pasien_Sembuh: playerData.Pasien_Sembuh }))
        .sort((a, b) => b.Pasien_Sembuh - a.Pasien_Sembuh)
        .slice(0, 5); // Show top 5 playerr

      let leaderboardMsg = "*🏆 Leaderboard 🏆*\n\n";
      for (let i = 0; i < leaderboard.length; i++) {
        leaderboardMsg += `${i + 1}. @${leaderboard[i].id.split("@")[0]} - ${leaderboard[i].Pasien_Sembuh} Pasien Sembuh\n`;
      }

      conn.reply(m.chat, leaderboardMsg, m);
    } else if (subCommand === "stop") {
    user.money += player.Balance * player.Pasien_Sembuh;
      let skorMsg = `*🏆 Skor Akhir Anda 🏆*\n\n🚑 Pasien Sembuh: ${player.Pasien_Sembuh}\n💰 Total Balance: Rp${player.Balance.toLocaleString()}\n🏆 Level Pasien: ${player.Lv}`;

      conn.reply(m.chat, `*👨‍⚕ Sesi permainan Dokter dan Pasien telah dihentikan.*\n\n${skorMsg}`, m);
      player.State = STATES.IDLE;
      player.ThiefAction = undefined;
    } else {
      if (player.State !== STATES.SEARCHING) {
        return conn.reply(m.chat, "*🔍 Anda harus mencari pasien terlebih dahulu dengan perintah '.dokter cari'.*", m);
      }

      const dokterAction = subCommand.toLowerCase();
      const level = player.Lv;
      const thiefActions = {
        1: [".dokter beriobat", ".dokter rawat", ".dokter suntik"],
        2: [".dokter rawat", ".dokter operasi"],
        3: [".dokter operasi"],
      };

      if (!thiefActions[level].includes(dokterAction)) {
        return conn.reply(m.chat, `*🚑 Pilihan tindakan Anda (${dokterAction.toUpperCase()}) tidak sesuai dengan hasil yang dicari.*`, m);
      }

      if (thiefActions[level].includes(player.ThiefAction)) {
        let reward = 0;
        switch (dokterAction) {
          case "beriobat":
            reward = 1000 * level;
            break;
          case "rawat":
            reward = 2000 * level;
            break;
          case "suntik":
            reward = 3000 * level;
            break;
          case "operasi":
            reward = 5000 * level;
            break;
        }

        player.Pasien_Sembuh++;
        player.Balance += reward;
        user.money += reward;
        if (player.Balance < 5000) {
          player.Balance = 5000;
        }

        conn.reply(m.chat, `*🚑 Anda berhasil merawat dan menyembuhkan pasien level ${level}!* Anda mendapatkan imbalan Rp${reward.toLocaleString()}. Total Balance Anda: Rp${player.Balance.toLocaleString()}.`, m);
      } else {
        conn.reply(m.chat, "*🚑 Tindakan Anda tidak tepat dan pasien meninggal dunia!*", m);
      }

      player.State = STATES.IDLE;
      player.ThiefAction = undefined;
    }

    conn.playerr[sender] = player;
  } else if (command === "info") {
    conn.reply(m.chat, "*ℹ️ Gunakan perintah '.dokter' untuk memulai game Dokter dan Pasien.*", m);
  }
};

handler.help = ["dokter", "dokter cari", "dokter status", "dokter item <item>", "dokter leaderboard", "dokter stop"];
handler.tags = ["rpg"];
handler.group = true;
handler.command = ["dokter"];

module.exports = handler;