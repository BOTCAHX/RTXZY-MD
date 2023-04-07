var limit = 50
var {
	youtubeSearch,
	youtubedl,
	youtubedlv2,
	youtubedlv3
} = require('@bochilteam/scraper')
var fs = require('fs')

var handler = async (m, {
	conn,
	args,
	isPrems,
	isOwner,
	command,
	text,
	usedPrefix
}) => {
	if (!text) throw 'Link nya mana?'
	var chat = db.data.chats[m.chat]
	var vid = (await youtubeSearch(text)).video[0]
	if (!vid) throw 'Video/Audio Tidak ditemukan'
	var {
		videoId
	} = vid
	var url = 'https://www.youtube.com/watch?v=' + videoId
	var {
		thumbnail,
		video: _video,
		title
	} = await youtubedl(url).catch(async _ => await youtubedlv2(url)).catch(async _ => await youtubedlv3(url))
	var limitedSize = (isPrems || isOwner ? 350 : limit) * 3074
	var video, source, res, link, lastError, isLimit
	for (var i in _video) {
		video = _video[i]
		isLimit = limitedSize < video.fileSizeH
		if (isLimit) continue
		link = await video.download()
		if (link) res = await fetch(link)
		isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
		if (isLimit) continue
		if (res) source = await res.arrayBuffer()
		if (source instanceof ArrayBuffer) break
	}
	var _thumb = {}
	try {
		_thumb = {
			thumbnail: await (await fetch(thumbnail)).buffer()
		}
	} catch (e) {}
	conn.sendFile(m.chat, link, title + '.mp4', `
*🔥 Title:* ${title}
*📁 File Size:* ${video.fileSizeH}
`.trim(), m, false, {
		..._thumb,
		asDocument: chat.useDocument
	})
}
handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv']
module.exports = handler
