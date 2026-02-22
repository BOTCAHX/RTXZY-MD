let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let type = (args[0] || "").toLowerCase();
  let isAll = false;
  let isUser = false;
  switch (type) {
    case "notifgempa":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.notifgempa = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "notifcuaca":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.notifcuaca = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "notifsholat":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.notifsholat = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "welcome":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.welcome = isEnable;
      break;
    case "detect":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;
    case "delete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.delete = isEnable;
      break;
    case "antidelete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.delete = !isEnable;
      break;
    case "autodelvn":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autodelvn = isEnable;
      break;
    case "document":
      chat.useDocument = isEnable;
      break;
    case "public":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["self"] = !isEnable;
      break;
    case "antilink":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;
    case "autosticker":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autosticker = isEnable;
      break;
    case "antibot":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiBot = isEnable;
      break;
    case "toxic":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiToxic = !isEnable;
      break;
    case "antitoxic":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiToxic = isEnable;
      break;
    case "autolevelup":
      isUser = true;
      user.autolevelup = isEnable;
      break;
    case "mycontact":
    case "mycontacts":
    case "whitelistcontact":
    case "whitelistcontacts":
    case "whitelistmycontact":
    case "whitelistmycontacts":
      if (!isOwner) {
        global.dfail("owner", m, conn);
        throw false;
      }
      conn.callWhitelistMode = isEnable;
      break;
    case "restrict":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["restrict"] = isEnable;
      break;
    case "nyimak":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["nyimak"] = isEnable;
      break;
    case "autoread":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["autoread"] = isEnable;
      break;
    case "pconly":
    case "privateonly":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["pconly"] = isEnable;
      break;
    case "gconly":
    case "grouponly":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["gconly"] = isEnable;
      break;
    case "swonly":
    case "statusonly":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["swonly"] = isEnable;
      break;
    case "antifoto":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiFoto = isEnable;
      break;
    case "antisticker":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiSticker = isEnable;
      break;
    case "viewonce":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.viewonce = isEnable;
      break;
    case "antifile":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antifile = isEnable;
      break;
    case "autobackup":
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      chat.autobackup = isEnable;
      break;
    case "antivideo":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antivideo = isEnable;
      break;
    case "antiporn":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.antiporn = isEnable;
      break;
    case "autohd":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autohd = isEnable;
      break;
    case "autobio":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.autobio = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "rpg":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.rpg = isEnable;
      break;
    case "nsfw":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.nsfw = isEnable;
      break;
    case "autodl":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autodl = isEnable;
      break;
    default:
      if (!/[01]/.test(command))
        return m.reply(
          `
List option:
| autodl
| autobackup
| rpg
| autobio
| notifgempa
| notifcuaca
| notifsholat
| antiporn
| welcome
| delete
| antibot
| public
| autohd
| antilink
| antidelete
| autosticker
| autolevelup
| antisticker
| detect
| viewonce
| document
| whitelistmycontacts
| restrict
| nyimak
| autoread
| pconly
| gconly
| swonly
| autodatabase
| nsfw
Contoh:
${usedPrefix}enable welcome
${usedPrefix}disable welcome
`.trim(),
        );
      throw "error";
  }
  m.reply(
    `
*${type}* berhasil di *${isEnable ? "nyala" : "mati"}kan* ${isAll ? "untuk bot ini" : isUser ? "" : "untuk chat ini"}
`.trim(),
  );
};
handler.help = ["en", "dis"].map((v) => v + "able <option>");
handler.tags = ["group", "owner"];
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff))$/i;

module.exports = handler;
