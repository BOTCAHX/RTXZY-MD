const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload file to URL and return direct file URL
 * Supported mimetypes: image/jpeg, image/jpg, image/png, video/mp4, all files
 * @param {Buffer} buffer File buffer
 * @param {string} filename File name with extension
 */
module.exports = async (buffer, filename) => {
  const { ext = "bin" } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append('files', buffer, { filename: filename || `file_${Date.now()}.${ext}` });

  const response = await axios.post('https://cdn.ypnk.biz.id/upload', form, {
    headers: {
      ...form.getHeaders(),
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36'
    },
    timeout: 120000
  });

  const fileUrl = response.data?.files?.[0]?.url;
  if (!fileUrl) throw new Error('Upload failed');
  return `https://cdn.ypnk.biz.id${fileUrl}`;
};
