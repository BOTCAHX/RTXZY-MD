var fetch = require('node-fetch')

var handler = async (m, { 
conn, 
command, 
args 
}) => {
   if (!args[0]) return conn.reply(m.chat, 'Input URL', m)

  await m.reply('_Ｌｏａｄｉｎｇ．．._')
  
   var img = await fetch(`https://api.botcahx.biz.id/api/tools/ssweb?link=${args[0]}&apikey=Admin`)

  
   conn.sendMessage(m.chat, { image: img, caption: 'Here' }, { quoted: m })
}
handler.help = ['ssweb', 'sshp', 'sspc']
handler.tags = ['tools']
handler.command = /^(ssweb|ss|sshp|sspc)?f?$/i

handler.limit = true
handler.fail = null

module.exports = handler

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})


const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
                    'User-Agent': 'GoogleBot',
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}
