const axios = require('axios')
let split = '|'
let handler = async (m, { conn, args: [effect], text: txt, usedPrefix, command }) => {
  if (!effect) throw 'Ketik .textpro <nama efek>\n*Contoh:*\n.textpro 3Dscifi bot\n\n╭─❑ 「 LIST EFFECT 」 ❑──\n' + effects.map(v => v.title).join('\n│ • ')
  effect = effect.toLowerCase()
  if (!effects.find(v => (new RegExp(v.title, 'gi')).test(effect))) throw `Efek *${effect}* tidak ditemukan`
  let text = txt.replace(new RegExp(effect, 'gi'), '').trimStart()
  if (text.includes(split)) text = text.split(split)
  text = Array.isArray(text) ? text : [text]
  let res = await textpro(effect, ...text)
  if (typeof res == 'number') throw res == -1 ? `Efek *${effect}* tidak ditemukan` : `Gunakan format ${usedPrefix}${command} ${effect} ${new Array(res).fill('text').map((v, i) => v + (i ? i + 1 : '')).join('|')}`
  let result = await axios.get(res, {
    responseType: 'arraybuffer'
  })
  await m.reply('*Sedang Membuat...*')
  await conn.sendFile(m.chat, result.data, 'textpro.jpg', `*TEXTPRO*\n*Effect:* ${effect}`, m)
}
handler.help = ['textpro'].map(v => v + ' <effect> <text>')
handler.tags = ['maker']
handler.command = /^(textpro)$/i

module.exports = handler

