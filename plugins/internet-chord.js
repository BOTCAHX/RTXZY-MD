const fetch = require('node-fetch');

let handler = async (m, { text, command, usedPrefix }) => {
	if (!text) throw `Example: ${usedPrefix + command} Janji Suci Yovie Nuno`
	m.reply(wait)
	let data = await chord(text)
	await m.reply(`*Song :* ${text}\n*Chord :*\n\n${data.chord}`)
}

handler.help = ['chord <judul lagu>']
handler.tags = ['internet']
handler.command = /^(chord)$/i
handler.limit = true
module.exports = handler


const chord = async (query) => {
    try {
        let data = "";
        await fetch(`https://aemt.me/chord?query=${query}`).then((res) => {
            data = res;
        });       
        let jsonData = "";
        await data.json().then((res) => {
            jsonData = res;
        });
        let result = "";
        await new Promise((resolve) => {
            setTimeout(() => {
                result = jsonData.result;
                resolve();
            }, 1000);
        });
        return result;
    } catch (error) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ error: error.mesaage });
            }, 1000);
        });
    }
}
