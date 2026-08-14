import fetch from 'node-fetch';

let handler: WaPlugin = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'vccgenerator' || command == 'vccgen') {
    let jumlah = args[0] ? args[0] : "10";
    m.reply(wait);
    try {
      let vcc = await fetch(`https://api.botcahx.eu.org/api/tools/vccgen?jumlah=${jumlah}&apikey=${btc}`).then(res => res.json());
      if (!vcc.status) throw 'Failed to generate VCC';
      await conn.reply(m.chat, vcc.result, m);
    } catch (e) {
      console.log(e);
      throw eror
    }
  }
  
  if (command == 'fakeaddress' || command == 'addressgenerator') {
    m.reply(wait);
    try {
      if (!text) {
        let list_country = await fetch(`https://api.botcahx.eu.org/api/tools/random-address?country=&apikey=${btc}`).then(res => res.json());
        if (!list_country.status) throw 'Failed to fetch country list';
        
        let caption = `*Available Countries:*\n\n`;
        let countries = list_country.result;
        
        for (let i = 0; i < countries.length; i++) {
          caption += `${i+1}. ${countries[i].name}\n`;
        }
        
        caption += `\nUse: ${usedPrefix}${command} [country_name] to generate a random address for a specific country.`;
        
        await conn.reply(m.chat, caption, m);
      } else {
        let address = await fetch(`https://api.botcahx.eu.org/api/tools/random-address?country=${text}&apikey=${btc}`).then(res => res.json());
        if (!address.status) throw 'Failed to generate address or invalid country name';
        
        let result = address.result;
        let caption = `*Random Address Generator*\n\n`;
        caption += `*Name:* ${result.Name}\n`;
        caption += `*Gender:* ${result.Gender}\n`;
        caption += `*Date of Birth:* ${result["Date of Birth"]}\n`;
        caption += `*Street:* ${result.Street}\n`;
        caption += `*City/Town:* ${result["City/Town"]}\n`;
        caption += `*State/Province:* ${result["State/Province/Region"]}\n`;
        caption += `*Zip/Postal Code:* ${result["Zip/Postal Code"]}\n`;
        caption += `*Country:* ${result.Country}\n`;
        caption += `*Phone Number:* ${result["Phone Number"]}\n`;
        caption += `*Email:* ${result["email-address"]}\n`;
        caption += `*Weight:* ${result.Weight}\n`;
        
        await conn.reply(m.chat, caption, m);
      }
    } catch (e) {
      console.log(e);
      throw eror
    }
  }
}

handler.command = handler.help = ['vccgenerator', 'vccgen', 'fakeaddress', 'addressgenerator']
handler.tags = ['tools']
handler.limit = true

export default handler
