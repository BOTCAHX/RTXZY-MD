const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to 8030.us.kg
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
  const { ext } = await fromBuffer(buffer);
  let form = new FormData();
  form.append('file', buffer, 'tmp.' + ext);
  const response = await fetch("https://8030.us.kg/api/upload.php", {
    method: "POST",
    body: form,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to upload file');
  }

  return data.result.url;
};
