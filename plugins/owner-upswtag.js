const { generateWAMessage, STORIES_JID } = require("@adiwajshing/baileys");

var handler = async (m, { conn, args, usedPrefix, command }) => {
    var fetchParticipants = async (...jids) => {
        var results = [];
        for (var jid of jids) {
            var { participants } = await conn.groupMetadata(jid);
            participants = participants.map(({ id }) => id);
            results = results.concat(participants);
        }
        return results;
    };

    var mstatus = async (jids, content) => {
        var msg = await generateWAMessage(STORIES_JID, content, {
            upload: conn.waUploadToServer
        });

        var statusJidList = [];
        for (var _jid of jids) {
            if (_jid.endsWith("@g.us")) {
                var groupParticipants = await fetchParticipants(_jid);
                statusJidList.push(...groupParticipants);
            } else {
                statusJidList.push(_jid);
            }
        }
        statusJidList = [...new Set(statusJidList)];

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
            statusJidList,
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: jids.map((jid) => ({
                        tag: "to",
                        attrs: { jid },
                        content: undefined
                    }))
                }]
            }]
        });

        for (var jid of jids) {
            var type = jid.endsWith("@g.us") ? "groupStatusMentionMessage" : "statusMentionMessage";
            await conn.relayMessage(jid, {
                [type]: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            }, {
                additionalNodes: [{
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }]
            });
        }
        return msg;
    };

    try {
        var q = m.quoted ? m.quoted : m;
        var mime = (q.msg || q).mimetype || '';
        var content = {};

        if (mime) {
            var media = await q.download();
            if (/image/.test(mime)) {
                content.image = media;
            } else if (/video/.test(mime)) {
                content.video = media;
            } else if (/audio/.test(mime)) {
                content.audio = media;
            } else {
                throw new Error("Jenis file tidak didukung!");
            }
            if (q.text || q.caption) content.caption = q.text || q.caption;
        } else if (args.length > 0) {
            content.text = args.join(" ");
        } else {
            throw new Error(`Reply media atau ketik teks!\nContoh: ${usedPrefix + command} halo semua`);
        }

        await mstatus([m.chat], content);
        m.reply("✅ *Status berhasil dikirim dan menandai semua anggota grup!*");
    } catch (error) {
        m.reply(`❌ Gagal mengirim status:\n${error.message}`);
    }
};

handler.command = ['upswtag'];
handler.tags = ['owner'];
handler.help = ['upswtag'];
handler.rowner = true;
handler.group = true;

module.exports = handler;
