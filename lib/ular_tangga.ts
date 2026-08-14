
import fs from 'fs';
import Jimp from 'jimp';

// Draw the game board with players
async function drawBoard(boardImageURL, user1 = null, user2 = null, user3 = null, user4 = null, stabil_x, stabil_y) {
    try {
        const board = await Jimp.read(boardImageURL);

        const playerPositions = [user1, user2, user3, user4].filter(pos => pos !== null && pos >= 1 && pos <= 100);

        const playerImageURLs = [
            "https://telegra.ph/file/30f92f923fb0484f0e4e0.png",
            "https://telegra.ph/file/6e07b5f30b24baedc7822.png",
            "https://telegra.ph/file/34f47137df0dc9aa9c15a.png",
            "https://telegra.ph/file/860b5df98963a1f14a91c.png"
        ];

        for (let i = 0; i < playerPositions.length; i++) {
            const position = playerPositions[i];
            const row = Math.floor((position - 1) / 10); // start from the bottom
            const col = (row % 2 === 0) ? (position - 1) % 10 : 9 - (position - 1) % 10;
            
            const x = col * 60 + stabil_x
            const y = (9 - row) * 60 + stabil_y

            const playerImage = await Jimp.read(playerImageURLs[i]);

            // Resize to fit the board circles
            playerImage.resize(50, 50);

            board.composite(playerImage, x - 4, y - 4, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 1, opacityDest: 1 });
        }
        
        return await board.getBufferAsync(Jimp.MIME_PNG);
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
}

export { drawBoard }