let fs = require('fs')
let handler = async (m, { conn }) => {
let anu = `
╭─「 Donasi 」
│• [ 081395861695 ] - GOPAY
 | • [ 081395861695 ] - TSEL
 | • [ 081395861695 ] - OVO
 | • [ QRISS ] - pm me
╰────
*_note_*: jangan pencet button tar fc.
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
handler.command = /^(sewa|belibot|sewabot)$/i

module.exports = handler
