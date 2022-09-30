const fetch = require('node-fetch') 
let handler = async (m, { conn, text, command }) => {
    if (!text) throw 'Masukkan Teks.....................'
    let hyz = await fetch(`https://api.violetics.pw/api/ephoto360/${command}?apikey=zyykey&text=${text}`) 
    conn.sendButtonImg(m.chat, hyz, succes, wm3, 'Thanks', 'thanks', m) 
}
handler.help = ['1917', '3d-crack-text-effect-online', '3d-underwater', '3d-wood', '3d-wood2', '3damerican-flag', '3dgalaxy-metal', '3dgold', '3dgradient', '3dgradient2', '3dmetal-effect', '3dmetal-text-', '3dmulticolor-papercut', '3dpig-gif', '3drose-gold', '3druby-stone', '3dsand-engraved', '3dshiny-metallic', '3dsilver', '3dspace', '3dsparkle-christmas', '3dstone', '3dsub-zombie', '3dtext-effect', '3dtext-effect2', '3dtext-effect3', '3dtext-pig', '3dvalentine-cards', '3dvintage-light-bulb', '3dxmas-cards', '3dxmas-cards2', '83day-card', '83day-card2', '83day-card3', '83day-card4', 'advanced-glow', 'ahri-league-of-legends', 'alice-league-of-kings', 'amily-arena-of-valor', 'angels-wings', 'anonymous-neon', 'art-shader', 'avengers', 'azzenka-league-of-kings', 'balloon-noel', 'balloon-text', 'balloons-cards', 'balloons-love', 'bats-halloween'].map(v => v + ' <teks>')
handler.tags = ['maker']
handler.command = /^(1917|3d-crack-text-effect-online|3d-wood2|3damerican-flag|3dgalaxy-metal|3dgold|3dgradient|3dgradient2|3dmetal-effect|3dmetal-text-|3dmulticolor-papercut|3dpig-gif|3drose-gold|3druby-stone|3dsand-engraved|3dshiny-metallic|3dsilver|3dspace|3dsparkle-christmas|3dstone|3dsub-zombie|3dtext-effect|3dtext-effect2|3dtext-effect3|3dtext-pig|3dvalentine-cards|3dvintage-light-bulb|3dxmas-cards|3dxmas-cards2|83day-card|83day-card2|83day-card3|83day-card4|advanced-glow|ahri-league-of-legends|alice-league-of-kings|amily-arena-of-valor|angels-wings|anonymous-neon|art-shader|avengers|azzenka-league-of-kings|balloon-noel|balloon-text|balloons-cards|balloons-love|bats-halloween)$/i

module.exports = handler
