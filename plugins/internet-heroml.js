let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan nama hero', m)

  await m.reply('Searching...')
    let res = await fetch(`https://x-restapi.herokuapp.com/api/heroml?q=${text}&apikey=BETA`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.image)).buffer()
    let hasil = `*── 「 HERO ML 」 ──*

▢ *Name*: ${json.hero_name}
▢ *Role*: ${json.role}
▢ *Lane*: ${json.laning_recommendation}
▢ *Relate Date*: ${json.release_date}
▢ *Quotes*: ${json.entrance_quotes}
▢ *Features*: ${json.hero_feature}
▢ *Info*: 
${json.items[0]}
${json.items[1]}
${json.items[2]}
${json.items[3]}
${json.items[4]}
${json.character.chara[0]}
${json.character.chara[1]}
▢ *Atribut*: ${json.attributes.movement_speed}
${json.attributes.physical_attack}
${json.attributes.magic_power}
${json.attributes.attack_speed}
${json.attributes.physical_defense}
${json.attributes.magic_defense}
${json.attributes.basic_atk_crit_rate}
${json.attributes.hp}
${json.attributes.mana}
${json.attributes.ability_crit_rate}
${json.attributes.hp_regen}
${json.attributes.hp}
${json.attributes.mana_regen}
▢ *Price*: 
*BP*: ${json.price.battle_point}
*DIAMOND*: ${json.price.diamond}
▢ *Skill*: 
*Durability*: ${json.skill.durability}
*Offense*: ${json.skill.offense}
*Skill Effect*: ${json.skill.skill_effects}
*Difficulty*: ${json.skill.difficulty}
▢ *Spesiality*: ${json.speciality}
▢ *Background Story*: 
${json.background_story}
`

    conn.sendFile(m.chat, thumb, 'tiktokstalk.jpg', hasil, m)
}
handler.help = ['heroml'].map(v => v + ' <nama hero>')
handler.tags = ['internet', 'fun']
handler.command = /^(heroml)$/i

module.exports = handler
