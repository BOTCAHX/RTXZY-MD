let handler = async (m, { conn, text, usedPrefix, command }) => {
  
var caption = `Hi, Silahkan pilih opsi di bawah ini.\n*Payment*\n\n*x* Dana: 082221792667\n*x* Pulsa: 082221792667`
conn.relayMessage(m.chat, 
{ liveLocationMessage: {
  degreesLatitude: 35.685506276233525,
  degreesLongitude: 139.75270667105852,
  accuracyInMeters: 0,
degreesClockwiseFromMagneticNorth: 2,
caption: caption,
sequenceNumber: 2,
timeOffset: 3,
contextInfo: m,
}}, {})
}

handler.help = ['sewa']
handler.tags = ['main']
handler.command = /^(sewa|sewabot|belibot)$/i

module.exports = handler