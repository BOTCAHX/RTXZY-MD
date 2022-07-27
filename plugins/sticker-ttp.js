const { sticker5 } = require('../lib/sticker')
const fetch = require('node-fetch')

let handler = async (m, { conn, text, command }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (/^ttp1?$/i.test(command)) {
    let stiker = await sticker5(null, API('xteam', '/ttp', { file: '', text: teks }), packname, author)
    if (stiker) return await conn.sendFile(m.chat, stiker, '', '', m)
    throw stiker.toString()
  }
  if (/2$/i.test(command)) {
    let url = await fetch(API('https://salism3api.pythonanywhere.com', '/text2img/', { text: teks }))
    if (!url.ok) throw eror
    res = await url.json()
    stick = res.image
    let stiker = await sticker5(null, stick, packname, author)
    conn.sendFile(m.chat, stiker, '', '', m)
  }
  if (/3$/i.test(command)) {
    let stiker = await sticker5(null, API('hardianto', '/api/maker/ttp', { text: teks }, 'apikey'), packname, author)
    if (stiker) return await conn.sendFile(m.chat, stiker, '', '', m)
    throw stiker.toString()
  }
  if (/4$/i.test(command)) {
    let url = await fetch(API('https://salism3api.pythonanywhere.com', '/text2img/', { text: teks, outlineColor: '255,0,0,255', textColor: '0,0,0,255' }))
    if (!url.ok) throw eror
    res = await url.json()
    stick = res.image
    let stiker = await sticker5(null, stick, packname, author)
    if (stiker) return await conn.sendFile(m.chat, stiker, '', '', m)
    throw stiker.toString()
  }
}
handler.help = new Array(4).fill('ttp').map((v, i) => v + (i + 1) + ' <teks>')
handler.tags = ['sticker']
handler.command = /^ttp[1-4]?$/i

module.exports = handler
