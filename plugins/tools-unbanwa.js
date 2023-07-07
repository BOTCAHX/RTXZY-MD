const axioss = require('axios');
const cheerio = require('cheerio');
const util = require('util');

let handler = async (m, { conn, command, usedPrefix, text }) => {
  if (!text) throw 'Masukan Nomor';

  let tek = `\n\nHi,

Thanks for your message.

We understand you're currently unable to access WhatsApp and are working diligently to answer your request. We appreciate your patience and will get back to you as soon as possible. For more information, please read this article. https://faq.whatsapp.com/general/23154266`

  let ntah = await axioss.get('https://www.whatsapp.com/contact/noclient/');
  let email = await axioss.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=20');
  let cookie = ntah.headers['set-cookie'].join('; ');
  let $ = cheerio.load(ntah.data);
  let $form = $('form');
  let url = new URL($form.attr('action'), 'https://www.whatsapp.com').href;
  let form = new URLSearchParams();
  form.append('jazoest', $form.find('input[name=jazoest]').val());
  form.append('lsd', $form.find('input[name=lsd]').val());
  form.append('step', 'submit');
  form.append('country_selector', 'ID');
  form.append('phone_number', text);
  form.append('email', email.data[0]);
  form.append('email_confirm', email.data[0]);
  form.append('platform', 'ANDROID');
  form.append('your_message', 'Desbanido/Ativar novamente: olá proprietário do whatsapp por que meu número do whatsapp está bloqueado mesmo que eu não tenha violado as regras do whatsapp e eu seja um número importante para muitos grupos escolares infantis e grandes empresas, mas por que meu número do whatsapp está bloqueado, por favor, proprietário do whatsapp para restaurar meu número do whatsapp abaixo de');
  form.append('__user', '0');
  form.append('__a', '1');
  form.append('__csr', '');
  form.append('__req', '8');
  form.append('__hs', '19316.BP:whatsapp_www_pkg.2.0.0.0.0');
  form.append('dpr', '1');
  form.append('__ccg', 'UNKNOWN');
  form.append('__rev', '1006630858');
  form.append('__comment_req', '0');
  let res = await axioss({
    url,
    method: 'POST',
    data: form,
    headers: {
      cookie
    }
  });
  conn.reply(m.chat, util.format(JSON.parse(res.data.replace('for (;;);', ''))) + tek, m);
}
handler.help = ['unbanwa']
handler.tags = ['tools']
handler.command = /^unbanwa$/i;
handler.owner = false;

module.exports = handler;
