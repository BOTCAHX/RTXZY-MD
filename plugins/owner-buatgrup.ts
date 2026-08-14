let handler: WaPlugin = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Format salah!\n\nContoh:\n${usedPrefix + command} NamaGrup|@user1 @user2\n\natau bisa juga:\n${usedPrefix + command} NamaGrup`
  let [namagc, partText] = text.split('|').map(s => s.trim())
  if (!namagc) throw 'Nama grup tidak boleh kosong!'

  let peserta = [m.sender]
  
  if (partText) {
    let mentions = conn.parseMention(partText)
    if (mentions.length > 0) {
      peserta = [...new Set([...peserta, ...mentions])]
    }
  }

  const group = await conn.groupCreate(namagc, peserta)
  const link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group.id)

  await conn.sendMessage(group.id, {
    text: `Halo semua! Grup ini dibuat oleh @${m.sender.split('@')[0]}`,
    mentions: [m.sender]
  })

  m.reply(`*Grup berhasil dibuat!*\n\nNama: *${namagc}*\nLink: ${link}`, null, {
    mentions: [m.sender]
  })
}

handler.help = ['buatgrup']
handler.tags = ['owner']
handler.command = /^buatgrup$/i
handler.owner = true

export default handler
