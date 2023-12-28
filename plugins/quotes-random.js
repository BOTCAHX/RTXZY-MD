const fetch = require('node-fetch');

let handler = async (m, { conn, command }) => {
    let anu = `─────〔 *${command}* 〕─────\n`;

    if (command === 'bucin') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/random/katabucin?apikey=${btc}`)).json();
        anu += res.bucin;
    } else if (command === 'katailham') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/random/katailham?apikey=${btc}`)).json();
        anu += res.hasil;
    } else if (command === 'katadilan') {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/random/katadilan?apikey=${btc}`)).json();
        anu += res.dilan;
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
    }

    m.reply(anu);
};

handler.help = ['bucin', 'katailham', 'katadilan', 'fiersa', 'fakta', 'nyindir', 'ngawur', 'jawa', 'quotes'];
handler.tags = ['quotes'];
handler.command = /^(bucin|katailham|katadilan|fiersa|fakta|nyindir|ngawur|jawa|quotes)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.register = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

module.exports = handler;
