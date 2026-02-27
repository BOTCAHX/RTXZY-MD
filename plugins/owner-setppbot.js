const { loadBaileys } = require('../baileys-loader.mjs');

let baileys;

const jimp = require('jimp');

let handler = async (m, { conn, command, usedPrefix }) => {
  if (!baileys) {
    baileys = await loadBaileys();
  }

  const { S_WHATSAPP_NET } = baileys;
  
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        try {
            let media = await q.download();
            let botNumber = await conn.user.jid;
            let { img } = await pepe(media);
            await conn.query({
                tag: 'iq',
                attrs: {
                    target: undefined,
                    to: S_WHATSAPP_NET,
                    type: 'set',
                    xmlns: 'w:profile:picture'
                },
                content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    }
                ]
            });
            m.reply(`Sukses mengganti PP Bot`);
        } catch (e) {
            console.log(e);
            m.reply(`Terjadi kesalahan, coba lagi nanti.`);
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
    }
};

handler.help = ['setbotpp'];
handler.tags = ['owner'];
handler.command = /^(set(botpp|ppbot))$/i;

handler.owner = true;

module.exports = handler;

async function pepe(media) {
    const image = await jimp.read(media);
    const min = image.getWidth();
    const max = image.getHeight();
    const cropped = image.crop(0, 0, min, max);
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
        preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG)
    };
}
