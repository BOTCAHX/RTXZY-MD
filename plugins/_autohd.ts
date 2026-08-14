import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.ts';

let handler: WaPlugin = m => m;

handler.all = async function(m) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];
    
    if (chat && chat.autohd && !chat.isBanned && !user.banned && !m.isZapo) {
        let q = m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        
        if (/^image/.test(mime) && !/webp/.test(mime)) {
            try {
                let img = await q.download();
                if (!img) return;              
                let out = await uploadImage(img);
                
                const api = await fetch(`https://api.botcahx.eu.org/api/tools/remini?url=${out}&apikey=${global.btc}`);
                const image = await api.json();
                const url = image.url;
                
                if (url) {
                    await this.sendFile(m.chat, url, 'hd.jpg', '✅ *Auto HD Berhasil*', m);
                }
            } catch (e) {
                console.error('Error auto HD image:', e);
            }
        }
    }
    return !0;
}

export default handler;
