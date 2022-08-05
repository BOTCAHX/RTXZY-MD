let fetch = require('node-fetch')
let handler = async (m, { conn, command }) => {
  let res = await fetch('https://caliphapi.com/api/ppcouple?apikey=UoxvzVXy')
  if (res.status != 200) throw await res.text()
  let json = await res.json()
  if (!json.status) throw json
conn.sendButtonImg(m.chat, json.result.female,  'Cewe', wm, 'Next', '.ppcp', m)
conn.sendFile(m.chat, json.result.male,'pria.jpg',  'Cowo', m)

}
handler.help = ['ppcp']
handler.tags = ['internet']
handler.command = /^ppcp$/i


module.exports = handler
