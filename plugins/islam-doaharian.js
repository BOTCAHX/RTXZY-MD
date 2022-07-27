let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  await m.reply(global.wait)
  let res = await fetch(global.API('xteam','/religi/doaharian', {}, 'APIKEY'))
  let json = await res.json()
  if (res.status != 200) throw json
  if (json.result.error) throw json.result.message
  let {
    title,
    latin,
    arabic,
    translation
  } = json.result
  let caption = `
*「 Doa Harian 」*
${title}
${arabic}
${latin}
Artinya:
_"${translation}"_
`.trim()
  await m.reply(caption)
}
handler.help = ['doaharian']
handler.tags = ['islam']
handler.command = /^(doaharian)$/i

module.exports = handler
