const fetch = require('node-fetch');
const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

const btch = async (buffer) => {
let { ext } = await fromBuffer(buffer);
const bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);
  
  const response = await fetch("https://btch.is-an.ai/api/upload.php", {
    method: "POST",
    body: bodyForm,
  });

  const result = await response.json();
  return result.file.url;
}

const ugu = async (buffer) => {
  const { ext } = await fromBuffer(buffer);
  let form = new FormData();
  form.append("files[]", buffer, "tmp." + ext);
  let up = await fetch("https://uguu.se/upload", {
    method: "POST",
    body: form,
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mobile)"
    }
  });
  let res = await up.json();
  return res.files?.[0]?.url || "";
};

const catbox = async (buffer) => {
  const { ext } = await fromBuffer(buffer) || {};
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', buffer, `file.${ext || 'bin'}`);
  const res = await axios.post('https://catbox.moe/user/api.php', form, {
    headers: form.getHeaders(),
    maxBodyLength: Infinity
  });
  return res.data;
};

module.exports = async (buffer) => {
  const { mime } = await fromBuffer(buffer) || {};

  if (mime?.startsWith('image/')) {
    try { return await btch(buffer); } catch {}
    try { return await ugu(buffer); } catch {}
  }

  if (mime?.startsWith('video/')) {
    try { return await ugu(buffer); } catch {}
  }

  try { return await catbox(buffer); } catch {}

  return null;
};
