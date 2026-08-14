import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, command }) => {
    try { 
        let anu = `─────〔 *${command}* 〕─────\n`;

        if (command === 'bucin') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/katabucin?apikey=${btc}`)).json();
            anu += res.bucin;
        } else if (command === 'fiersa') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/fiersa?apikey=${btc}`)).json();
            anu += res.fiersa;
        } else if (command === 'fakta') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/fakta?apikey=${btc}`)).json();
            anu += res.result;
        } else if (command === 'nyindir') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/nyindir?apikey=${btc}`)).json();
            anu += res.hasl;
        } else if (command === 'ngawur') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/ngawur?apikey=${btc}`)).json();
            anu += res.hasl;
        } else if (command === 'jawa') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/quotesjawa?apikey=${btc}`)).json();
            anu += res.quotes;
        } else if (command === 'quotes') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/quotes?apikey=${btc}`)).json();
            anu += res.quotes;
        } else if (command === 'sunda') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/sunda?apikey=${btc}`)).json();
            anu += res.hasl;
        } else if (command === 'batak') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/batak?apikey=${btc}`)).json();
            anu += res.hasl;
        } else if (command === 'aceh') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/aceh?apikey=${btc}`)).json();
            anu += res.hasl;
        } else if (command === 'cina') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/china?apikey=${btc}`)).json();
            anu += res.hasl;
        } else if (command === 'minangkabau') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/minangkabau?apikey=${btc}`)).json();
            anu += res.hasl;
        } else if (command === 'ilham') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/katailham?apikey=${btc}`)).json();
            anu += res.hasil;
        } else if (command === 'dilan') {
            const res = await (await fetch(`https://api.botcahx.eu.org/api/random/katadilan?apikey=${btc}`)).json();
            anu += res.dilan;
        }

        m.reply(anu);
    } catch (e) {
        throw eror;
    }
};

handler.help = ['bucin', 'ilham', 'dilan', 'fiersa', 'fakta', 'nyindir', 'ngawur', 'jawa', 'quotes', 'sunda', 'batak', 'aceh', 'cina', 'minangkabau'];
handler.tags = ['quotes'];
handler.command = /^(bucin|ilham|dilan|fiersa|fakta|nyindir|ngawur|jawa|quotes|sunda|batak|aceh|cina|minangkabau)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.register = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

export default handler;
