let handler = async (m, { teks, conn, isOwner, isAdmin, args }) => {
	if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  if(m.quoted){
if(m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
let usr = m.quoted.sender;
let nenen = await conn.groupParticipantsUpdate(m.chat, [usr], "promote"); return;
if (nenen) m.reply(`sukses promote @${user.split('@')[0]}!`);
}
  if (!m.mentionedJid[0]) throw `tag yang mau dinaikan jabatannya`;
  let users = m.mentionedJid.filter(
    (u) => !(u == ownerGroup || u.includes(conn.user.jid))
  );
  for (let user of users)
    if (user.endsWith("@s.whatsapp.net"))
      await conn.groupParticipantsUpdate(m.chat, [user], "promote");
};

handler.help = ['promote @user']
handler.tags = ['group', 'owner']
handler.command = /^(promo?te|admin|\^)$/i

handler.group = true
handler.botAdmin = true
handler.admin = true
handler.fail = null

module.exports = handler
