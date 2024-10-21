let handler = async (m, { conn, args }) => {
  let target = m.mentionedJid[0] || m.sender 
  let user = global.db.data.users[target]
  
  let armor = user.armor
  let sword = user.sword
  let fishingrod = user.fishingrod
  let pickaxe = user.pickaxe
  let katana = user.katana
  let bow = user.bow
  let axe = user.axe

  let capt = `
*INVENTORY - USER*

*Username* : ${user.name}
*Role* : ${user.role}
*Level* : ${user.level}
*Exp* : ${user.exp}
*Limit* : ${user.limit}
*Money* : ${user.money}
*Title* : ${user.titlein}
*Skill* : ${user.skill ? user.skill : 'Tidak Ada'}

━━━╺╺「 *Status* 」╸╸━━━
*Health* : ${user.healt}
*Energi* : ${user.energi}
*Stamina* : ${user.stamina}
*Speed* : ${user.speed}
*Strength* : ${user.strenght}
*Attack* : ${user.attack}
*Defense* : ${user.defense}

━━━╺╺「 *Backpack* 」╸╸━━━
*Potion* : ${user.potion}
*Diamond* : ${user.diamond}
*Emas* : ${user.emas}
*Iron* : ${user.iron}
*Berlian* : ${user.berlian}
*Emerald* : ${user.emerald}
*Litecoin* : ${user.litecoin}
*Tiketcoin* : ${user.tiketcoin}
*Batu* : ${user.batu}
*Kayu* : ${user.kayu}
*String* : ${user.string}
*Coal* : ${user.coal}

━━━╺╺「 *Senjata* 」╸╸━━━
*Armor* : ${armor == 0 ? 'Tidak Punya' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Emerald Armor' : '' || armor == 6 ? 'Crystal Armor' : '' || armor == 7 ? 'Obsidian Armor' : '' || armor == 8 ? 'Netherite Armor' : '' || armor == 9 ? 'Wither Armor' : '' || armor == 10 ? 'Dragon Armor' : '' || armor == 11 ? 'Hacker Armor' : '' || armor == 12 ? 'GOD Armor' : ''}
*Sword* : ${sword == 0 ? 'Tidak Punya' : '' || sword == 1 ? 'Wooden Sword' : '' || sword == 2 ? 'Iron Sword' : '' || sword == 3 ? 'Gold Sword' : '' || sword == 4 ? 'Diamond Sword' : '' || sword == 5 ? 'Netherite Sword' : '' || armor == 6 ? 'Crystal Sword' : '' || sword == 7 ? 'Obsidian Sword' : '' || sword == 8 ? 'Netherite Sword' : '' || sword == 9 ? 'Wither Sword' : '' || sword == 10 ? 'Dragon Sword' : '' || sword == 11 ? 'Hacker Sword' : '' || sword == 12 ? 'GOD Sword' : ''}
*FishingRod* : ${fishingrod == 0 ? 'Tidak Punya' : '' || fishingrod == 1 ? 'Wood FishingRod' : '' || fishingrod == 2 ? 'Iron FishingRod' : '' || fishingrod == 3 ? 'Gold FishingRod' : '' || fishingrod == 4 ? 'Diamond FishingRod' : '' || fishingrod == 5 ? 'Netherite FishingRod' : '' || fishingrod == 6 ? 'Crystal FishingRod' : '' || fishingrod == 7 ? 'Obsidian FishingRod' : '' || fishingrod == 8 ? 'Netherite FishingRod' : '' || fishingrod == 9 ? 'Wither FishingRod' : '' || fishingrod == 10 ? 'Dragon FishingRod' : '' || fishingrod == 11 ? 'Hacker FishingRod' : '' || fishingrod == 12 ? 'GOD FishingRod' : ''}
*Pickaxe* : ${pickaxe == 0 ? 'Tidak Punya' : '' || pickaxe == 1 ? 'Wood Pickaxe' : '' || pickaxe == 2 ? 'Iron Pickaxe' : '' || pickaxe == 3 ? 'Gold Pickaxe' : '' || pickaxe == 4 ? 'Diamond Pickaxe' : '' || pickaxe == 5 ? 'Netherite Pickaxe' : '' || pickaxe == 6 ? 'Crystal Pickaxe' : '' || pickaxe == 7 ? 'Obsidian Pickaxe' : '' || pickaxe == 8 ? 'Netherite Pickaxe' : '' || pickaxe == 9 ? 'Wither Pickaxe' : '' || pickaxe == 10 ? 'Dragon Pickaxe' : '' || pickaxe == 11 ? 'Hacker Pickaxe' : '' || pickaxe == 12 ? 'GOD Pickaxe' : ''}
*Katana* : ${katana == 0 ? 'Tidak Punya' : '' || katana == 1 ? 'Wood Katana' : '' || katana == 2 ? 'Iron Katana' : '' || katana == 3 ? 'Gold Katana' : '' || katana == 4 ? 'Diamond Katana' : '' || katana == 5 ? 'Netherite Katana' : '' || katana == 6 ? 'Crystal Katana' : '' || katana == 7 ? 'Obsidian Katana' : '' || katana == 8 ? 'Netherite Katana' : '' || katana == 9 ? 'Wither Katana' : '' || katana == 10 ? 'Dragon Katana' : '' || katana == 11 ? 'Hacker Katana' : '' || katana == 12 ? 'GOD Katana' : ''}
*Axe* : ${axe== 0 ? 'Tidak Punya' : '' || axe== 1 ? 'Wood Axe' : '' || axe== 2 ? 'Iron Axe' : '' || axe== 3 ? 'Gold Axe' : '' || axe== 4 ? 'Diamond Axe' : '' || axe== 5 ? 'Netherite Axe' : '' || axe== 6 ? 'Crystal Axe' : '' || axe== 7 ? 'Obsidian Axe' : '' || axe== 8 ? 'Netherite Axe' : '' || axe== 9 ? 'Wither Axe' : '' || axe== 10 ? 'Dragon Axe' : '' || axe== 11 ? 'Hacker Axe' : '' || axe== 12 ? 'GOD Axe' : ''}
*Bow* : ${bow == 0 ? 'Tidak Punya' : '' || bow == 1 ? 'Wood Bow' : '' || bow == 2 ? 'Iron Bow' : '' || bow == 3 ? 'Gold Bow' : '' || bow == 4 ? 'Diamond Bow' : '' || bow == 5 ? 'Netherite Bow' : '' || bow == 6 ? 'Crystal Bow' : '' || bow == 7 ? 'Obsidian Bow' : '' || bow == 8 ? 'Netherite Bow' : '' || bow == 9 ? 'Wither Bow' : '' || bow == 10 ? 'Dragon Bow' : '' || bow == 11 ? 'Hacker Bow' : '' || bow == 12 ? 'GOD Bow' : ''}

━━━╺╺「 *Durability* 」╸╸━━━
*Armor* : ${user.armordurability}
*Sword* : ${user.sworddurability}
*Fishingrod* : ${user.fishingroddurability}
*Pickaxe* : ${user.pickaxedurability}
*Katana* : ${user.katanadurability}
*Axe* : ${user.axedurability}
*Bow* : ${user.bowdurability}

━━━╺╺「 *User Box* 」╸╸━━━
*Common* : ${user.common}
*Uncommon* : ${user.uncommon}
*Mythic* : ${user.mythic}
*Legendary* : ${user.legendary}
*Total Box* : ${user.common + user.uncommon + user.mythic + user.legendary}

━━━╺╺「 *User Pets* 」╸╸━━━
*Pet token* : ${user.pet}
*Makanan pet* : ${user.makananpet}

*Kucing* : Lv. ${user.kucing}
*Anjing* : Lv. ${user.anjing}
*Rubah* : Lv. ${user.rubah}
*Serigala* : Lv. ${user.serigala}
*Phonix* : Lv. ${user.phonix}
`
  
/*conn.sendMessage(m.chat, {
text: capt,
contextInfo: {
externalAdReply: {
title: 'I N V E N T O R Y',
thumbnailUrl: 'https://telegra.ph/file/ea3ee889b63edfb616c2d.jpg',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m })*/

conn.fakeReply(m.chat, capt, '0@s.whatsapp.net', 'Inventory', 'status@broadcast')
  //conn.sendFile(m.chat, 'https://telegra.ph/file/5488aa5c5b3c28cd35e0e.jpg', 'balance.jpg', caption, m)
}

handler.help = ['inventory *@user*']
handler.tags = ['rpg']
handler.command = /^inv|inventory$/i

module.exports = handler