let handler = async (m, { conn, args, usedPrefix }) => {
const { chats: data } = conn;
const filteredMessages = Object.values(data)
  .flatMap(({ messages }) => Object.entries(messages || {}))
  .filter(([messageId]) => messageId.startsWith('BAE5'))
  .reduce((obj, [messageId, message]) => ({ ...obj, [messageId]: message }), {});

const seenParticipants = new Set();
const filteredParticipants = Object.values(filteredMessages)
  .reduce((arr, { pushName, key: { participant, remoteJid } }) => {
    if (!seenParticipants.has(participant)) {
      seenParticipants.add(participant);
      arr.push({ pushName, participant: participant || remoteJid || '', remoteJid });
    }
    return arr;
  }, []);

const formattedText = filteredParticipants.map(({ pushName, participant, remoteJid }, index) => (
  `*${index + 1}.* ${pushName}\n*Tag:* @${participant.split('@')[0]}\n*ID:* ${remoteJid.split('@')[0]}\n`
)).join('\n');

await conn.sendMessage(m.chat, { text: formattedText, mentions: filteredParticipants.map(({ participant }) => participant) }, { quoted: m });
}
handler.help = ['listbot']
handler.tags = ['info']
handler.command = /^listbot$/i
module.exports = handler

//:v
