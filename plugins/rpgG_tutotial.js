let handler = async (m, { conn, usedPrefix }) => {
    let tutorial = `
🏰 *Tutorial Guild*

1. *Membuat Guild*
   ${usedPrefix}createguild <nama_guild>
   Contoh: ${usedPrefix}createguild TheDark

2. *Melihat Info Guild*
   ${usedPrefix}guildinfo [@user]
   Contoh: ${usedPrefix}guildinfo @user

3. *Bergabung dengan Guild*
   ${usedPrefix}joinguild <nama_guild>
   Contoh: ${usedPrefix}joinguild TheDark

4. *Mengundang Anggota ke Guild*
   ${usedPrefix}guildinvite @user
   Contoh: ${usedPrefix}guildinvite @user

5. *Menerima Anggota ke Guild (Hanya Owner atau Staff)*
   ${usedPrefix}guildaccept @user
   Contoh: ${usedPrefix}guildaccept @user

6. *Meninggalkan Guild*
   ${usedPrefix}guildleave
   Contoh: ${usedPrefix}guildleave

7. *Melihat Guild Sendiri*
   ${usedPrefix}myguild
   Contoh: ${usedPrefix}myguild

8. *Upgrade Guild*
   ${usedPrefix}guildupgrade
   Contoh: ${usedPrefix}guildupgrade

9. *Menghapus Guild (Hanya Owner)*
   ${usedPrefix}delguild <nomor_guild>
   Contoh: ${usedPrefix}delguild 2

10. *Misi Harian untuk Mendapatkan Eksir dan Harta*
    ${usedPrefix}dailyg
    Contoh: ${usedPrefix}dailyg

11. *Menjalankan WarGuild*
    ${usedPrefix}warguild
    Contoh: ${usedPrefix}warguild

12. *Menjalankan DeffGuild*
    ${usedPrefix}deffguild
    Contoh: ${usedPrefix}deffguild

ℹ️ Untuk informasi lebih lanjut tentang setiap perintah, gunakan ${usedPrefix}help [command].

🔗 Selamat menjelajahi fitur guild!
    `;

    conn.reply(m.chat, tutorial, m);
};

handler.help = ['tutorguild'];
handler.tags = ['rpgG'];
handler.command = /^tutorguild$/i;

module.exports = handler;