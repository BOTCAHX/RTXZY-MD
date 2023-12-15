// Thanks to Kasan

let handler = async (m, { conn, args }) => {
  const groupId = m.chat;
  const [subCommand, options] = args;
  const joinRequestList = await conn.groupRequestParticipantsList(groupId);

  const formatDate = (timestamp) => new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(timestamp * 1000));
  const reply = (text) => conn.reply(m.chat, text, m);

  switch (subCommand) {
    case "list":
      const formattedList = joinRequestList.length > 0
        ? joinRequestList.map((request, i) => `*${i + 1}.*\n• Nomor: ${request.jid.split('@')[0]}\n• Metode Permintaan: ${request.request_method}\n• Waktu Permintaan: ${formatDate(request.request_time)}\n\n`).join('')
        : "Tidak ada permintaan bergabung yang tertunda.";
      reply(`*Daftar Permintaan Bergabung:*\n\n${formattedList}`);
      break;

    case "reject":
    case "approve":
      if (options === "all") {
        for (const request of joinRequestList) {
          await conn.groupRequestParticipantsUpdate(groupId, [request.jid], subCommand);
          console.log(`Meng-${subCommand} participant dengan JID: ${request.jid}`);
        }
        reply(`*${subCommand === 'approve' ? 'Menyetujui' : 'Menolak'} semua permintaan bergabung.*`);
      } else {
        const actions = options.split('|').map(action => action.trim());
        const participants = actions.map(action => joinRequestList[parseInt(action) - 1]).filter(request => request);
        if (participants.length > 0) {
          let formattedResponse = '';
          for (const request of participants) {
            const response = await conn.groupRequestParticipantsUpdate(groupId, [request.jid], subCommand);
            const status = response[0].status === 'success' ? 'Berhasil' : 'Gagal';
            formattedResponse += `*${participants.indexOf(request) + 1}.*\n• Status: ${status}\n• Nomor: ${request.jid.split('@')[0]}\n\n`;
            console.log(`Meng-${subCommand} participant dengan JID: ${request.jid}`);
          }
          reply(`*${subCommand === 'approve' ? 'Menyetujui' : 'Menolak'} Permintaan Bergabung:*\n\n${formattedResponse}`);
        } else {
          reply("Tidak ada anggota yang cocok untuk reject/approve.");
        }
      }
      break;

    default:
      reply("Perintah tidak valid. Gunakan *acc list*, *acc approve [number]*, *acc reject [number]*, *acc reject [JID]*, *acc reject/approve all* untuk menolak/menyetujui semua permintaan bergabung.");
  }
}

handler.help = ['acc *option*']
handler.tags = ['group']
handler.command = /^(acc)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

module.exports = handler