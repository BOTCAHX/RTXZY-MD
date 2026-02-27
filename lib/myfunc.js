/**
 * Create By Dika Ardnt.
 * Contact Me on wa.me/6288292024190
 * Follow https://github.com/DikaArdnt
 */

const { loadBaileys } = require('../baileys-loader.mjs');
let baileys;

(async () => {
  baileys = await loadBaileys();
  const { proto } = baileys;
})();

const chalk = require('chalk');
const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { sizeFormatter } = require('human-readable');
const util = require('util');
const jimp = require('jimp');

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000);

exports.unixTimestampSeconds = unixTimestampSeconds;

exports.generateMessageTag = (epoch) => {
  let tag = unixTimestampSeconds().toString();
  if (epoch) tag += '.--' + epoch;
  return tag;
};

exports.processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

exports.getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

exports.getBuffer = async (url, options = {}) => {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

exports.fetchJson = async (url, options = {}) => {
  try {
    const res = await axios({
      method: 'GET',
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
      },
      ...options
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

exports.runtime = function(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor(seconds % (3600 * 24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : '';
  const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

exports.clockString = function(seconds) {
  let h = isNaN(seconds) ? '--' : Math.floor(seconds % (3600 * 24) / 3600);
  let m = isNaN(seconds) ? '--' : Math.floor(seconds % 3600 / 60);
  let s = isNaN(seconds) ? '--' : Math.floor(seconds % 60);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

exports.sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.isUrl = (url) => {
  return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);
};

exports.getTime = (format, date) => {
  if (date) return moment(date).locale('id').format(format);
  return moment.tz('Asia/Jakarta').locale('id').format(format);
};

exports.formatDate = (n, locale = 'id') => {
  let d = new Date(n);
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};

exports.tanggal = (numer) => {
  const myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu'];
  const tgl = new Date(numer);
  const day = tgl.getDate();
  const bulan = tgl.getMonth();
  const thisDay = myDays[tgl.getDay()];
  const yy = tgl.getYear();
  const year = (yy < 1000) ? yy + 1900 : yy;
  return `${thisDay}, ${day} ${myMonths[bulan]} ${year}`;
};

exports.formatp = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`
});

exports.jsonformat = (string) => JSON.stringify(string, null, 2);

exports.logic = (check, inp, out) => {
  if (inp.length !== out.length) throw new Error('Input and Output must have same length');
  for (let i in inp) {
    if (util.isDeepStrictEqual(check, inp[i])) return out[i];
  }
  return null;
};

exports.generateProfilePicture = async (buffer) => {
  const img = await jimp.read(buffer);
  const min = img.getWidth();
  const max = img.getHeight();
  const cropped = img.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
    preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG)
  };
};

exports.parseMention = (text = '') => {
  return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
};

exports.getGroupAdmins = (participants) => {
  return participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
};

/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
exports.smsg = (conn, m, store) => {
  if (!m) return m;
  let M = baileys.proto.WebMessageInfo; // pakai proto yang sudah di-load
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id?.startsWith('BAE5') && m.id?.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat?.endsWith('@g.us');
    m.sender = m.fromMe ? (conn.user?.id?.split(":")[0] + '@s.whatsapp.net' || conn.user?.id) : (m.key.participant || m.key.remoteJid);
  }
  if (m.message) {
    m.mtype = Object.keys(m.message)[0];
    m.body = (
      m.message.conversation ||
      m.message[m.mtype]?.caption ||
      m.message[m.mtype]?.text ||
      (m.mtype === 'listResponseMessage' && m.message[m.mtype]?.singleSelectReply?.selectedRowId) ||
      (m.mtype === 'buttonsResponseMessage' && m.message[m.mtype]?.selectedButtonId) ||
      m.mtype
    );
    m.msg = m.message[m.mtype];
    if (m.mtype === 'ephemeralMessage') {
      exports.smsg(conn, m.msg);
      m.mtype = m.msg.mtype;
      m.msg = m.msg.msg;
    }
    let quoted = m.quoted = m.msg?.contextInfo ? m.msg.contextInfo.quotedMessage : null;
    m.mentionedJid = m.msg?.contextInfo?.mentionedJid || [];
    if (m.quoted) {
      let type = Object.keys(m.quoted)[0];
      m.quoted = m.quoted[type];
      if (['productMessage'].includes(type)) {
        type = Object.keys(m.quoted)[0];
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === 'string') m.quoted = { text: m.quoted };
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo?.stanzaId;
      m.quoted.chat = m.msg.contextInfo?.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id?.startsWith('BAE5') && m.quoted.id?.length === 16;
      m.quoted.sender = m.msg.contextInfo?.participant?.split(":")[0] || m.msg.contextInfo?.participant;
      m.quoted.fromMe = m.quoted.sender === (conn.user?.id);
      m.quoted.text = m.quoted.text || m.quoted.caption || '';
      m.quoted.mentionedJid = m.msg.contextInfo?.mentionedJid || [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted?.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = m.quoted.fakeObj = M.fromObject({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {})
      });
      m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key });
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options);
      m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
    }
  }
  if (m.msg?.url) m.download = () => conn.downloadMediaMessage(m.msg);
  m.text = (
    (m.mtype === 'listResponseMessage' ? m.msg?.singleSelectReply?.selectedRowId : '') ||
    m.msg?.text ||
    m.msg?.caption ||
    m.msg ||
    ''
  );
  m.reply = (text, chatId = m.chat, options = {}) => conn.sendMessage(chatId, { text }, { quoted: m, ...options });
  m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options);
  return m;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});