import * as zapo from '../lib/simple.ts';

let handler: WaPlugin = async (m) => {
  const { getDevice } = zapo;
  
	m.reply(await getDevice(m.quoted ? m.quoted.id : m.key.id))
}

handler.help = ['device']
handler.tags = ['tools']
handler.command = /^(device)$/i

export default handler
