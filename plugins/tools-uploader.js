const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'Tidak ada media yang ditemukan';
  let media = await q.download();
  let format = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link = format ? await uploader(media) : null;
  m.reply(`${link?.result?.url}\n${media.length} Byte(s)`);
}

handler.help = ['tourl <reply image>'];
handler.tags = ['owner'];
handler.command = /^(upload|tourl)$/i
handler.limit = true
module.exports = handler;

async function uploader(buffer) {
  let { ext } = await fromBuffer(buffer);
  let bodyForm = new FormData(); bodyForm.append("file", buffer, "file." + ext);

  let res = await fetch("https://aemt.me/api/upload.php", {
    method: "post",
    body: bodyForm,
  });
  return {
    status: res.status,
    creator: "AEMT",
    result: (await res.json()).result,
  };
}
