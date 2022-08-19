let handler = async (m, { conn, text, usedPrefix, command }) => {

conn.sendImageAsSticker(m.chat, pickRandom(stikerhuuu), m, { packname: "sticker by", author: "owner bot:v" })
}

handler.customPrefix = /^(huuu)$/i
handler.command = new RegExp

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
let stikerhuuu = [
 "https://telegra.ph/file/fa2bbea0f7de2575cf027.png",//patrick huu
 "https://telegra.ph/file/4a2db7bc9f3f9ecfc007d.png",//anime yntkts
 "https://telegra.ph/file/5f6079714851d9927697e.png",//windah bocil
 "https://telegra.ph/file/d5100b4ce95a0012e88c1.png",//patrick bawa minum
 "https://telegra.ph/file/2ade25087c89f86587853.png",//pak polisi pap tt
 "https://telegra.ph/file/eb2b5e5fff569896c1639.png",//kucing1
 "https://telegra.ph/file/bd8a0e7ea01218531798b.png",//kacamata
 "https://telegra.ph/file/300610838ffa0e6576eb9.png",//patrick pembohong
 "https://telegra.ph/file/954afe562e58c144620ae.png",//spongebob FBI
 "https://telegra.ph/file/72026dcc46e4cb4b6f9ae.png",//mazowski monster inc
 "https://telegra.ph/file/aa9f1bea869e362e6f56e.png",//wkwk
 "https://telegra.ph/file/09bbff0da316ba21b4f8e.png",//kucing2
 "https://telegra.ph/file/2e0637d57e3cc1abcb4a0.png",//patrick anak setan
 "https://telegra.ph/file/d771ae015b5486859d03f.png",//mazowski 2
 "https://telegra.ph/file/9c7606f571c05b4d0c941.png",//hengker
 "https://telegra.ph/file/84fd937257bcd614d6c9e.png",//anjing
 "https://telegra.ph/file/b8ba6989c00c50df049d0.png",//bapak bapak lovee
 "https://telegra.ph/file/2f618fffab6ff7bea32ab.png",//abang saleh
 "https://telegra.ph/file/dfbf483c209a31f01b4e5.png"//hengker2
]
