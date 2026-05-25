const axios = require('axios');
const { Sticker } = require('wa-sticker-formatter');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const sharp = require('sharp');
const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        let txt = text ? text : typeof q.text == 'string' ? q.text : '';
        let name = await (typeof q.name === 'string' ? q.name : conn.getName(q.sender));
        let avatar;
        try {
            avatar = await conn.profilePictureUrl(q.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png');
            if (!/tele/.test(avatar)) avatar = await uploadImage((await conn.getFile(avatar)).data);
        } catch {
            avatar = 'https://telegra.ph/file/320b066dc81928b782c7b.png';
        }
        if (!avatar) avatar = 'https://telegra.ph/file/320b066dc81928b782c7b.png';

        if (!/image\/(jpe?g|png|webp)/.test(mime)) {
            let req = await ___qctext(txt, name, avatar);
            let stiker = await createWebp(req, false, global.packname, global.author);
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            let img = await q.download();
            let decodedBuffer = await sharp(img).toFormat('png').toBuffer();
            let url = await uploadImage(decodedBuffer);
            let req = await ___qcimg(url, txt, name, avatar);
            let stiker = await createWebp(req, false, global.packname, global.author);
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        }
    } catch (e) {
        throw eror;
    }
};

handler.help = ['qc'].map(v => v + ' <text & reply>');
handler.tags = ['sticker'];
handler.command = /^(qc|quotely)$/i;
handler.premium = false;
handler.limit = true;

module.exports = handler;

async function ___qctext(text, name, url) {
    let body = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 512,
        "scale": 2,
        "messages": [{
            "avatar": true,
            "from": {
                "first_name": name,
                "language_code": "en",
                "name": name,
                "photo": {
                    "url": url
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };
    let res = await axios.post('https://qc.botcahx.eu.org/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function ___qcimg(url, text, name, avatar) {
    let body = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "media": {
                "url": url
            },
            "avatar": true,
            "from": {
                "id": 1,
                "name": name,
                "photo": {
                    "url": avatar
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };
    let res = await axios.post('https://qc.botcahx.eu.org/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function createWebp(req, url, packName, authorName, quality) {
    let metadata_sticker = {
        type: 'full',
        pack: global.packname,
        author: global.author,
        quality
    };
    return (new Sticker(req ? req : url, metadata_sticker)).toBuffer();
}

async function uploadImage(buffer) { 
  let { ext } = await fromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);
  let res = await fetch("https://file.botcahx.eu.org/api/upload.php", {
    method: "post",
    body: bodyForm,
  });
  let data = await res.json();
  let resultUrl = data.result ? data.result.url : '';
  return resultUrl;
}
