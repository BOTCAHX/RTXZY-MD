let handler = async (m, { conn, command }) => {
let rtxzy = `https://api-reysekha.herokuapp.com/api/wallpaper/${command}?apikey=APIKEY`
    conn.sendButtonImg(m.chat, rtxzy, 'Nih', wm2, 'Next', `.${command}`, m) 
}
handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'shota', 'waifu2', 'yotsuba', 'shinomiya', 'yumeko', 'tejina', 'shizuka', 'gremory', 'shina', 'shinka', 'yuri', 'rize', 'tsunade', 'onepiece', 'boneka-chucky', 'megumim', 'toukachan', 'pokemon']
handler.tags = ['anime']
handler.command = /^(akira|akiyama|anna|asuna|ayuzawa|boruto|chiho|chitoge|deidara|erza|elaina|eba|emilia|hestia|hinata|inori|isuzu|itachi|itori|kaga|kagura|kaori|keneki|kotori|kurumi|madara|mikasa|miku|minato|naruto|nezuko|sagiri|sasuke|sakura|shota|waifu2|yotsuba|shinomiya|yumeko|tejina|shizuka|gremory|shina|yuri|rize|tsunade|onepiece|boneka-chucky|megumim|toukachan|pokemon)$/i
module.exports = handler
