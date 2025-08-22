const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to URL
 * Supported mimetypes:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * - `video/mp4`
 * - `all files`
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async (buffer) => {
  let { ext, mime } = (await fromBuffer(buffer)) || { ext: 'bin', mime: 'application/octet-stream' };
  const form = new FormData();
  form.append('files[]', buffer, {
    filename: `tmp.${ext}`,
    contentType: mime,
  });
  form.append('expiry', '-1');
  
  const { data } = await axios.post(
    'https://qu.ax/upload.php',
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    }
  );
  return data.files[0].url;
};
