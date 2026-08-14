import fs from 'fs';

let handler = m => m;

handler.all = async function(m, { isAdmin, isBotAdmin }) {
    let chat = db.data.chats[m.chat];
    let user = db.data.users[m.sender];
    
    if (chat.autosticker && !chat.isBanned && !user.banned && !m.isZapo) {
        let q = m;
        let stiker = false;
        let mime = (q.msg || q).mimetype || '';
        
        if (/webp/.test(mime)) return;
        
        if (/image/.test(mime)) {
            try {
                let imgPath = './tmp/temp_image.jpg';
                let img = await q.download();
                if (!img) return;              
                fs.writeFileSync(imgPath, img);
                await conn.sendImageAsSticker(m.chat, imgPath, m, { packname: global.packname, author: global.author });
                fs.unlink(imgPath, (err) => {
                    if (err) console.error('Gagal menghapus file gambar sementara:', err);
                    else console.log('File gambar sementara dihapus');
                });
            } catch (e) {
                console.error('Error processing image:', e);
                await this.reply(m.chat, 'Gagal membuat stiker dari gambar', m);
                return;
            }
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 7) return await this.reply(m.chat, 'Durasi maks 6 detik!', m);

            try {
                let videoPath = './tmp/temp_video.mp4';
                let video = await q.download();
                if (!video) return;              
                fs.writeFileSync(videoPath, video);
                await conn.sendVideoAsSticker(m.chat, videoPath, m, { packname: global.packname, author: global.author });
               
                fs.unlink(videoPath, (err) => {
                    if (err) console.error('Gagal menghapus file video sementara:', err);
                    else console.log('File video sementara dihapus');
                });
            } catch (e) {
                console.error('Error processing video:', e);
                await this.reply(m.chat, 'Gagal membuat stiker dari video', m);
                return;
            }
        }
    }
    return !0;
}

export default handler;
