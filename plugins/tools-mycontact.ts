import PhoneNumberNS from 'awesome-phonenumber'
const PhoneNumber = ((PhoneNumberNS as unknown as { default: (n: string) => { getNumber: (f: string) => string } }).default)
let handler: WaPlugin  = async (m, { conn, text }) => {
  var name
  if (text) name = text
  else name = m.name
	var number = m.sender.split('@')[0]
	let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD`
   conn.sendMessage(m.chat, {
            contacts: {
                displayName: name,
                contacts: [{ vcard }]
            }
        })

}
handler.help = ['mycontact']
handler.tags = ['tools']
handler.command = /^(me|save|saveme|mycontact)$/i
handler.group = true
handler.limit = true
handler.fail = null
export default handler
