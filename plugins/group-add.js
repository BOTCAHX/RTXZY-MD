const {
	getBinaryNodeChild,
	getBinaryNodeChildren
} = require('@adiwajshing/baileys')

const fetch = require('node-fetch')

let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
	if (!text) throw `_Masukan nomor!_\nContoh:\n\n${usedPrefix + command} ${global.owner[0]}`
	m.reply('_Sedang di proses..._')
    let _participants = participants.map(user => user.id)
    let users = (await Promise.all(
        text.split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [
                v,
                await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
    
    const response = await conn.query({
        tag: 'iq',
        attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: m.chat,
        },
        content: users.map(jid => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }]
        }))
    })
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null)
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
    const add = getBinaryNodeChild(response, 'add')
    const participant = getBinaryNodeChildren(response, 'add')
    let anu = participant[0].content.filter(v => v)
    if (anu[0].attrs.error == 408) conn.sendButton(m.chat, `Tidak dapat menambahkan @${anu[0].attrs.jid.split('@')[0]}!\nKabarnya si @${anu[0].attrs.jid.split('@')[0]} baru keluar dari grup ini :'v`, wm, 'link', usedPrefix + `link`, m)
    for (const user of participant[0].content.filter(item => item.attrs.error == 403)) {
    	const jid = user.attrs.jid
    	const content = getBinaryNodeChild(user, 'add_request')
    	const invite_code = content.attrs.code
    	const invite_code_exp = content.attrs.expiration
    	const txt = `Mengundang @${jid.split('@')[0]} menggunakan invite...`
    	await m.reply(txt, null, {
    		mentions: await conn.parseMention(txt)
    	})
    	//await conn.delay(100)
    	//conn.sendButton(m.chat, txt, wm, 'menu', '.m', m)
    	await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, await conn.getName(m.chat), 'Undangan untuk bergabung ke grup WhatsApp saya', jpegThumbnail)
    }
}
handler.help = ['add', '+'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(add|\+)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true
handler.fail = null

module.exports = handler
