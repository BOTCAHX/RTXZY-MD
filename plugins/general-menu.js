/** Menu Untuk Whatsapp List Ringan 
 Udah gua buat biar ringan cuma gak manggil semua menu

Note:
Ini ada menu payment tujuan nya biar kalo lu run panel atau 
Run di platform yang kecil disk nya ( penyimpanan )
Agar terap bisa di gunakan dan tidak ada kendala seperti
[Error: ENOENT: no such file or directory, open ''] 
**/ 

var fetch = require("node-fetch");
var handler = async (m, { 
 conn,
 text, 
 usedPrefix, 
 command 
 }) => {
    var _uptime = process.uptime() * 1000
    var tio = clockString(_uptime)
    var time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')
    var ar = ['list', 'menu']
    var title = `𝑳𝒊𝒔𝒕 𝑴𝒆𝒏𝒖 𝑩𝒐𝒕\n\n│█║▌║▌║║▌║▌║█│▌`
    var tmb = `‎ ‎`
    const sections = [ {
	title: `Uptime: ${tio} : Time: ${time}`,
	rows: [
	    {title: "Semua Perintah", rowId: '.allmenu', description: 'Menampilkan semua perintah bot' },
		]
}, {
	title: `Menu Utama`,
	rows: [
	      {title: "Perintah 2", rowId: '.pay', description: 'Gunakan  jika perintah utama error' },
	      {title: "Donasi", rowId: '.donasi', description: 'Belikan Owner Kopi' },
	      {title: "Dashboard", rowId: '.dash', description: 'Menampilkan Dashboard' },
	      	]
}, {
	title: `Menu Informasi`,
	rows: [
	     {title: "Website Official", rowId: '.web', description: 'Menampilkan website' },
             {title: "Group", rowId: '.gcbot', description: 'Group Official Bot' },
         	]
}, {
	title: `Shortcut List`,
	rows: [
	    {title: "Script", rowId: '.sc', description: 'Script yang digunakan Bot' },
            {title: "Speed", rowId: '.speed', description: 'Test kecepatan Bot' },
            {title: "List Textpro", rowId: '.textpro', description: 'Menu maker tambahan' },
            {title: "Info", rowId: '.info', description: 'Informasi lainya' },
         	]
}, {
	title: `Creator Bot`,
	rows: [
           {title: "Owner", rowId: '.owner', description: 'Contact Owner' },
        	]
}, {
	   title: `Warning!`,
	rows: [
           {title: "Warning", rowId: 'null', description: 'Jangan pernah memperjual belikan sc ini!' },
        ]
 } ]

const listMessage = {
  text: title,
  mentions: [m.sender],
  footer: '',
  buttonText: tmb,
  sections
}
  if(!text) return conn.sendMessage(m.chat, listMessage, { quoted: m })
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(tod|menu|help|\?)$/i
handler.register = false;
module.exports = handler;
function clockString(ms) {
    var days = Math.floor(ms / (24 * 60 * 60 * 1000));
    var daysms = ms % (24 * 60 * 60 * 1000);
    var hours = Math.floor((daysms) / (60 * 60 * 1000));
    var hoursms = ms % (60 * 60 * 1000);
    var minutes = Math.floor((hoursms) / (60 * 1000));
    var minutesms = ms % (60 * 1000);
    var sec = Math.floor((minutesms) / (1000));
    return days + " D " + hours + " H " + minutes + " M " + sec + " S ";
}
