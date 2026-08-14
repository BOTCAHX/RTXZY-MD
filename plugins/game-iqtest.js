let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['game']
handler.command = /^(iqtest)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'IQ Anda Sebesar : 1',
'IQ Anda Sebesar : 14',
'IQ Anda Sebesar : 23',
'IQ Anda Sebesar : 35',
'IQ Anda Sebesar : 41',
'IQ Anda Sebesar : 50',
'IQ Anda Sebesar : 67',
'IQ Anda Sebesar : 72',
'IQ Anda Sebesar : 86',
'IQ Anda Sebesar : 99',
'IQ Anda Sebesar : 150',
'IQ Anda Sebesar : 340',
'IQ Anda Sebesar : 423',
'IQ Anda Sebesar : 500',
'IQ Anda Sebesar : 676',
'IQ Anda Sebesar : 780',
'IQ Anda Sebesar : 812',
'IQ Anda Sebesar : 945',
'IQ Anda Sebesar : 1000',
'IQ Anda Sebesar : Tidak Terbatas!',
'IQ Anda Sebesar : 5000',
'IQ Anda Sebesar : 7500',
'IQ Anda Sebesar : 10000',
]
