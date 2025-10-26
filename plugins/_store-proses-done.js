/*
 * @author XM4ZE
 * @github github.com/XM4ZE/XMYULA-MD
 * XM4ZE - XMYULA-MD
 * XM4ZE - github.com/XM4ZE/XMYULA-MD
 * Do not remove this watermark!
 */

const { proto } = require('@adiwajshing/baileys')
const moment = require('moment-timezone');

// XM4ZE - XMYULA-MD - github.com/XM4ZE/XMYULA-MD
const handler = async (m, { conn, usedPrefix, command, groupMetadata, isOwner, isAdmin, args }) => {
  /* XM4ZE - github.com/XM4ZE/XMYULA-MD */
  conn.orders = conn.orders ? conn.orders : {};

  // Aturan admin sesuai contoh
  if (m.isBaileys) return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  /* 
   * XM4ZE - XMYULA-MD
   * github.com/XM4ZE/XMYULA-MD
   */
  const time = moment().tz('Asia/Jakarta');
  const dateTime = time.format('DD/MM/YYYY HH:mm:ss');

  // XM4ZE - Do not remove this watermark!
  if (command === 'done' && !m.isGroup) {
    try {
      let isUserAdmin = false;
      const groupIds = Object.keys(conn.orders).filter(key => key.endsWith('@g.us'));
      
      for (const groupId of groupIds) {
        const metadata = await conn.groupMetadata(groupId).catch(() => null);
        if (metadata) {
          const adminParticipants = metadata.participants.filter(p => 
            p.admin === 'admin' || p.admin === 'superadmin'
          );
          if (adminParticipants.some(p => p.id === m.sender)) {
            isUserAdmin = true;
            break;
          }
        }
      }

      /* XM4ZE - github.com/XM4ZE/XMYULA-MD */
      if (!isUserAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }

      // XM4ZE Watermark - github.com/XM4ZE/XMYULA-MD
      const processingOrders = [];
      const mentions = [];

      for (const chatId in conn.orders) {
        const chatOrders = conn.orders[chatId];
        for (const userId in chatOrders) {
          if (userId !== '_name' && userId !== '_id') {
            const order = chatOrders[userId];
            if (order.processedBy === m.sender) {
              processingOrders.push({
                chatId,
                userId,
                order,
                groupName: chatOrders._name || chatId
              });
              mentions.push(userId);
            }
          }
        }
      }

      /* XM4ZE - XMYULA-MD - Do not remove! */
      if (processingOrders.length === 0) {
        return m.reply('Anda tidak memiliki order yang sedang diproses!');
      }

      // github.com/XM4ZE/XMYULA-MD
      const args = m.text.trim().split(' ');
      if (args.length > 1 && !isNaN(args[1])) {
        const orderIndex = parseInt(args[1]) - 1;
        
        if (orderIndex < 0 || orderIndex >= processingOrders.length) {
          return m.reply(`Nomor order tidak valid! Silakan pilih antara 1-${processingOrders.length}`);
        }

        const { chatId, userId, order, groupName } = processingOrders[orderIndex];
        const duration = moment.duration(Date.now() - (order.startTime || Date.now())).humanize();
        if (conn.orders[chatId] && conn.orders[chatId][userId]) {
          delete conn.orders[chatId][userId];
        }

        /* XM4ZE - github.com/XM4ZE/XMYULA-MD */
        await conn.sendMessage(chatId, {
          text: `✅ *ORDER COMPLETED*\n\n📅 Started: ${order.startedAt || dateTime}\n⏱️ Duration: ${duration}\n👤 Customer: @${userId.split('@')[0]}\n🛠️ Admin: @${m.sender.split('@')[0]}\n\n_Status: Completed_`,
          mentions: [userId, m.sender]
        });

        // XM4ZE Watermark - Do not remove!
        await conn.sendMessage(userId, {
          text: `🎉 *ORDER COMPLETED*\n\nPesanan Anda telah selesai diproses!\n\n⏱️ Durasi: ${duration}\n🛠️ Admin: @${m.sender.split('@')[0]}\n\nTerima kasih!`,
          mentions: [m.sender]
        });

        /* github.com/XM4ZE/XMYULA-MD */
        return await conn.sendMessage(m.chat, {
          text: `Order untuk @${userId.split('@')[0]} di group ${groupName} telah diselesaikan!`,
          mentions: [userId]
        });
      }

      // XM4ZE - XMYULA-MD
      let listText = '📋 *Daftar Order yang Diproses:*\n\n';
      processingOrders.forEach((order, index) => {
        listText += `${index + 1}. Order dari @${order.userId.split('@')[0]} di group ${order.groupName}\n`;
      });
      listText += `\nBalas dengan format: ${usedPrefix}done [nomor]`;

      /* XM4ZE - github.com/XM4ZE/XMYULA-MD */
      return conn.sendMessage(m.chat, { 
        text: listText,
        mentions: mentions
      });

    } catch (error) {
      console.error('Error:', error);
      return m.reply('Terjadi error saat memproses perintah');
    }
  }

  // XM4ZE - Do not remove this watermark!
  if (!m.quoted) {
    return m.reply(`Balas pesan customer dengan perintah:\n${usedPrefix}proses atau ${usedPrefix}done`);
  }

  // XM4ZE - XMYULA-MD
  const userId = m.quoted.sender || m.quoted.from;
  if (!userId) return m.reply('Gagal mendapatkan ID pengguna');

  // Aturan untuk mencegah kick owner atau bot
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  if (userId === ownerGroup || userId === conn.user.jid) {
    return m.reply('Tidak dapat memproses order untuk owner grup atau bot!');
  }

  /* XM4ZE Watermark - github.com/XM4ZE/XMYULA-MD */
  try {
    if (!conn.orders[m.chat]) {
      conn.orders[m.chat] = {
        _name: await conn.getName(m.chat),
        _id: m.chat
      };
    }

    // XM4ZE - Do not remove!
    if (/^proses$/i.test(command)) {
      if (conn.orders[m.chat][userId]) {
        return await conn.sendMessage(m.chat, {
          text: `Order dari @${userId.split('@')[0]} sudah sedang diproses!`,
          mentions: [userId]
        });
      }

      /* github.com/XM4ZE/XMYULA-MD */
      conn.orders[m.chat][userId] = {
        status: 'processing',
        startTime: Date.now(),
        startedAt: dateTime,
        processedBy: m.sender,
        originalMessage: proto.WebMessageInfo.fromObject(await m.getQuotedObj()).toJSON()
      };

      // XM4ZE - XMYULA-MD
      await conn.sendMessage(m.chat, {
        text: `🔄 *ORDER IN PROCESS*\n\n📅 Started: ${dateTime}\n👤 Customer: @${userId.split('@')[0]}\n🛠️ Processed by: @${m.sender.split('@')[0]}\n\n_Status: Processing..._`,
        mentions: [userId, m.sender]
      }, { quoted: m });

      /* XM4ZE - github.com/XM4ZE/XMYULA-MD */
      return conn.sendMessage(m.sender, {
        text: `📌 *PROCESS REMINDER*\n\nAnda memproses order dari:\n@${userId.split('@')[0]}\n\nGunakan *${usedPrefix}done* saat selesai.`,
        mentions: [userId]
      });
    }

    // XM4ZE Watermark - Do not remove!
    if (/^done$/i.test(command)) {
      const order = conn.orders[m.chat]?.[userId];
      if (!order) {
        return await conn.sendMessage(m.chat, {
          text: `Tidak ada order dari @${userId.split('@')[0]} yang sedang diproses!`,
          mentions: [userId]
        });
      }

      /* github.com/XM4ZE/XMYULA-MD */
      const duration = moment.duration(Date.now() - (order.startTime || Date.now())).humanize();
      
      delete conn.orders[m.chat][userId];

      // XM4ZE - XMYULA-MD
      await conn.sendMessage(m.chat, {
        text: `✅ *ORDER COMPLETED*\n\n📅 Started: ${order.startedAt || dateTime}\n⏱️ Duration: ${duration}\n👤 Customer: @${userId.split('@')[0]}\n🛠️ Processed by: @${m.sender.split('@')[0]}\n\n_Status: Completed_`,
        mentions: [userId, m.sender]
      }, { quoted: m });

      /* XM4ZE - github.com/XM4ZE/XMYULA-MD */
      return conn.sendMessage(userId, {
        text: `🎉 *ORDER COMPLETED*\n\nPesanan Anda telah selesai diproses!\n\n⏱️ Durasi: ${duration}\n🛠️ Processed by: @${m.sender.split('@')[0]}\n\nTerima kasih!`,
        mentions: [m.sender]
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return m.reply('Terjadi error saat memproses perintah');
  }
};

// XM4ZE - XMYULA-MD - github.com/XM4ZE/XMYULA-MD
handler.help = ['proses', 'done'];
handler.tags = ['store'];
handler.command = /^(proses|done)$/i;
handler.group = false;
handler.botAdmin = true;

/* 
 * @author XM4ZE
 * @github github.com/XM4ZE/XMYULA-MD
 * Do not remove this watermark!
 */
module.exports = handler;
