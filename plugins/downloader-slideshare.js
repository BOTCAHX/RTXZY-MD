let fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*Contoh:*\n${usedPrefix + command} https://www.slideshare.net/slideshow/advanced-machine-learning-introduction-to-machine-learning/273225055`;

    if (!text.includes('slideshare.net')) throw 'Link harus dari Slideshare!';

    m.reply(wait);

    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/download/slideshare?url=${encodeURIComponent(text)}&apikey=${btc}`)).json();

        if (!res.status || !res.result?.success || !res.result.download) {
            throw 'Gagal mengambil data dari Slideshare.';
        }

        let { title, download, all_slides, image_count } = res.result;

        let pdfBuffer = await (await fetch(download)).buffer();

        await conn.sendMessage(m.chat, {
            document: pdfBuffer,
            mimetype: 'application/pdf',
            fileName: `${title.replace(/[^a-zA-Z0-9]/g, '_') || 'Slideshare'}.pdf`,
            caption: `*Slideshare Downloader*\n\nJudul: ${title}\nJumlah Slide: ${image_count}\n\nPDF lengkap sudah dikirim!\n\nSedang mengirim slide images... (dengan delay)`
        }, { quoted: m });

        await new Promise(resolve => setTimeout(resolve, 5000));

        let highQuality = all_slides.find(q => q.quality === "2048") || all_slides[all_slides.length - 1];

        if (highQuality && highQuality.images && highQuality.images.length > 0) {
            for (let i = 0; i < highQuality.images.length; i++) {
                let imgUrl = highQuality.images[i];

                await conn.sendMessage(m.chat, {
                    image: { url: imgUrl },
                    caption: `Slide ${i + 1}/${image_count}\n${title}`
                }, { quoted: m });

                if (i < highQuality.images.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            }

            await m.reply('Semua slide selesai dikirim!');
        } else {
            await m.reply('Tidak bisa mengambil gambar slide (quality tinggi tidak tersedia).');
        }

    } catch (e) {
        console.error(e);
        throw eror;
    }
};

handler.help = ['slideshare'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(slideshare|dlslideshare|slidesdl)$/i;
handler.limit = true;

module.exports = handler;
