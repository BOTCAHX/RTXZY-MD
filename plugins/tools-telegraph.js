const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'Tidak ada media yang ditemukan';
  let media = await q.download();
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link = await (isTele ? uploader : uploader)(media);
  m.reply(link);
}

handler.help = ['tourl <reply image>'];
handler.tags = ['owner'];
handler.command = /^(telegraph)$/i;

module.exports = handler;
handler.owner = true


async function uploader (buffer) {
const { ext } = await fromBuffer(buffer)
  let form = new FormData
  form.append('file', buffer, 'tmp.' + ext)
  let res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  })
  let img = await res.json()
  if (img.error) throw img.error
  return 'https://telegra.ph' + img[0].src
}
