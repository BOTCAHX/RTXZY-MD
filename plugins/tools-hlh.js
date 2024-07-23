let handler = async (m, { command, text, usedPrefix }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} halo`;
  let ter = command[1].toLowerCase();
  let txt = text;
  let transformedText = txt.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase());
  await m.reply(transformedText);
}
handler.help = [...'aiueo'].map(v => `h${v}l${v}h <teks>`);
handler.tags = ['tools'];
handler.command = /^h([aiueo])l\1h/i;

module.exports = handler;
