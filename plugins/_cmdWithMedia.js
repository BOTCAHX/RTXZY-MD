const { loadBaileys } = require('../baileys-loader.mjs');

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

// ─── Perceptual hash (dHash) helpers ───────────────────────────

let sharpCache;
async function getSharp() {
    if (!sharpCache) sharpCache = require('sharp');
    return sharpCache;
}

/** Compute 64-bit difference hash from a WEBP sticker buffer. */
async function computeDHash(buffer) {
    const sharp = await getSharp();
    const { data } = await sharp(buffer)
        .greyscale()
        .resize(9, 8, { fit: 'fill' })
        .raw()
        .toBuffer({ resolveWithObject: true });

    let hash = 0n;
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (data[y * 9 + x] < data[y * 9 + x + 1]) {
                hash |= (1n << BigInt(y * 8 + x));
            }
        }
    }
    return hash;
}

/** Hamming distance between two 64-bit dHashes. */
function hammingDistance(a, b) {
    let diff = a ^ b;
    let count = 0;
    while (diff) {
        count += Number(diff & 1n);
        diff >>= 1n;
    }
    return count;
}

/** Download a sticker's raw WEBP buffer. */
async function downloadSticker(msg, downloadContentFromMessage) {
    try {
        const stream = await downloadContentFromMessage(msg.message, 'sticker');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return Buffer.concat(chunks);
    } catch {
        return null;
    }
}

// ─── Core logic ────────────────────────────────────────────────

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

            // Lazily populate dHash for known stickers (fire & forget)
            if (!cmdData.dHash) {
                getBaileys().then(({ downloadContentFromMessage }) =>
                    downloadSticker(m, downloadContentFromMessage)
                ).then(buffer => {
                    if (buffer) computeDHash(buffer).then(dh => cmdData.dHash = dh);
                }).catch(() => {});
            }

            return emitCommand.call(this, m, chatUpdate, cmdData.text, cmdData.mentionedJid);
        }

        // ── FALLBACK: perceptual hash matching for unknown stickers ──
        try {
            const { downloadContentFromMessage } = await getBaileys();
            const buffer = await downloadSticker(m, downloadContentFromMessage);
            if (!buffer) return;

            const dh = await computeDHash(buffer);
            let bestMatch = null;
            let bestDist = 10; // threshold: up to 10 differing bits out of 64

            for (const data of Object.values(stickerDB)) {
                if (!data.dHash) continue;
                const dist = hammingDistance(dh, data.dHash);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestMatch = data;
                }
            }

            if (bestMatch) {
                // Auto-link: store this fileSha256 → same command
                stickerDB[hashHex] = {
                    text: bestMatch.text,
                    mentionedJid: bestMatch.mentionedJid,
                    creator: bestMatch.creator,
                    at: Date.now(),
                    locked: false,
                    dHash: dh,
                };
                return emitCommand.call(this, m, chatUpdate, bestMatch.text, bestMatch.mentionedJid);
            }
        } catch (e) {
            console.error('dHash fallback error:', e);
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
