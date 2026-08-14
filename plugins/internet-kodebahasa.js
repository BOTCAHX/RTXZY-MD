let handler = async m => m.reply(`
┏━━°❀❬ *Kode Bahasa* ❭❀°━━┓
┃
┃• af : Afrikaans
┃• sq : Albanian
┃• ar : Arab
┃• hy : Armenian
┃• ca : Catalan
┃• zh : Chinese
┃• zh-cn : Chinese (Mandarin/China)
┃• zh-tw : Chinese (Mandarin/Taiwan)
┃• zh-yue : Chinese (Cantonese)
┃• hr : Croatian
┃• cs : Czech
┃• da : Danish
┃• nl : Dutch
┃• en : English
┃• en-au : English (Australia)
┃• en-uk : English (United Kingdom)
┃• en-us : English (United States)
┃• eo : Esperanto
┃• fi : Finnish
┃• fr : French
┃• de : German
┃• el : Greek
┃• ht : Haitian Creole
┃• hi : Hindi
┃• hu : Hungarian
┃• is : Icelandic
┃• id : Indonesian
┃• it : Italian
┃• ja : Japanese
┃• ko : Korean
┃• la : Latin
┃• lv : Latvian
┃• mk : Macedonian
┃• no : Norwegian
┃• pl : Polish
┃• pt : Portuguese
┃• pt-br : Portuguese (Brazil)
┃• ro : Romanian
┃• ru : Russian
┃• sr : Serbian
┃• sk : Slovak
┃• es : Spanish
┃• es-es : Spanish (Spain)
┃• es-us : Spanish (United States)
┃• sw : Swahili
┃• sv : Swedish
┃• ta : Tamil
┃• th : Thai
┃• tr : Turkish
┃• vi : Vietnamese
┃• cy : Welsh
┗━━━━━━━━━━━━━━━━
`.trim()) // Tambah sendiri kalo mau
handler.help = ['kodebahasa']
handler.tags = ['internet']
handler.command = /^kodebahasa$/i

export default handler
