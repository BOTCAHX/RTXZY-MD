let fs = require('fs')
let handler = async (m, { conn }) => {
let anu = `
╭─「 Donasi 」
│ • [ 082221xxxx ] - Dana
| • [ 082221xxxx ] - TSEL
| • [ 082221xxxx ] - OVO
| • [ 082221xxxx ] - GOPAY
| • [ QRISS ] - PM ME
╰────
*_Note_*: jangan pencet button nanti force close._
`
await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 9999,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: anu,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
}// Tambah sendiri kalo mau
handler.help = ['sewa']
handler.tags = ['info']
handler.command = /^(sewabot|sewa|price|rental|rent)$/i

module.exports = handler
