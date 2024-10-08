let fetch = require('node-fetch');
let FormData = require('form-data');
let { fromBuffer } = require('file-type');
let ocrapi = require("ocr-space-api-wrapper")

let handler = async (m, { conn, text }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah .ocr`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*jenis ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploader(img)
    let hasil = await ocrapi.ocrSpace(url)
    await m.reply(hasil.ParsedResults[0].ParsedText)    
}

handler.help = ['ocr', 'totext']
handler.tags = ['tools']
handler.command = /^(ocr|totext)$/i
handler.limit = true

module.exports = handler

async function uploader(buffer) {
  let { ext } = await fromBuffer(buffer);
  bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);

 let res = await fetch("https://file.btch.rf.gd/api/upload.php", {
    method: "post",
    body: bodyForm,
  });

 let data = await res.json()
  return data.result.url || 'null'
}
