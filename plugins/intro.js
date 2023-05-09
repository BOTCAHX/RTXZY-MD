let handler = async m => {

let intro = `╭─── *「 Kartu Intro 」*
│       
│ *Nama     :* 
│ *Gender   :* 
│ *Umur      :* 
│ *Hobby    :* 
│ *Kelas      :* 
│ *Asal         :* 
│ *Agama    :* 
│ *Status     :* 
╰──────────────`
m.reply(intro)
}
handler.command = /^(intro)$/i

module.exports = handler