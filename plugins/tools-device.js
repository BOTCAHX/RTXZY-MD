import * as baileys from '@whiskeysockets/baileys';

let handler = async (m) => {
  const { getDevice } = baileys;
  
	m.reply(await getDevice(m.quoted ? m.quoted.id : m.key.id))
}

handler.help = ['device']
handler.tags = ['tools']
handler.command = /^(device)$/i

export default handler
