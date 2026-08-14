import FormData from 'form-data';
import { fileTypeFromBuffer as fromBuffer } from 'file-type';
import fetch from 'node-fetch'


let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {

    let [atas, bawah] = text.split('|')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    conn.sendImageAsSticker(m.chat, meme, m, { packname: packname, author: author })

}
handler.help = ['stickermeme <teks>|<teks>']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?me(me)?)$/i

handler.limit = false

export default handler

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
