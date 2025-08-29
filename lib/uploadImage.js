const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to https://catbox.moe
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
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