const formData = require('form-data')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
var effects = [
    {
    "title": "│ • 1917Style",
    "url": "https://textpro.me/1917-style-text-effect-online-980.html"
  },
  {
    "title": "80RetroNeon",
    "url": "https://textpro.me/80-s-retro-neon-text-effect-online-979.html"
  },
  {
    "title": "3Ddeepseametal",
    "url": "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html"
  },
  {
    "title": "3Dscifi",
    "url": "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html"
  },
  {
    "title": "3Drainbow",
    "url": "https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html"
  },
  {
    "title": "3Dwaterpipe",
    "url": "https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html"
  },
  {
    "title": "3Dstonecrackedcool",
    "url": "https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html"
  },
  {
    "title": "3Dneonlight",
    "url": "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html"
  },
  {
    "title": "3Dgradient2",
    "url": "https://textpro.me/online-3d-gradient-text-effect-generator-1020.html"
  },
  {
    "title": "3Dglossymetal",
    "url": "https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html"
  },
  {
    "title": "3Donthebeach",
    "url": "https://textpro.me/create-3d-realistic-text-effect-on-the-beach-online-1018.html"
  },
  {
    "title": "3Dpapercut",
    "url": "https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html"
  },
  {
    "title": "3Dunderwatergenerator",
    "url": "https://textpro.me/3d-underwater-text-effect-generator-online-1013.html"
  },
  {
    "title": "3Dluxurygold",
    "url": "https://textpro.me/3d-luxury-gold-text-effect-online-1003.html"
  },
  {
    "title": "3Dgradient1",
    "url": "https://textpro.me/3d-gradient-text-effect-online-free-1002.html"
  },
  {
    "title": "3Dsandengraved",
    "url": "https://textpro.me/sand-engraved-3d-text-effect-989.html"
  },
  {
    "title": "3Dgluerealistic",
    "url": "https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html"
  },
  {
    "title": "3DAvengerslogo",
    "url": "https://textpro.me/create-3d-avengers-logo-online-974.html"
  },
  {
    "title": "3DMetalSilver",
    "url": "https://textpro.me/text-logo-3d-metal-silver-946.html"
  },
  {
    "title": "3DMetalRoseGold",
    "url": "https://textpro.me/text-logo-3d-metal-rose-gold-945.html"
  },
  {
    "title": "3DMetalGold",
    "url": "https://textpro.me/text-logo-3d-metal-gold-944.html"
  },
  {
    "title": "3DMetalGalaxy",
    "url": "https://textpro.me/text-logo-3d-metal-galaxy-943.html"
  },
  {
    "title": "3DXmasCards",
    "url": "https://textpro.me/xmas-cards-3d-online-942.html"
  },
  {
    "title": "3DBox",
    "url": "https://textpro.me/3d-box-text-effect-online-880.html"
  },
  {
    "title": "3DSteel",
    "url": "https://textpro.me/3d-steel-text-effect-877.html"
  },
  {
    "title": "3DGlowingMetal",
    "url": "https://textpro.me/3d-glowing-metal-text-effect-828.html"
  },
  {
    "title": "3DChrome",
    "url": "https://textpro.me/3d-chrome-text-effect-827.html"
  },
    {
    "title": "AbstraGold",
    "url": "https://textpro.me/abstra-gold-text-effect-859.html"
  },
    {
    "title": "Americanflag3D",
    "url": "https://textpro.me/create-american-flag-3d-text-effect-online-1051.html"
  },
    {
    "title": "Artisticbw",
    "url": "https://textpro.me/create-artistic-black-and-white-status-and-quote-with-your-photos-1021.html"
  },
    {
    "title": "AspookyHalloween",
    "url": "https://textpro.me/create-a-spooky-halloween-text-effect-online-1046.html"
  },
    {
    "title": "Avatargold",
    "url": "https://textpro.me/create-avatar-gold-online-956.html"
  },
   {
    "title": "Bagel",
    "url": "https://textpro.me/bagel-text-effect-857.html"
  },
  {
    "title": "Berry",
    "url": "https://textpro.me/create-berry-text-effect-online-free-1033.html"
  },
  {
    "title": "Biscuit",
    "url": "https://textpro.me/biscuit-text-effect-858.html"
  },
  {
    "title": "BlackMetal",
    "url": "https://textpro.me/black-metal-text-effect-829.html"
  },
  {
    "title": "Blackpink",
    "url": "https://textpro.me/create-blackpink-logo-style-online-1001.html"
  },
  {
    "title": "Blackwhitebear",
    "url": "https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html"
  },
  {
    "title": "BloodText",
    "url": "https://textpro.me/blood-text-on-the-frosted-glass-941.html"
  },
  {
    "title": "BlueBalloon",
    "url": "https://textpro.me/blue-foil-balloon-text-effect-923.html"
  },
  {
    "title": "Bluecircuit",
    "url": "https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html"
  },
  {
    "title": "BlueGem",
    "url": "https://textpro.me/blue-gem-text-effect-830.html"
  },
  {
    "title": "BlueGlass",
    "url": "https://textpro.me/blue-glass-text-effect-908.html"
  },
  {
    "title": "BlueGlitter",
    "url": "https://textpro.me/blue-glitter-text-effect-841.html"
  },
  {
    "title": "BlueJewelry1",
    "url": "https://textpro.me/blue-sparkling-jewelry-text-effect-898.html"
  },
 {
    "title": "BlueJewelry2",
    "url": "https://textpro.me/blue-jewelry-text-effect-844.html"
  },
  {
    "title": "BlueMetalic",
    "url": "https://textpro.me/blue-metal-text-effect-831.html"
  },
  {
    "title": "Bokeh",
    "url": "https://textpro.me/bokeh-text-effect-876.html"
  },
  {
    "title": "Bread",
    "url": "https://textpro.me/bread-text-effect-online-887.html"
  },
  {
    "title": "BreakWall",
    "url": "https://textpro.me/break-wall-text-effect-871.html"
  },
  {
    "title": "Brokenglass",
    "url": "https://textpro.me/broken-glass-text-effect-free-online-1023.html"
  },
  {
    "title": "BronzeGlitter",
    "url": "https://textpro.me/bronze-glitter-text-effect-835.html"
  },
  {
    "title": "CaptainAmerica1",
    "url": "https://textpro.me/create-a-captain-america-text-effect-free-online-1039.html"
  },
  {
    "title": "CaptainAmerica2",
    "url": "https://textpro.me/captain-america-text-effect-905.html"
  },
  {
    "title": "Carbon",
    "url": "https://textpro.me/carbon-text-effect-833.html"
  },
  {
    "title": "Cinematichorror",
    "url": "https://textpro.me/create-a-cinematic-horror-text-effect-1045.html"
  },
  {
    "title": "Cloudinthesky",
    "url": "https://textpro.me/create-a-cloud-text-effect-in-the-sky-online-997.html"
  },
  {
    "title": "Cloudonthesky",
    "url": "https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html"
  },
  {
    "title": "ChrismastGift",
    "url": "https://textpro.me/chrismast-gift-text-effect-869.html"
  },
  {
    "title": "Christmasholiday",
    "url": "https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html"
  },
  {
    "title": "ChocolateCake",
    "url": "https://textpro.me/chocolate-cake-text-effect-890.html"
  },
  {
    "title": "coolgraffiti",
    "url": "https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html"
  },
  {
    "title": "coolwallgraffiti",
    "url": "https://textpro.me/create-cool-wall-graffiti-text-effect-online-1009.html"
  },
{
    "title": "CyanJewelry2",
    "url": "https://textpro.me/cyan-jewelry-text-effect-845.html"
  },
{
    "title": "CyanJewelry1",
    "url": "https://textpro.me/cyan-sparkling-jewelry-text-effect-893.html"
},
{
    "title": "CyanGlass",
    "url": "https://textpro.me/cyan-glass-text-effect-909.html"
  },
{
    "title": "CyanBalloon",
    "url": "https://textpro.me/cyan-foil-balloon-text-effect-924.html"
  },
{
    "title": "DoubleExposure",
    "url": "https://textpro.me/double-exposure-text-effect-black-white-976.html"
  },
{
    "title": "DeluxeSilver",
    "url": "https://textpro.me/deluxe-silver-text-effect-970.html"
  },
{
    "title": "DeluxeGold",
    "url": "https://textpro.me/deluxe-gold-text-effect-966.html"
  },
{
    "title": "Denim",
    "url": "https://textpro.me/denim-text-effect-online-919.html"
  },
{
    "title": "DecorateGreen",
    "url": "https://textpro.me/decorate-green-text-effect-918.html"
  },
  {
    "title": "DecoratePurple",
    "url": "https://textpro.me/decorate-purple-text-effect-917.html"
  },
{
    "title": "Dropwater",
    "url": "https://textpro.me/dropwater-text-effect-872.html"
  },
{
    "title": "DecorativeGlass",
    "url": "https://textpro.me/decorative-glass-text-effect-891.html"
  },
  {
    "title": "ErodedMetal",
    "url": "https://textpro.me/eroded-metal-text-effect-834.html"
  },
  {
    "title": "Emboscracked",
    "url": "https://textpro.me/create-embossed-text-effect-on-cracked-surface-1024.html"
  },
  {
    "title": "Fabric",
    "url": "https://textpro.me/fabric-text-effect-online-964.html"
  },
  {
    "title": "FreeAdvancedGlow",
    "url": "https://textpro.me/free-advanced-glow-text-effect-873.html"
  },
  {
    "title": "FruitJuice",
    "url": "https://textpro.me/fruit-juice-text-effect-861.html"
  },
  {
    "title": "FireworkSparkle",
    "url": "https://textpro.me/firework-sparkle-text-effect-930.html"
  },
  {
    "title": "FoilBalloonBirthday",
    "url": "https://textpro.me/foil-balloon-text-effect-for-birthday-987.html"
  },
  {
    "title": "Futuristictechnology",
    "url": "https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html"
  },
  {
    "title": "Gameclassic",
    "url": "https://textpro.me/video-game-classic-8-bit-text-effect-1037.html"
  },
  {
    "title": "Glitch1",
    "url": "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html"
  },
  {
    "title": "GlitchTikTok",
    "url": "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html"
  },
  {
    "title": "Glossymetalic",
    "url": "https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html"
  },
  {
    "title": "GlossyBlueMetal",
    "url": "https://textpro.me/glossy-blue-metal-text-effect-967.html"
  },
  {
    "title": "GlossyCarbon",
    "url": "https://textpro.me/glossy-carbon-text-effect-965.html"
  },
  {
    "title": "GoldBalloon",
    "url": "https://textpro.me/gold-foil-balloon-text-effect-922.html"
  },
  {
    "title": "GoldJewelry",
    "url": "https://textpro.me/gold-sparkling-jewelry-text-effect-895.html"
  },
  {
    "title": "GoldGlitter",
    "url": "https://textpro.me/gold-glitter-text-effect-836.html"
  },
  {
    "title": "GreenBalloon",
    "url": "https://textpro.me/green-foil-balloon-text-effect-925.html"
  },
  {
    "title": "Greenhorror",
    "url": "https://textpro.me/create-green-horror-style-text-effect-online-1036.html"
  },
  {
    "title": "GreenGlass",
    "url": "https://textpro.me/green-glass-text-effect-910.html"
  },
  {
    "title": "GreenGlitter",
    "url": "https://textpro.me/green-glitter-text-effect-838.html"
  },
  {
    "title": "GreenJewelry1",
    "url": "https://textpro.me/green-jewelry-text-effect-846.html"
  },
  {
    "title": "GreenJewelry2",
    "url": "https://textpro.me/green-sparkling-jewelry-text-effect-897.html"
  },
  {
    "title": "GreenNeon",
    "url": "https://textpro.me/green-neon-text-effect-874.html"
  },
  {
    "title": "Halloweenskeleton",
    "url": "https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html"
  },
  {
    "title": "HalloweenFire",
    "url": "https://textpro.me/halloween-fire-text-effect-940.html"
  },
  {
    "title": "HarryPotter",
    "url": "https://textpro.me/create-harry-potter-text-effect-online-1025.html"
  },
  {
    "title": "HexaGolden",
    "url": "https://textpro.me/hexa-golden-text-effect-842.html"
  },
  {
    "title": "Holographic3D",
    "url": "https://textpro.me/holographic-3d-text-effect-975.html"
  },
  {
    "title": "Honey",
    "url": "https://textpro.me/honey-text-effect-868.html"
  },
  {
    "title": "HotMetal",
    "url": "https://textpro.me/hot-metal-text-effect-843.html"
  },
  {
    "title": "HorrorBlood",
    "url": "https://textpro.me/horror-blood-text-effect-online-883.html"
  },
  {
    "title": "HorrorGift",
    "url": "https://textpro.me/horror-gift-text-effect-866.html"
  },
  {
    "title": "IceCold",
    "url": "https://textpro.me/ice-cold-text-effect-862.html"
  },
  {
    "title": "Impressiveglitch",
    "url": "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html"
  },
  {
    "title": "KoiFish",
    "url": "https://textpro.me/koi-fish-text-effect-online-888.html"
  },
  {
    "title": "Lava",
    "url": "https://textpro.me/lava-text-effect-online-914.html"
  },
  {
    "title": "Layered",
    "url": "https://textpro.me/create-layered-text-effects-online-free-1032.html"
  },
  {
    "title": "LionLogo",
    "url": "https://textpro.me/create-lion-logo-mascot-online-938.html"
  },
  {
    "title": "LogoJoker",
    "url": "https://textpro.me/create-logo-joker-online-934.html"
  },
  {
    "title": "LuxuryMetal",
    "url": "https://textpro.me/color-full-luxury-metal-text-effect-969.html"
  },
  {
    "title": "Magma",
    "url": "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html"
  },
  {
    "title": "MarbleSlabs",
    "url": "https://textpro.me/marble-slabs-text-effect-864.html"
  },
  {
    "title": "Marble1",
    "url": "https://textpro.me/marble-text-effect-863.html"
  },
  {
    "title": "Marvelmetal",
    "url": "https://textpro.me/create-logo-style-marvel-studios-ver-metal-972.html"
  },
  {
    "title": "Marvelstudios",
    "url": "https://textpro.me/create-logo-style-marvel-studios-online-971.html"
  },
  {
    "title": "MatrixStyle",
    "url": "https://textpro.me/matrix-style-text-effect-online-884.html"
  },
  {
    "title": "MetalDarkGold1",
    "url": "https://textpro.me/metal-dark-gold-text-effect-984.html"
  },
  {
    "title": "MetalDarkGold2",
    "url": "https://textpro.me/metal-dark-gold-text-effect-online-939.html"
  },
  {
    "title": "Metallic",
    "url": "https://textpro.me/create-a-metallic-text-effect-free-online-1041.html"
  },
  {
    "title": "MetalPurpleDual",
    "url": "https://textpro.me/metal-purple-dual-effect-973.html"
  },
  {
    "title": "MetalRainbow",
    "url": "https://textpro.me/metal-rainbow-text-effect-854.html"
  },
  {
    "title": "Minion3D",
    "url": "https://textpro.me/minion-text-effect-3d-online-978.html"
  },
  {
    "title": "NaturalLeaves",
    "url": "https://textpro.me/natural-leaves-text-effect-931.html"
  },
  {
    "title": "Neondevil",
    "url": "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html"
  },
  {
    "title": "Neon1",
    "url": "https://textpro.me/neon-text-effect-online-963.html"
  },
  {
    "title": "Neon2",
    "url": "https://textpro.me/neon-text-effect-online-879.html"
  },
  {
    "title": "NeonLight1",
    "url": "https://textpro.me/neon-light-text-effect-online-882.html"
  },
  {
    "title": "NeonLightGalaxy",
    "url": "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html"
  },
  {
    "title": "Newyear1",
    "url": "https://textpro.me/new-year-cards-3d-by-name-960.html"
  },
  {
    "title": "Newyear2",
    "url": "https://textpro.me/happ-new-year-card-firework-gif-959.html"
  },
  {
    "title": "NinjaLogo",
    "url": "https://textpro.me/create-ninja-logo-online-935.html"
  },
  {
    "title": "OrangeGlass",
    "url": "https://textpro.me/orange-glass-text-effect-911.html"
  },
  {
    "title": "OrangeJewelry",
    "url": "https://textpro.me/orange-jewelry-text-effect-847.html"
  },
  {
    "title": "papercut1",
    "url": "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html"
  },
  {
    "title": "PeridotStone",
    "url": "https://textpro.me/peridot-stone-text-effect-916.html"
  },
  {
    "title": "PinkBalloon",
    "url": "https://textpro.me/pink-foil-balloon-text-effect-926.html"
  },
  {
    "title": "PinkJewelry",
    "url": "https://textpro.me/pink-sparkling-jewelry-text-effect-899.html"
  },
  {
    "title": "PinkGlitter",
    "url": "https://textpro.me/pink-glitter-text-effect-839.html"
  },
  {
    "title": "PinkCandy",
    "url": "https://textpro.me/pink-candy-text-effect-832.html"
  },
  {
    "title": "PlasticBagDrug",
    "url": "https://textpro.me/plastic-bag-drug-text-effect-867.html"
  },
  {
    "title": "PurpleBalloon",
    "url": "https://textpro.me/purple-foil-balloon-text-effect-927.html"
  },
  {
    "title": "PurpleJewelry1",
    "url": "https://textpro.me/purple-sparkling-jewelry-text-effect-896.html"
  },
  {
    "title": "PurpleJewelry2",
    "url": "https://textpro.me/purple-jewelry-text-effect-848.html"
  },
  {
    "title": "PurpleGlitter",
    "url": "https://textpro.me/purple-glitter-text-effect-840.html"
  },
  {
    "title": "PurpleGem",
    "url": "https://textpro.me/-gem-text-effect-853.html"
  },
  {
    "title": "PurpleGlass1",
    "url": "https://textpro.me/purple-glass-text-effect-online-892.html"
  },
  {
    "title": "PurpleGlass2",
    "url": "https://textpro.me/purple-glass-text-effect-912.html"
  },
  {
    "title": "PurpleShinyGlass",
    "url": "https://textpro.me/purple-shiny-glass-text-effect-906.html"
  },
  {
    "title": "PornhubLogo",
    "url": "https://textpro.me/pornhub-style-logo-online-generator-free-977.html"
  },
  {
    "title": "RainbowEqualizer",
    "url": "https://textpro.me/rainbow-equalizer-text-effect-902.html"
  },
  {
    "title": "Realisticvintage",
    "url": "https://textpro.me/create-realistic-vintage-style-light-bulb-1000.html"
  },
  {
    "title": "Realisticcloud",
    "url": "https://textpro.me/create-realistic-cloud-text-effect-online-free-999.html"
  },
  {
    "title": "RedBalloon",
    "url": "https://textpro.me/red-foil-balloon-text-effect-928.html"
  },
  {
    "title": "RedGlass",
    "url": "https://textpro.me/red-glass-text-effect-907.html"
  },
  {
    "title": "RedJewelry1",
    "url": "https://textpro.me/red-sparkling-jewelry-text-effect-894.html"
  },
  {
    "title": "RedJewelry2",
    "url": "https://textpro.me/red-jewelry-text-effect-849.html"
  },
  {
    "title": "Robot",
    "url": "https://textpro.me/robot-r2-d2-text-effect-903.html"
  },
  {
    "title": "RoadWarning",
    "url": "https://textpro.me/road-warning-text-effect-878.html"
  },
  {
    "title": "Rock",
    "url": "https://textpro.me/rock-text-effect-online-915.html"
  },
  {
    "title": "RustyMetal",
    "url": "https://textpro.me/rusty-metal-text-effect-860.html"
  },
  {
    "title": "SandSummerBeach",
    "url": "https://textpro.me/write-in-sand-summer-beach-free-online-991.html"
  },
  {
    "title": "SandWriting",
    "url": "https://textpro.me/sand-writing-text-effect-online-990.html"
  },
  {
    "title": "Sciencefiction",
    "url": "https://textpro.me/create-science-fiction-text-effect-online-free-1038.html"
  },
  {
    "title": "SCIFi",
    "url": "https://textpro.me/sci-fi-text-effect-855.html"
  },
  {
    "title": "ShinyMetal",
    "url": "https://textpro.me/shiny-metal-text-effect-852.html"
  },
  {
    "title": "SilverJewelry",
    "url": "https://textpro.me/silver-jewelry-text-effect-850.html"
  },
  {
    "title": "SilverGlitter",
    "url": "https://textpro.me/silver-glitter-text-effect-837.html"
  },
  {
    "title": "Sketch",
    "url": "https://textpro.me/create-a-sketch-text-effect-online-1044.html"
  },
  {
    "title": "Skeleton",
    "url": "https://textpro.me/skeleton-text-effect-online-929.html"
  },
  {
    "title": "Snowwinterholidays",
    "url": "https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html"
  },
  {
    "title": "Space1",
    "url": "https://textpro.me/create-space-text-effects-online-free-1042.html"
  },
  {
    "title": "Space3D",
    "url": "https://textpro.me/create-space-3d-text-effect-online-985.html"
  },
  {
    "title": "Strawberry",
    "url": "https://textpro.me/strawberry-text-effect-online-889.html"
  },
  {
    "title": "Stone1",
    "url": "https://textpro.me/create-a-stone-text-effect-online-982.html"
  },
  {
    "title": "Steel",
    "url": "https://textpro.me/steel-text-effect-online-921.html"
  },
  {
    "title": "Summerysand",
    "url": "https://textpro.me/create-a-summery-sand-writing-text-effect-988.html"
  },
  {
    "title": "Thunder1",
    "url": "https://textpro.me/online-thunder-text-effect-generator-1031.html"
  },
    {
    "title": "Thunder2",
    "url": "https://textpro.me/create-thunder-text-effect-online-881.html"
  },
  {
    "title": "Toxic",
    "url": "https://textpro.me/toxic-text-effect-online-901.html"
  },
  {
    "title": "Transformer",
    "url": "https://textpro.me/create-a-transformer-text-effect-online-1035.html"
  },
  {
    "title": "UltraGloss",
    "url": "https://textpro.me/ultra-gloss-text-effect-online-920.html"
  },
  {
    "title": "Watercolor",
    "url": "https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html"
  },
  {
    "title": "Wicker",
    "url": "https://textpro.me/wicker-text-effect-online-932.html"
  },
  {
    "title": "WolfLogo1",
    "url": "https://textpro.me/create-wolf-logo-galaxy-online-936.html"
  },
  {
    "title": "WolfLogo2",
    "url": "https://textpro.me/create-wolf-logo-black-white-937.html"
  },
  {
    "title": "Wonderfulgraffiti",
    "url": "https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html"
  },
  {
    "title": "Wood",
    "url": "https://textpro.me/wood-text-effect-856.html"
  },
  {
    "title": "YellowGlass",
    "url": "https://textpro.me/yellow-glass-text-effect-913.html"
  },
  {
    "title": "YellowJewelry\n╰❑",
    "url": "https://textpro.me/yellow-jewelry-text-effect-851.html"
  },
]
async function textpro(effect, ...texts) {
  texts = texts.filter(v => v)
  let eff = effects.find(v => (new RegExp(v.title, 'gi')).test(effect))
  if (!eff) return -1
  let resCookie = await fetch(eff.url, {
    headers: {
      "User-Agent": "GoogleBot",
    },
  })
  let html = await resCookie.text()
  const $$$ = cheerio.load(html)
  let textRequire = [!!$$$('#text-0').length, !!$$$('#text-1').length, !!$$$('#text-2').length].filter(v => v)
  // console.log({ textRequire, texts, textRequireLength: textRequire.length, textsLength: texts.length })
  if (textRequire.length > texts.length) return textRequire.length
  let cookieParse = (cookie, query) => cookie.includes(query + '=') ? cookie.split(query + '=')[1].split(';')[0] : 'undefined'
  let hasilcookie = resCookie.headers
    .get("set-cookie")
  hasilcookie = {
    __cfduid: cookieParse(hasilcookie, '__cfduid'),
    PHPSESSID: cookieParse(hasilcookie, 'PHPSESSID')
  }
  hasilcookie = Object.entries(hasilcookie).map(([nama, value]) => nama + '=' + value).join("; ")
  const $ = cheerio.load(html)
  const token = $('input[name="token"]').attr("value")
  const form = new formData()
  for (let text of texts) form.append("text[]", text)
  form.append("submit", "Go")
  form.append("token", token)
  form.append("build_server", "https://textpro.me")
  form.append("build_server_id", 1)
  let resUrl = await fetch(eff.url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  })
  const $$ = cheerio.load(await resUrl.text())
  let token2 = JSON.parse($$('#form_value').eq(1).text())
  let encode = encodeURIComponent;
  let body = Object.keys(token2)
    .map((key) => {
      let vals = token2[key];
      let isArray = Array.isArray(vals);
      let keys = encode(key + (isArray ? "[]" : ""));
      if (!isArray) vals = [vals];
      let out = [];
      for (let valq of vals) out.push(keys + "=" + encode(valq));
      return out.join("&");
    })
    .join("&")
  let resImgUrl = await fetch(`https://textpro.me/effect/create-image?${body}`, {
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
    }
  })
  let results = await resImgUrl.json()
  return 'https://textpro.me' + results.fullsize_image
}

