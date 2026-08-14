import { format } from 'util';
import pkg from 'node-webpmux';
const { Image } = pkg;

var handler: WaPlugin = async (m) => {
	if (!m.quoted) return m.reply('Tag stiker nya!')
	if (/sticker/i.test(m.quoted.mtype)) {
		if (m.quoted.mtype === 'lottieStickerMessage' || m.quoted.isLottie || /was/i.test(m.quoted.mimetype || '')) {
			return m.reply('Stiker lottie (bawaan WhatsApp) tidak memiliki EXIF.')
		}
		try {
			var gambar = new Image()
			await gambar.load(await m.quoted.download())
			if (!gambar.exif || gambar.exif.length <= 22) return m.reply('Stiker ini tidak memiliki EXIF.')
			m.reply(format(JSON.parse(gambar.exif.slice(22).toString())))
		} catch (e) {
			m.reply('Gagal membaca EXIF stiker: ' + (e.message || e))
		}
	}
};
handler.command = handler.help = ['getexif'];
handler.tags = ['sticker'];
export default handler;
