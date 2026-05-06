const crypto = require("crypto");
const { loadBaileys } = require('../baileys-loader.mjs');

let baileys = null;

const handler = async (m, { conn, text, command, usedPrefix, isOwner }) => {
    if (!baileys) {
        baileys = await loadBaileys();
    }

    const { generateWAMessageContent, generateWAMessageFromContent } = baileys;

    if (!m.isGroup) return m.reply("❌ Hanya bisa digunakan di grup.");

    let caption = text ? text.trim() : "";
    let targetJid = m.chat;

    if (caption.includes("|") && isOwner) {
        const [newTarget, ...rest] = caption.split("|");
        targetJid = newTarget.trim();
        caption = rest.join("|").trim();
    }

    if (!caption) {
        return m.reply(`*Cara Pakai:*\n${usedPrefix + command} teks status`);
    }

    try {
        const messageSecret = crypto.randomBytes(32);

        const content = await generateWAMessageContent({ text: caption }, { upload: conn.waUploadToServer });

        const statusMsg = generateWAMessageFromContent(
            targetJid,
            {
                groupStatusMessageV2: { message: content },
                messageContextInfo: { messageSecret }
            },
            { userJid: conn.user.id }
        );

        await conn.relayMessage(targetJid, statusMsg.message, { messageId: statusMsg.key.id });

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    } catch (err) {
        console.error(err);
        m.reply("❌ Gagal mengupload status.");
    }
};

handler.help = handler.command = ["upswgc", "swgc"];
handler.tags = ["group"]
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;
