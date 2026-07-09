const { loadBaileys } = require('../baileys-loader.mjs');
const { Image } = require('node-webpmux');

let baileysCache = null;

/** Convert comma-separated decimal keys to hex keys (migration from old format).
 *  Runs on every message — cheap after first pass since converted keys won't match. */
function migrateStickerKeys() {
    const sticker = global.db.data?.sticker;
    if (!sticker) return;
    const commaKey = /^\d+(,\d+){31}$/;  // 32 comma-sep decimals = old key format
    for (const key of Object.keys(sticker)) {
        if (!commaKey.test(key)) continue;
        const hexKey = Buffer.from(key.split(',').map(Number)).toString('hex');
        if (hexKey in sticker) continue;  // already exists, skip
        sticker[hexKey] = sticker[key];
        delete sticker[key];
    }
}

/** Normalize fileSha256 to hex string regardless of input type */
function hashToHex(fileSha256) {
    return Buffer.from(fileSha256).toString('hex');
}

async function getBaileys() {
    if (!baileysCache) {
        baileysCache = await loadBaileys();
    }
    return baileysCache;
}

// ─── EXIF sticker-pack-id helpers ──────────────────────────

/** Extract sticker-pack-id from a WEBP sticker buffer.
 *  Returns null if the sticker has no EXIF or no pack-id. */
async function extractPackId(buffer) {
    try {
        const img = new Image();
        await img.load(buffer);
        if (!img.exif) return null;
        // EXIF data starts at byte 22 (after the webp exif header)
        const json = JSON.parse(img.exif.slice(22).toString());
        return json['sticker-pack-id'] || null;
    } catch {
        return null;
    }
}

/** Download a sticker's raw WEBP buffer using the message's built-in download method. */
async function downloadSticker(m) {
    try {
        return await m.download();
    } catch {
        return null;
    }
}

// ─── Core logic ────────────────────────────────────────────

module.exports = {
    async all(m, chatUpdate) {
        if (m.isBaileys) return;
        if (!m.message) return;

        // Run migration — no guard so it also catches keys loaded after init
        migrateStickerKeys();

        if (!m.msg?.fileSha256) return;

        const hashHex = hashToHex(m.msg.fileSha256);
        const stickerDB = global.db.data?.sticker;
        if (!stickerDB) return;

        // ── FAST PATH: fileSha256 match ──
        if (hashHex in stickerDB) {
            const cmdData = stickerDB[hashHex];
            // Populate packId for known stickers — await so fallback can
            // find it immediately if a re-encoded sticker arrives next.
            if (cmdData.packId === undefined) {
                const buffer = await downloadSticker(m).catch(() => null);
                if (buffer) {
                    const packId = await extractPackId(buffer);
                    cmdData.packId = packId ?? null; // store null to skip re-download
                } else {
                    cmdData.packId = null; // download failed, don't retry
                }
            }
            return emitCommand.call(this, m, chatUpdate, cmdData.text, cmdData.mentionedJid);
        }

        // ── FALLBACK: match by sticker-pack-id ──
        try {
            const buffer = await downloadSticker(m);

            const packId = await extractPackId(buffer);
            if (!packId) return;  // no EXIF, can't match

            // Search for a command with the same packId
            for (const [key, data] of Object.entries(stickerDB)) {
                if (!data.packId) continue;
                if (data.packId === packId) {
                    // Auto-link: store this fileSha256 → same command
                    stickerDB[hashHex] = {
                        text: data.text,
                        mentionedJid: data.mentionedJid,
                        creator: data.creator,
                        at: Date.now(),
                        locked: false,
                        packId: packId,
                    };
                    return emitCommand.call(this, m, chatUpdate, data.text, data.mentionedJid);
                }
            }
        } catch (e) {
            console.error('packId fallback error:', e);
        }
    }
};

/** Fabricate a messages.upsert to trigger the command handler. */
async function emitCommand(m, chatUpdate, text, mentionedJid) {
    const baileys = await getBaileys();
    const { proto, generateWAMessage } = baileys;

    try {
        const fakeMsg = await generateWAMessage(m.chat, {
            text: text,
            mentions: mentionedJid || [],
        }, {
            userJid: m.sender,
        });

        fakeMsg.key = {
            ...fakeMsg.key,
            fromMe: false,
            id: m.key.id,
            participant: m.sender,
        };

        const upsertEvent = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(fakeMsg)],
            type: 'append'
        };

        this.ev.emit('messages.upsert', upsertEvent);
    } catch (e) {
        console.error('Error Media:', e);
    }
}
