
import fetch from 'node-fetch';
import axios from 'axios';
import FormData from 'form-data';
import { fileTypeFromBuffer as fromBuffer } from 'file-type';

const tele = async (buffer) => {
  const { ext } = await fromBuffer(buffer);
  let form = new FormData();
  form.append('file', buffer, 'tmp.' + ext);
  let res = await fetch('https://telegra.ph/upload?source=bugtracker', {
    method: 'POST',
    body: form
  });
  let img = await res.json();
  if (img.error) throw img.error;
  return 'https://telegra.ph' + img[0].src;
};

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

const api = async (buffer, originalName = "file") => {
  let ext: string | undefined = (await fromBuffer(buffer))?.ext;
  if (!ext && originalName.includes(".")) {
    ext = originalName.split(".").pop();
  }
  ext = ext || "bin";

  let bodyForm = new FormData();
  bodyForm.append("file", buffer, `${originalName}.${ext}`);
  let res = await fetch("https://file.botcahx.eu.org/api/upload.php", {
    method: "post",
    body: bodyForm,
  });

  let data = await res.json();
  let resultUrl = data.result ? data.result.url : '';
  return resultUrl;
};


export default async (buffer, flag?) => {
  if (!buffer || buffer.length === 0) throw new Error('Buffer kosong');
  const { mime } = await fromBuffer(buffer) || {};

  if (mime?.startsWith('image/')) {
    try { return await tele(buffer); } catch {}
    try { return await ugu(buffer); } catch {}
    try { return await catbox(buffer); } catch {}
    try { return await api(buffer); } catch {}
  }

  if (mime?.startsWith('video/')) {
    try { return await ugu(buffer); } catch {}
    try { return await catbox(buffer); } catch {}
    try { return await api(buffer); } catch {}
  }

  try { return await catbox(buffer); } catch {}
  try { return await api(buffer); } catch {}

  return null;
};
