const { loadBaileys } = require('../baileys-loader.mjs');

let baileys;

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
  if (!baileys) {
    baileys = await loadBaileys();
  }

  const { generateWAMessageFromContent } = baileys;
  
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    text = text || (q.text || q.caption || q.description || '')

    if (!text && !mime) {
        throw `Example: ${usedPrefix + command} <text>\n\nReply to a message (image, video, audio, sticker) to include it in the announcement.`
    }

    const fkontak = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Halo"
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    }

    if (/image|video|audio/.test(mime)) {
        let media = await q.download?.()
        if (!media) throw 'Failed to download media.'

        let msgOptions = {
            [mime.includes('image') ? 'image' : mime.includes('video') ? 'video' : 'audio']: media,
            caption: mime.includes('audio') ? undefined : text,
            mentions: participants.map(a => a.id)
        }

        if (mime.includes('audio')) {
            msgOptions.mimetype = 'audio/mpeg'
        }

        await conn.sendMessage(m.chat, msgOptions, { quoted: fkontak })
    } else if (/sticker/.test(mime)) {
        let media = await q.download?.()
        if (!media) throw 'Failed to download sticker.'
        await conn.sendMessage(m.chat, { sticker: media, mentions: participants.map(a => a.id) }, { quoted: fkontak })
    } else {
        await conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) }, { quoted: fkontak })
    }
}

handler.help = ['hidetag <text>']
handler.tags = ['group']
handler.command = /^(hidetag|ht|h)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler
