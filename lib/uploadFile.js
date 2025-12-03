const fetch = require('node-fetch');
const axios = require('axios')
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload file to https://catbox.moe
 * @returns {string|null|(string|null)[]}
 */
 const catbox = async (buffer) => {
  const { ext } = await fromBuffer(buffer) || {};
    if (!ext) throw new Error('File type not recognized');
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', buffer, `file.${ext}`);
    const response = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: {
        ...form.getHeaders(),
        'Content-Length': form.getLengthSync()
      }
    });
    return response.data;
};

/**
 * Upload epheremal file to file.io
 * `Expired in 1 day`
 * `100MB Max Filesize`
 * @param {Buffer} buffer File Buffer
 */
const fileIO = async (buffer) => {
  const { ext } = await fromBuffer(buffer) || {};
  const form = new FormData();
  form.append('file', buffer, `tmp.${ext}`);
  const res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
    method: 'POST',
    body: form
  });
  const json = await res.json();
  if (!json.success) throw json;
  return json.link;
};


/**
 * Upload file to https://file.botcahx.eu.org/
 * @returns {string|null|(string|null)[]}
 */
const api = async (buffer, originalName = "file") => {
  let { ext } = (await fromBuffer(buffer)) || {};
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

module.exports = async function (inp) {
  let err = false;
  for (const upload of [api, catbox]) {
    try {
      return await upload(inp);
    } catch (e) {
      err = e;
    }
  }
  if (err) throw err;
};
