const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to pomf.lain.la
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
  const { ext, mime } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append("files[]", buffer, { filename: `tmp.${ext}`, contentType: mime });
  try {
    const { data } = await axios.post("https://pomf.lain.la/upload.php", form, {
      headers: form.getHeaders(),
    });   
    console.log(data);  
    return data.files[0].url
  } catch (error) {
    throw error;
  }
};
