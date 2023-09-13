const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

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
 * Upload file to https://aemt.me/uploader
 * @returns {string|null|(string|null)[]}
 */
const api = async (buffer) => {
  let { ext } = await fromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);
  let res = await fetch("https://aemt.me/api/upload.php", {
    method: "post",
    body: bodyForm,
  });
  let data = await res.json();
  let resultUrl = data.result ? data.result.url : '';
  return resultUrl;
}

module.exports = async function (inp) {
  let err = false;
  for (const upload of [api, fileIO]) {
    try {
      return await upload(inp);
    } catch (e) {
      err = e;
    }
  }
  if (err) throw err;
};
