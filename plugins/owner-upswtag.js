const crypto = require("crypto");
const { loadBaileys } = require('../baileys-loader.mjs');

let baileys;


const handler = async (
  m,
  { conn, text, command, prefix, isOwner, isSewa, isBotAdmin },
) => {
  if (!baileys) {
    baileys = await loadBaileys();
  }
  
  const {
  generateWAMessageContent,
  generateWAMessageFromContent,
} = baileys

  async function groupStatus(jid, content) {
    const inside = await generateWAMessageContent(content, {
      upload: conn.waUploadToServer,
    });

    const messageSecret = crypto.randomBytes(32);
    const message = generateWAMessageFromContent(
      jid,
      {
        messageContextInfo: { messageSecret },
        groupStatusMessageV2: {
          message: {
            ...inside,
            messageContextInfo: { messageSecret },
          },
        },
      },
      {},
    );

    await conn.relayMessage(jid, message.message, {
      messageId: message.key.id,
    });
    return message;
  }

  // --- PERBAIKAN: Mengganti 'mess.grup' dan menghapus 'isBotAdmin' ---
  if (!m.isGroup)
    return m.reply("❌ Perintah ini hanya bisa digunakan di dalam grup.");
  // Baris 'if (!isBotAdmin) return m.reply(mess.botAdmin);' telah dihapus.
  // INGAT: Bot mungkin tetap GAGAL memposting status jika bukan admin grup.
  // -------------------------------------------------------------------

  // Tentukan pesan mana yang jadi sumber: pesan yang dibalas (m.quoted) atau pesan saat ini (m)
  let q = m.quoted ? m.quoted : m;

  // Tentukan apakah sumbernya adalah pesan media yang didukung (image, video, audio)
  let isMedia =
    q.mtype === "imageMessage" ||
    q.mtype === "videoMessage" ||
    q.mtype === "audioMessage";

  let media;
  let mimeType = isMedia ? q.mimetype || q.mtype : null;
  let caption = text ? text.trim() : "";

  // Jika sumbernya adalah media yang didukung, coba unduh
  if (isMedia) {
    if (q.download && typeof q.download === "function") {
      try {
        media = await q.download();
      } catch (e) {
        console.error("Gagal mengunduh media:", e);
        return m.reply("❌ Gagal mengunduh media.");
      }
    } else {
      return m.reply("❌ Pesan media tidak dapat diproses.");
    }
  }

  let options = {};
  let contentProvided = false;

  if (media) {
    if (/image/.test(mimeType)) {
      options = caption ? { image: media, caption } : { image: media };
      contentProvided = true;
    } else if (/video/.test(mimeType)) {
      options = caption ? { video: media, caption } : { video: media };
      contentProvided = true;
    } else if (/audio/.test(mimeType)) {
      options = caption
        ? { audio: media, mimetype: "audio/mpeg", ptt: false, caption }
        : { audio: media, mimetype: "audio/mpeg", ptt: false };
      contentProvided = true;
    } else {
      if (caption) {
        options = { text: caption };
        contentProvided = true;
      } else {
        return m.reply("❌ Tipe media tidak didukung untuk status grup!");
      }
    }
  } else if (caption) {
    options = { text: caption };
    contentProvided = true;
  }

  if (!contentProvided) {
    const safeCommand = command || "upswgc";
    const safePrefix = prefix || ".";

    return m.reply(`Cara Pengguna:
*${safePrefix}${safeCommand}* Teks Langsung
ATAU
Kirim/Reply foto/video/audio dengan atau tanpa caption`);
  }

  let targetGc = m.chat;

  // --- PERBAIKAN: Mengganti 'mess.owner' ---
  if (isOwner && caption.includes("|")) {
    const [idgc, ...rest] = caption.split("|");
    targetGc = idgc.trim();
    if (Object.keys(options).length > 0 && options.caption !== undefined) {
      options.caption = rest.join("|").trim();
    } else if (Object.keys(options).length > 0 && options.text !== undefined) {
      options.text = rest.join("|").trim();
    }
  }

  // Jika non-owner mencoba menargetkan GC lain, tolak
  if (!isOwner && m.chat !== targetGc) {
    return m.reply("🚫 Fitur menargetkan grup lain hanya untuk Owner.");
  }
  // ------------------------------------------

  await groupStatus(targetGc, options);

  await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
};

handler.command = ["upswgc", "swgc"];
module.exports = handler;
handler.admin = true;
handler.group = true;
