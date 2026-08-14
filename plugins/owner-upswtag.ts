const handler: WaPlugin = async (m, { conn, text, command, usedPrefix, isOwner }) => {
    if (!m.isGroup) return m.reply("❌ Hanya bisa digunakan di grup.");

    let caption = text ? text.trim() : "";
    let targetJid = m.chat;

    if (caption.includes("|") && isOwner) {
        const [newTarget, ...rest] = caption.split("|");
        targetJid = newTarget.trim();
        caption = rest.join("|").trim();
    }

    try {
        const group = await conn.groupMetadata(targetJid);
        if (!group || !group.participants?.length) {
            return m.reply("❌ Gagal mengambil anggota grup target.");
        }

        const recipients = [...new Set(
            group.participants
                .map((p) => {
                    if (p.phoneNumber) {
                        const num = String(p.phoneNumber).replace(/[^0-9]/g, "");
                        return num ? num + "@s.whatsapp.net" : null;
                    }
                    if (p.jid && String(p.jid).endsWith("@s.whatsapp.net")) return p.jid;
                    return null;
                })
                .filter(Boolean)
        )];

        if (!recipients.length) {
            return m.reply("❌ Tidak ada member dengan nomor valid.");
        }

        let content;
        const quoted = m.quoted;

        if (quoted && quoted.mtype) {
            const buffer = await quoted.download();
            if (!buffer) return m.reply("❌ Gagal mengunduh media.");
            const mtype = quoted.mtype;
            const mimetype = quoted.msg?.mimetype || quoted.mimetype;
            if (mtype === "imageMessage") {
                content = { type: "image", media: buffer, mimetype: mimetype || "image/jpeg", caption };
            } else if (mtype === "videoMessage") {
                content = { type: "video", media: buffer, mimetype: mimetype || "video/mp4", caption };
            } else if (mtype === "audioMessage") {
                content = { type: "audio", media: buffer, mimetype: mimetype || "audio/mpeg", ptt: !!quoted.msg?.ptt };
            } else if (mtype === "extendedTextMessage" || mtype === "conversation") {
                content = caption || " ";
            } else {
                return m.reply("❌ Media tidak didukung. Gunakan gambar/video/vn/teks.");
            }
        } else {
            if (!caption) return m.reply(`*Cara Pakai:*\n${usedPrefix + command} teks status\natau reply media + ${usedPrefix + command}`);
            content = caption;
        }

        await conn._client.status.send({ content, recipients: recipients as string[] });
        return m.reply("✅ Status berhasil diupload ke semua member grup.");
    } catch (err) {
        console.error("upswgc error:", err);
        return m.reply("❌ Gagal mengupload status.");
    }
};

handler.help = handler.command = ["upswgc", "swgc"];
handler.tags = ["group"];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
