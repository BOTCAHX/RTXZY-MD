const { 
    makeWASocket,
    proto
} = require("@adiwajshing/baileys");    

let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    command
}) => {
    if (!text && !m.quoted) return m.reply("Input text\nReply pesan");
    
    let get = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    let count = get.length;
    let sentCount = 0;
    m.reply(wait);

    for (let i = 0; i < get.length; i++) {
        setTimeout(async function() {
            if (text) {
                await conn.sendMessage(get[i], {
                    text: text
                });
            } else if (m.quoted) {
                await conn.copyNForward(get[i], m.getQuotedObj(), false);
            } else if (text && m.quoted) {
                await conn.sendMessage(get[i], {
                    text: text + "\n" + m.quoted.text
                });
            }

            const vcard = `BEGIN:VCARD
VERSION:3.0
FN: ${nameowner}
item.ORG: Contact
item1.TEL;waid=${numberowner}:${numberowner}@s.whatsapp.net
item1.X-ABLabel:Ponsel
item2.EMAIL;type=INTERNET:${mail}
item2.X-ABLabel:Email
item3.ADR:;;Indonesia;;;;
item3.X-ABADR:ac
END:VCARD`;

            const sentMsg = await conn.sendMessage(
                get[i],
                { 
                    contacts: { 
                        displayName: 'ID', 
                        contacts: [{ vcard }] 
                    }
                }
            );

            count--;
            sentCount++;
            if (count === 0) {
                m.reply(`Berhasil Push Kontak:\nJumlah Pesan Terkirim: *${sentCount}*`);
            }
        }, i * 10000);
    }
}

handler.command = handler.help = ['pushkontak'];
handler.tags = ['owner'];
handler.owner = true;
handler.group = true;

module.exports = handler;
