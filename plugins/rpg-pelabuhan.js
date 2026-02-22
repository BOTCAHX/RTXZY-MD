const handler = async (m, { conn, args }) => {
    const command = args[0];
    const user = global.db.data.users[m.sender];

    // Inisialisasi pelabuhan dari data pengguna
    class Pelabuhan {
        constructor(user) {
            this.level = user.pelabuhanLevel || 1;
            this.maxPenumpang = user.pelabuhanMaxPenumpang || 10;
            this.saldo = user.pelabuhanSaldo || 100;
            this.pendapatanPerPenumpang = user.pelabuhanPendapatanPerPenumpang || 5;
            this.jumlahPenumpang = user.pelabuhanJumlahPenumpang || 0;
            this.biayaUpgrade = user.pelabuhanBiayaUpgrade || 50;
        }

        // Metode untuk mengupgrade pelabuhan
        upgrade() {
            if (this.saldo >= this.biayaUpgrade) {
                this.saldo -= this.biayaUpgrade;
                this.level++;
                this.maxPenumpang += 1;
                this.pendapatanPerPenumpang += 1;
                this.biayaUpgrade += 100;

                // Simpan perubahan ke database
                this.saveToDatabase();
                
                conn.reply(m.chat, `\`CONGRATULATIONS 🎊\`
- [ 🚢 ] Pelabuhan berhasil diupgrade ke level ${this.level}!
- [ 👤 ] Max Penumpang sekarang: ${this.maxPenumpang}
- [ 💸 ] Pendapatan per penumpang sekarang: ${this.pendapatanPerPenumpang}
- [ 💰 ] Saldo tersisa: ${this.saldo}
- [ 🪙 ] Biaya upgrade berikutnya: ${this.biayaUpgrade}`);
            } else {
                conn.reply(m.chat, "Saldo tidak cukup untuk upgrade!");
            }
        }

        // Metode untuk menambah saldo
        tambahSaldo(jumlah) {
            this.saldo += jumlah;
            this.saveToDatabase();
            conn.reply(m.chat, `Saldo berhasil ditambahkan. Saldo sekarang: ${this.saldo}`);
        }

        // Metode untuk menghitung pendapatan setiap jam
        hitungPendapatan() {
            const pendapatan = this.jumlahPenumpang * this.pendapatanPerPenumpang;
            this.saldo += pendapatan;
            this.saveToDatabase();
            conn.reply(m.chat, `Pendapatan dari ${this.jumlahPenumpang} penumpang: ${pendapatan}. Saldo sekarang: ${this.saldo}`);
        }

        // Metode untuk menampilkan informasi pelabuhan
        info() {
            conn.reply(m.chat, `\`INFO STATUS KAPAL PESIARMU\`

- [ 🚢 ] Level Pesiarmu : ${this.level}
- [ 👤 ] Max Penumpang : ${this.maxPenumpang}
- [ 👥 ] Jumlah Penumpang: ${this.jumlahPenumpang}
- [ 💰 ] Danamu: ${this.saldo}
- [ 💵 ] Pendapatan per Penumpang: ${this.pendapatanPerPenumpang}
- [ 💶 ] Biaya Upgrade Berikutnya: ${this.biayaUpgrade}`);
        }

        // Metode untuk menambah penumpang
        tambahPenumpang() {
            if (this.jumlahPenumpang < this.maxPenumpang) {
                this.jumlahPenumpang += 1; // Tambah satu penumpang
                this.saveToDatabase(); // Simpan perubahan ke database
            }
        }

        // Metode untuk menyimpan data ke database
        saveToDatabase() {
            user.pelabuhanLevel = this.level;
            user.pelabuhanMaxPenumpang = this.maxPenumpang;
            user.pelabuhanSaldo = this.saldo;
            user.pelabuhanPendapatanPerPenumpang = this.pendapatanPerPenumpang;
            user.pelabuhanJumlahPenumpang = this.jumlahPenumpang;
            user.pelabuhanBiayaUpgrade = this.biayaUpgrade;
            user.pelabuhanLastBermain = user.pelabuhanLastBermain || 0; // Waktu terakhir bermain
            user.pelabuhanCooldown = 1; // Durasi cooldown dalam 1 hari
        }

        // Metode untuk bermain
        bermain(durasiMenit) {
            const now = Date.now();
            const cooldownTime = 1 * 86400000; // Cooldown selama 1 hari

            // Cek apakah cooldown masih aktif
            if (now < user.pelabuhanLastBermain + cooldownTime) {
                const remainingTime = (user.pelabuhanLastBermain + cooldownTime) - now;
                const remainingMinutes = Math.ceil(remainingTime / 60000);
                return conn.reply(m.chat, `Anda masih dalam cooldown. Silakan tunggu ${remainingMinutes} menit sebelum bisa bermain lagi.`);
            }

            // Jika cooldown sudah berakhir, simpan waktu bermain
            user.pelabuhanLastBermain = now;

            let menitKe = 0;

            const interval = setInterval(() => {
                menitKe++;
                this.tambahPenumpang(); // Tambah penumpang
                const pendapatan = this.jumlahPenumpang * this.pendapatanPerPenumpang;
                this.saldo += pendapatan; // Tambah saldo sesuai dengan jumlah penumpang
                this.saveToDatabase(); // Simpan perubahan ke database
                conn.reply(m.chat, `\`STATUS UPDATE\`
                
- Menit ke-${menitKe}: Jumlah penumpang saat ini adalah ${this.jumlahPenumpang}

- Pendapatan dari ${this.jumlahPenumpang} penumpang: ${pendapatan}. Saldo sekarang: ${this.saldo}`);

                // Jika durasi menit sudah tercapai, hentikan interval
                if (menitKe >= durasiMenit) {
                    clearInterval(interval);
                    conn.reply(m.chat, `Bermain selesai setelah ${durasiMenit} menit.`);
                }
            }, 60000); // 60000 ms = 1 menit
        }
    }  

    // Inisialisasi pelabuhan dari data pengguna
    const pelabuhan = new Pelabuhan(user);
    const durasiMenit = 5; // Durasi dalam menit

    switch (command) {
        case 'help':
            conn.reply(m.chat, `\`PILIHAN MENU GAME PELABUHAN\`
1. pelabuhan info
2. pelabuhan upgrade
3. pelabuhan pendapatan
4. pelabuhan bermain`);
            break;
        case 'info':
            pelabuhan.info();
            break;
        case 'upgrade':
            pelabuhan.upgrade();
            break;
        case 'pendapatan':
            pelabuhan.hitungPendapatan();
            break;
        case 'bermain':
            pelabuhan.bermain(durasiMenit);
            break;
        default:
            conn.reply(m.chat, `\`PILIHAN MENU GAME PELABUHAN\`
1. pelabuhan info
2. pelabuhan upgrade
3. pelabuhan pendapatan
4. pelabuhan bermain`);
    }
};

handler.help = ['pelabuhan <command>'];
handler.tags = ['game'];
handler.command = /^pelabuhan$/i;
handler.limit = true;
handler.rpg = true;
handler.group = true;

module.exports = handler;
