//Udah ada🤣


// let fetch = require('node-fetch')

// let handler = async (m, { conn, args, usedPrefix, command }) => {

  // if (!args[0]) throw `Use example ${usedPrefix + command} https://www.mediafire.com/file/*****.docs`

// let res = await fetch(API('xteam', '/dl/mediafire', { url: args[0] }, 'apikey'))

    // let json = await res.json()

    

    // m.reply(wait)

// await conn.reply(m.chat, `Downloading media from MediaFire`, 0, {

  // contextInfo: { mentionedJid: [m.sender],

    // externalAdReply :{

    // mediaUrl: linkig,

    // mediaType: 2,

    // description: deslink , 

    // title: titlink,

    // body: wm, //`${fileSizeH}`,

    // thumbnail: await(await fetch(img)).buffer(),

    // sourceUrl: linkgc

     // }}

  // }) 

// let txt = `🔗 *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)).data}

// 📂 *Size*: ${json.result.size}

// `.trim()

// m.reply(txt)

   // // await conn.sendFile(m.chat, json.result.url, `${json.result.title}`, m , null )

// await conn.sendMessage(m.chat, { document: { url: json.result.url}, mimetype: 'document', fileName: `${json.result.title}`}, {quoted: m})

// }

// handler.help = ['mediafire'].map(v => v + ' <url>')

// handler.tags = ['downloader']

// handler.command = /^(mediafire|mf)?$/i

// module.exports = handler
