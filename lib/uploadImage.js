const fetch = require('node-fetch')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

/**
 * Upload image to url
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
  const { ext } = await fromBuffer(buffer)
  let form = new FormData
  form.append('file', buffer, 'tmp.' + ext)
  let res = await fetch('https://www.dd.ci/upload', {
    method: 'POST',
    body: form
  })
  let img = await res.json()
  if (img.error) throw img.error
  return 'https://www.dd.ci' + img[0].src
}

