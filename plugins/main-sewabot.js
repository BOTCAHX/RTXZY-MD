let handler = async (m, { conn, command }) => {
    let txt = `*[ Chat Dengan Creator ]*
wa.me/${numberowner}

╔╣ *PREMIUM USER*
║ • 10.000 Limit
║ • Full Akses Chat
╚══╣ *Harga :* Rp.10.000 / bulan

╔╣ *SEWA BOT*
║ • Dapat Premium
║ • Bebas Invit ke 1 Grup
╚══╣ *Harga :* Rp.15.000 / bulan

- Pembayaran via *OVO / Dana / GoPay, Qris, Bank*
  *( tidak ada opsi lain )*
  ke nomor ${numberowner}
- Whatsapp Multi Device
- Run via Panel (Always ON)`;

    try {
        await m.reply(txt)
    } catch (error) {
        console.error(error);
    }
};

handler.help = ['sewabot'];
handler.tags = ['main'];
handler.command = /^(sewa|sewabot)$/i;

module.exports = handler;
