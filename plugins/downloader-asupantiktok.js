const fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const username = [
    'natajadeh',
    'aletaanovianda',
    'faisafch',
    '0rbby',
    'cindyanastt',
    'awaa.an',
    'nadineabgail',
    'ciloqciliq',
    'carluskiey',
    'wuxiaturuxia',
    'joomblo',
    'hxszys',
    'indomeysleramu',
    'anindthrc',
    'm1cel',
    'chrislin.chrislin',
    'brocolee__',
    'dxzdaa',
    'toodlesprunky',
    'wasawho',
    'paphricia',
    'queenzlyjlita',
    'apol1yon',
    'eliceannabella',
    'aintyrbaby',
    'christychriselle',
    'natalienovita',
    'glennvmi',
    '_rgtaaa',
    'felicialrnz',
    'zahraazzhri',
    'mdy.li',
    'jeyiiiii_',
    'bbytiffs',
    'irenefennn',
    'mellyllyyy',
    'xsta_xstar',
    'n0_0ella',
    'kutubuku6690',
    'cesiann',
    'gaby.rosse',
    'charrvm_',
    'bilacml04',
    'whosyoraa',
    'ishaangelica',
    'heresthekei',
    'gemoy.douyin',
    'nathasyaest',
    'jasmine.mat',
    'akuallyaa',
    'meycoco22',
    'baby_sya66',
    'knzymyln__',
    'rin.channn',
    'audicamy',
    'franzeskaedelyn',
    'shiraishi.ito',
    'itsceceh',
    'senpai_cj7',
    'miawwchu',
    'sinclareee',
    'yyourcandle',
    'sukamatchaa255',
    'tilalaamisyu',
    'cricezie',
    'nabilakhoeruniza5',
    'caca.kiyowo',
    'jennangelina_',
    'ciisel22',
    'meytwohuhuy',
    'panggilkez',
    'strangerfr0mhell',
    'deboraballtes22',
    'nabilakhoeruniza5',
    'natasya_aya22',
  ];
  const pickuser = username[Math.floor(Math.random() * username.length)];
  const query = args[0] ? args[0] : pickuser;
  try {
    const res = await fetch(`https://api.botcahx.eu.org/api/asupan/tiktok?query=${query}&apikey=${btc}`);
    const api = await res.json();
    
    const video = api.result.data[0];
    const author = video.author;
    const music = video.music_info;
    
    let capt = `乂 *T I K T O K*\n\n`;
    capt += `  ◦ *Author* : ${author.nickname} (@${author.unique_id})\n`;
    capt += `  ◦ *Views* : ${video.play_count}\n`;
    capt += `  ◦ *Likes* : ${video.digg_count}\n`;
    capt += `  ◦ *Shares* : ${video.share_count}\n`;
    capt += `  ◦ *Comments* : ${video.comment_count}\n`;
    capt += `  ◦ *Duration* : ${Math.floor(video.duration / 60)} menit ${Math.floor(video.duration % 60)} detik\n`;
    capt += `  ◦ *Sound* : ${music.title} - ${music.author}\n`;
    capt += `  ◦ *Caption* : ${video.title || '-'}\n\n`;
    conn.sendFile(m.chat, video.play, null, capt, m);
  } catch (error) {
    throw `🚩 *Username Tidak Ditemukan*`
  }
}
handler.help = ['asupantiktok'].map(v => v + ' <username>');
handler.tags = ['downloader'];
handler.command = /^(asupantiktok)$/i;
handler.limit = true;

module.exports = handler;
