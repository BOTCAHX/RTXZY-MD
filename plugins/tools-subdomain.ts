import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { text, usedPrefix, command }) => {
  if (command === 'checksub') {
    if (!text) throw `*Contoh:* ${usedPrefix}checksub mydomain,idnet.my.id`;
    
    const [subdomain, domain] = text.split(',');
    if (!subdomain || !domain) {
      throw `*Contoh:* ${usedPrefix}checksub mydomain,idnet.my.id`;
    }
    
    try {
      m.reply(wait);
      const checkData = await whois(subdomain, domain);
      
      if (checkData?.result?.exists) {
        const record = checkData.result.record;
        let capt = `乂 *INFORMASI SUBDOMAIN*\n\n`;
        capt += `◦  Nama: ${record.name}\n`;
        capt += `◦  Tipe: ${record.type}\n`;
        capt += `◦  Content: ${record.content}\n`;
        capt += `◦  Proxied: ${record.proxied ? 'Ya' : 'Tidak'}\n`;
        capt += `◦  TTL: ${record.ttl}\n`;
        capt += `◦  Dibuat Pada: ${new Date(record.created_on).toLocaleString()}\n`;
        return m.reply(capt);
      } else {
        return m.reply(`*Subdomain ${subdomain}.${domain} tersedia dan dapat digunakan!*`);
      }
    } catch (error) {
      console.error(error);
      return m.reply('*Terjadi kesalahan!');
    }
  }

  if (command === 'createsub' || command === 'createdomain' || command === 'createsubdomain') {
    if (!text) throw `*Contoh:* ${usedPrefix}createsub mydomain,idnet.my.id,CNAME,linkcname,true\n\n\n*Domain Available*\n\n- idnet.my.id`;
    
    const [subdomain, domain, type, content, proxied] = text.split(',');
    if (!subdomain || !domain || !type || !content || proxied === undefined) {
      throw `*Contoh:* ${usedPrefix}createsub mydomain,idnet.my.id,CNAME,linkcname,true\n\n\n*Domain Available*\n\n- idnet.my.id`;
    }
    
    const isProxied = proxied.toLowerCase() === 'true';
    
    try {
      m.reply(wait);
     
      const checkData = await whois(subdomain, domain);     
      if (checkData?.result?.exists) {
        const record = checkData.result.record;
        let capt = `乂 *SUBDOMAIN SUDAH DIGUNAKAN*\n\n`;
        capt += `◦  Nama: ${record.name}\n`;
        capt += `◦  Tipe: ${record.type}\n`;
        capt += `◦  Content: ${record.content}\n`;
        capt += `◦  Proxied: ${record.proxied ? 'Ya' : 'Tidak'}\n`;
        capt += `◦  TTL: ${record.ttl}\n`;
        capt += `◦  Dibuat Pada: ${new Date(record.created_on).toLocaleString()}\n`;
        return m.reply(capt);
      }
      
      let response = await create(subdomain, domain, type, content, isProxied);
      if (response?.result?.success) {
        const result = response.result.result;
        let capt = `乂 *SUBDOMAIN GENERATOR*\n\n`;
        capt += `◦  Nama: ${result.name}\n`;
        capt += `◦  Tipe: ${result.type}\n`;
        capt += `◦  Content: ${result.content}\n`;
        capt += `◦  Proxied: ${result.proxied ? 'Ya' : 'Tidak'}\n`;
        capt += `◦  TTL: ${result.ttl}\n`;
        capt += `◦  Dibuat Pada: ${new Date(result.created_on).toLocaleString()}\n`;
        m.reply(capt);
      } else {
        const errmsg_ = response?.result?.errors?.[0]?.message || 'Terjadi kesalahan yang tidak diketahui.';
        m.reply(`*Gagal membuat subdomain!*\n\n*Error:* ${errmsg_}`);
      }
    } catch (error) {
      console.error(error);
      m.reply('*Terjadi kesalahan!*');
    }
  }
};

handler.command = ['createsub', 'checksub', 'createdomain','createsubdomain'];
handler.help = ['createsub', 'checksub', 'createdomain','createsubdomain'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = true;

export default handler;

async function whois(subdomain, domain) {
  const url = `https://api.botcahx.eu.org/api/tools/whois-subdo?subdomain=${encodeURIComponent(subdomain)}&domain=${encodeURIComponent(domain)}&apikey=${btc}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function create(subdomain, domain, type, content, proxied) {
  const url = `https://api.botcahx.eu.org/api/tools/create-subdo?subdomain=${encodeURIComponent(subdomain)}&domain=${encodeURIComponent(domain)}&type=${encodeURIComponent(type)}&content=${encodeURIComponent(content)}&proxied=${proxied}&apikey=${btc}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    return await response.json();
  } catch (error) {
    return null;
  }
}
