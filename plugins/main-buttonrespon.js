const { loadBaileys } = require('../baileys-loader.mjs');

let baileysCache = null;

async function getBaileys() {
  if (!baileysCache) {
    baileysCache = await loadBaileys();
  }
  return baileysCache;
}

module.exports = {
  async all(m, chatUpdate) {
    if (m.isBaileys) return;
    if (!m.message) return;

    const interactiveMsg =
      m.message.buttonsResponseMessage ||
      m.message.templateButtonReplyMessage ||
      m.message.listResponseMessage;

    if (!interactiveMsg) return;

    const id =
      interactiveMsg.selectedButtonId ||
      interactiveMsg.selectedId ||
      interactiveMsg.singleSelectReply?.selectedRowId;

    const text =
      interactiveMsg.selectedDisplayText ||
      interactiveMsg.description ||
      '';

    if (!id) return;

    const baileys = await getBaileys();
    const { proto, generateWAMessage, areJidsSameUser } = baileys;

    let isIdMessage = false;
    let usedPrefix;

    for (let name in global.plugins) {
      let plugin = global.plugins[name];
      if (!plugin || plugin.disabled) continue;
      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue;
      if (typeof plugin !== 'function' || !plugin.command) continue;

      let _prefix = plugin.customPrefix || this.prefix || global.prefix || /^[.\/!#]/;

      let match;
      if (_prefix instanceof RegExp) {
        match = _prefix.exec(id);
      } else if (Array.isArray(_prefix)) {
        match = _prefix.map(p => (p instanceof RegExp ? p : new RegExp(p.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')))).find(re => re.exec(id));
      } else if (typeof _prefix === 'string') {
        match = new RegExp(_prefix.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')).exec(id);
      }

      if (match?.[0]) {
        usedPrefix = match[0];
        const noPrefix = id.replace(usedPrefix, '').trim();
        const [command, ...args] = noPrefix.split(/\s+/);
        const cmdLower = (command || '').toLowerCase();

        let isMatch = false;
        if (plugin.command instanceof RegExp) {
          isMatch = plugin.command.test(cmdLower);
        } else if (Array.isArray(plugin.command)) {
          isMatch = plugin.command.some(c => (c instanceof RegExp ? c.test(cmdLower) : c === cmdLower));
        } else if (typeof plugin.command === 'string') {
          isMatch = plugin.command === cmdLower;
        }

        if (isMatch) {
          console.log({ plugin: name, matched: cmdLower, originalId: id });
          isIdMessage = true;
          break;
        }
      }
    }

    const fakeContent = { text: isIdMessage ? id : text, mentions: m.mentionedJid || [] };

    const fakeMsg = await generateWAMessage(m.chat, fakeContent, {
      userJid: this.user?.id,
      quoted: m.quoted?.fakeObj || m.quoted
    });

    fakeMsg.key.fromMe = areJidsSameUser(m.sender, this.user?.id);
    fakeMsg.key.id = m.key.id;
    fakeMsg.pushName = m.pushName || m.name;

    if (m.isGroup) fakeMsg.participant = m.sender;

    const upsertEvent = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(fakeMsg)],
      type: 'append'
    };

    this.ev.emit('messages.upsert', upsertEvent);
  }
};