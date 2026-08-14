import type { WaGameRoom } from '../types/connection.js';
import type { WaProtoWebMessageInfoClass } from '../types/proto.js';
import * as zapo from '../lib/simple.ts';

import moment from 'moment-timezone';

const handler: WaPlugin = async (m, { conn, usedPrefix, command, groupMetadata, isOwner, isAdmin, args }) => {
  const { proto } = zapo;
  
  conn.orders = conn.orders ? conn.orders : {};

  // Admin-only commands
  if (m.isZapo) return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const time = moment().tz('Asia/Jakarta');
  const dateTime = time.format('DD/MM/YYYY HH:mm:ss');

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
          if (adminParticipants.some(p => String(p.phoneNumber || p.id || p.jid || '').replace(/[^0-9]/g, '') === String(m.sender).replace(/[^0-9]/g, ''))) {
            isUserAdmin = true;
            break;
          }
        }
      }

      if (!isUserAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }

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

      if (processingOrders.length === 0) {
        return m.reply('Anda tidak memiliki order yang sedang diproses!');
      }

      const args = m.text.trim().split(' ');
      if (args.length > 1 && !isNaN(Number(args[1]))) {
        const orderIndex = parseInt(args[1]) - 1;
        
        if (orderIndex < 0 || orderIndex >= processingOrders.length) {
          return m.reply(`Nomor order tidak valid! Silakan pilih antara 1-${processingOrders.length}`);
        }

        const { chatId, userId, order, groupName } = processingOrders[orderIndex];
        const duration = moment.duration(Date.now() - (order.startTime || Date.now())).humanize();
        if (conn.orders[chatId] && conn.orders[chatId][userId]) {
          delete conn.orders[chatId][userId];
        }

        await conn.sendMessage(chatId, {
          text: `✅ *ORDER COMPLETED*\n\n📅 Started: ${order.startedAt || dateTime}\n⏱️ Duration: ${duration}\n👤 Customer: @${userId.split('@')[0]}\n🛠️ Admin: @${m.sender.split('@')[0]}\n\n_Status: Completed_`,
          mentions: [userId, m.sender]
        });

        await conn.sendMessage(userId, {
          text: `🎉 *ORDER COMPLETED*\n\nPesanan Anda telah selesai diproses!\n\n⏱️ Durasi: ${duration}\n🛠️ Admin: @${m.sender.split('@')[0]}\n\nTerima kasih!`,
          mentions: [m.sender]
        });

        return await conn.sendMessage(m.chat, {
          text: `Order untuk @${userId.split('@')[0]} di group ${groupName} telah diselesaikan!`,
          mentions: [userId]
        });
      }

      let listText = '📋 *Daftar Order yang Diproses:*\n\n';
      processingOrders.forEach((order, index) => {
        listText += `${index + 1}. Order dari @${order.userId.split('@')[0]} di group ${order.groupName}\n`;
      });
      listText += `\nBalas dengan format: ${usedPrefix}done [nomor]`;

      return conn.sendMessage(m.chat, { 
        text: listText,
        mentions: mentions
      });

    } catch (error) {
      console.error('Error:', error);
      return m.reply('Terjadi error saat memproses perintah');
    }
  }

  if (!m.quoted) {
    return m.reply(`Balas pesan customer dengan perintah:\n${usedPrefix}proses atau ${usedPrefix}done`);
  }

  const userId = m.quoted.sender || m.quoted.from;
  if (!userId) return m.reply('Gagal mendapatkan ID pengguna');

  // Prevent processing orders for the group owner or the bot
  let ownerGroup = m.chat.split('-')[0] + "@s.whatsapp.net";
  if (userId === ownerGroup || userId === conn.user.jid) {
    return m.reply('Tidak dapat memproses order untuk owner grup atau bot!');
  }

  try {
    if (!conn.orders[m.chat]) {
      conn.orders[m.chat] = {
        _name: await conn.getName(m.chat),
        _id: m.chat
      } as unknown as Record<string, WaGameRoom>;
    }

    if (/^proses$/i.test(command)) {
      if (conn.orders[m.chat][userId]) {
        return await conn.sendMessage(m.chat, {
          text: `Order dari @${userId.split('@')[0]} sudah sedang diproses!`,
          mentions: [userId]
        });
      }

      conn.orders[m.chat][userId] = {
        status: 'processing',
        startTime: Date.now(),
        startedAt: Date.now(),
        processedBy: m.sender,
        originalMessage: (proto.WebMessageInfo as WaProtoWebMessageInfoClass).fromObject(await m.getQuotedObj() as Record<string, unknown>).toJSON()
      };

      await conn.sendMessage(m.chat, {
        text: `🔄 *ORDER IN PROCESS*\n\n📅 Started: ${dateTime}\n👤 Customer: @${userId.split('@')[0]}\n🛠️ Processed by: @${m.sender.split('@')[0]}\n\n_Status: Processing..._`,
        mentions: [userId, m.sender]
      }, { quoted: m });

      return conn.sendMessage(m.sender, {
        text: `📌 *PROCESS REMINDER*\n\nAnda memproses order dari:\n@${userId.split('@')[0]}\n\nGunakan *${usedPrefix}done* saat selesai.`,
        mentions: [userId]
      });
    }

    if (/^done$/i.test(command)) {
      const order = conn.orders[m.chat]?.[userId];
      if (!order) {
        return await conn.sendMessage(m.chat, {
          text: `Tidak ada order dari @${userId.split('@')[0]} yang sedang diproses!`,
          mentions: [userId]
        });
      }

      const duration = moment.duration(Date.now() - (order.startTime || Date.now())).humanize();
      
      delete conn.orders[m.chat][userId];

      await conn.sendMessage(m.chat, {
        text: `✅ *ORDER COMPLETED*\n\n📅 Started: ${order.startedAt || dateTime}\n⏱️ Duration: ${duration}\n👤 Customer: @${userId.split('@')[0]}\n🛠️ Processed by: @${m.sender.split('@')[0]}\n\n_Status: Completed_`,
        mentions: [userId, m.sender]
      }, { quoted: m });

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

handler.help = ['proses', 'done'];
handler.tags = ['store'];
handler.command = /^(proses|done)$/i;
handler.group = false;
handler.botAdmin = true;

export default handler;
