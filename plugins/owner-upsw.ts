const handler: WaPlugin = async (m, { conn, command, args, usedPrefix }) => {
    if (!m.isGroup) return m.reply("❌ Hanya bisa digunakan di grup.");

    const teks = args.length >= 1
        ? args.slice(0).join(" ")
        : (m.quoted && m.quoted.text ? m.quoted.text : "");

    try {
        const group = await conn.groupMetadata(m.chat);
        if (!group || !group.participants?.length) {
            return m.reply("❌ Gagal mengambil anggota grup.");
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
                content = { type: "image", media: buffer, mimetype: mimetype || "image/jpeg", caption: teks };
            } else if (mtype === "videoMessage") {
                content = { type: "video", media: buffer, mimetype: mimetype || "video/mp4", caption: teks };
            } else if (mtype === "audioMessage") {
                content = { type: "audio", media: buffer, mimetype: mimetype || "audio/mpeg", ptt: !!quoted.msg?.ptt };
            } else if (mtype === "extendedTextMessage" || mtype === "conversation") {
                content = teks || " ";
            } else {
                return m.reply("❌ Media tidak didukung. Gunakan gambar/video/vn/teks.");
            }
        } else {
            if (!teks) return m.reply(`*Cara Pakai:*\n${usedPrefix + command} teks status\natau reply media + ${usedPrefix + command}`);
            content = teks;
        }

        await conn._client.status.send({ content, recipients: recipients as string[] });
        return m.reply("✅ Status berhasil diupload ke semua member grup.");
    } catch (err) {
        console.error("upsw error:", err);
        throw err
    }
};

handler.help = handler.command = ["upsw"];
handler.tags = ["owner"];
handler.rowner = true;
handler.group = true;

export default handler;
