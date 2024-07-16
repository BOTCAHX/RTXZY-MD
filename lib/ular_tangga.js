const fs = require('fs');
const Jimp = require('jimp');

// Fungsi untuk menggambar papan permainan dengan pemain
async function drawBoard(boardImageURL, user1 = null, user2 = null, user3 = null, user4 = null, stabil_x, stabil_y) {
    try {
        // Load gambar papan permainan dari URL
        const board = await Jimp.read(boardImageURL);

        // Lokasi pemain pada papan permainan
        const playerPositions = [user1, user2, user3, user4].filter(pos => pos !== null && pos >= 1 && pos <= 100);

        // URL gambar untuk setiap pemain
        const playerImageURLs = [
            "https://telegra.ph/file/30f92f923fb0484f0e4e0.png",
            "https://telegra.ph/file/6e07b5f30b24baedc7822.png",
            "https://telegra.ph/file/34f47137df0dc9aa9c15a.png",
            "https://telegra.ph/file/860b5df98963a1f14a91c.png"
        ];

        // Gambar pion untuk setiap pemain pada posisi mereka
        for (let i = 0; i < playerPositions.length; i++) {
            const position = playerPositions[i];
            const row = Math.floor((position - 1) / 10); // Mulai dari bawah
            const col = (row % 2 === 0) ? (position - 1) % 10 : 9 - (position - 1) % 10;
            
            // Posisi pion pada papan permainan
            const x = col * 60 + stabil_x
            const y = (9 - row) * 60 + stabil_y

            // Load gambar pemain dari URL
            const playerImageURL = playerImageURLs[i];
            const playerImage = await Jimp.read(playerImageURL);

            // Resize gambar pemain menjadi 38x38 (sesuai dengan ukuran lingkaran)
            playerImage.resize(50, 50);

            // Gabungkan gambar pemain dengan papan permainan
            board.composite(playerImage, x - 4, y - 4, { mode: Jimp.BLEND_SOURCE_OVER });
        }
        
        // Mengembalikan buffer gambar
        return await board.getBufferAsync(Jimp.MIME_PNG);
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
}

module.exports = { drawBoard }