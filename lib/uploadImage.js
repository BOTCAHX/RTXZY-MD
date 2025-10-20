const fetch = require('node-fetch')
const axios = require('axios')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

const btch = async (buffer) => {
  let { ext } = await fromBuffer(buffer);
  bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);

 let res = await fetch("https://file.botcahx.eu.org/api/upload.php", {
    method: "post",
    body: bodyForm,
  });

 let data = await res.json()
  return data.result.url || 'null'
}

const quax = async (buffer) => {
  const { ext, mime } = await fromBuffer(buffer) || {}
  const form = new FormData()
  form.append('files[]', buffer, { filename: `video.${ext}`, contentType: mime })
  const { data } = await axios.post('https://qu.ax/upload.php', form, {
    headers: form.getHeaders(),
    maxBodyLength: Infinity
  })
  if (data?.files?.[0]?.url) return data.files[0].url
  throw new Error('Quax upload failed')
}

const catbox = async (buffer) => {
  const { ext } = await fromBuffer(buffer) || {}
  const form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', buffer, `file.${ext || 'bin'}`)
  const res = await axios.post('https://catbox.moe/user/api.php', form, {
    headers: form.getHeaders(),
    maxBodyLength: Infinity
  })
  return res.data
}

module.exports = async (buffer) => {
  const { mime } = await fromBuffer(buffer) || {}

  if (mime?.startsWith('image/')) {
    try { return await btch(buffer) } catch {}
  } else if (mime?.startsWith('video/')) {
    try { return await quax(buffer) } catch {}
  } else {
    try { return await catbox(buffer) } catch {}
  }

  try { return await catbox(buffer) } catch {}
  return null
}
