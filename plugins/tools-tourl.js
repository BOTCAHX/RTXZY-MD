let fs from 'fs'

let cheerio from 'cheerio'

let fetch from 'node-fetch'

let FormData from 'form-data'

let handler = async (m) => {

	let q = m.quoted ? m.quoted : m	let mime = q.mediaType || ''

	if (/image|video|audio|sticker|document/.test(mime)) {

		let media = await q.download(true)

		let data = await uploadFile(media)

		m.reply(data.url)

	} else throw 'No media found'

}

handler.help = ['tourl']

handler.tags = ['tools']

handler.command = /^(upload|tourl)$/i

module.exports = handler

async function uploadFile(path) {

	let form = new FormData()

	form.append('file', fs.createReadStream(path))

	let res = await (await fetch('https://api.anonfiles.com/upload', {

		method: 'post',

		headers: {

			...form.getHeaders()

		},

		body: form

	})).json()

	await fs.promises.unlink(path)

	if (!res.status) throw res.error.message

	let data = await fetch(res.data.file.url.full)

	let $ = cheerio.load(await data.text())

	return {

		url: await shortUrl($('#download-url').attr('href')),

		url2: res.data.file.url.short

	}

}

async function shortUrl(url) {
