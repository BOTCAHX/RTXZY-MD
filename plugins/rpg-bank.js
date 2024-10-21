let handler = async (m, { conn, args }) => {
  let target = m.mentionedJid[0] || m.sender 
  let user = global.db.data.users[target]
  let name = user.name
  let tag = `Bank @${m.sender.split`@`[0]}`
  let exp = user.exp
  let limit = user.limit
  let balance = user.money
  let atm = user.bank
  let level = user.level
  let role = user.role

  let capt = `乂  *B A N K - U S E R*  乂\n\n`
  capt += `  ◦  *Username* : ${name}\n`
  capt += `  ◦  *Money* : ${balance}\n`
  capt += `  ◦  *Saldo Bank* : ${atm}\n\n`
  capt += `> Jika tidak ada pilihan di button bisa ketik\n *.atm <jumlah>* untuk menabung\n *.pull <jumlah>* untuk menarik uang\n`

let msg = {
		viewOnceMessage: {
			message: {
				messageContextInfo: {
					deviceListMetadata: {},
					deviceListMetadataVersion: 2,
				},
				interactiveMessage: {
					body: {
						text: capt,
					},
					footer: {
						text: wm,
					},
					header: {
						title: '',
						subtitle: '',
						hasMediaAttachment: false
					},
					nativeFlowMessage: {
						buttons: [
							{
              "name": "single_select",
              "buttonParamsJson":
JSON.stringify({
 "title": "Nabung",
"sections": [
      {
        title: '',
        highlight_label: '', /*personal*/
        rows: [
          { "header": "", "title": 'Nabung 10k', "description": "", "id": `.atm 10000` },
          { "header": "", "title": 'Nabung 50k', "description": "", "id": `.atm 50000` },
          { "header": "", "title": 'Nabung 100k', "description": "", "id": `.atm 100000` },
          { "header": "", "title": 'Nabung 200k', "description": "", "id": `.atm 200000` },
          { "header": "", "title": 'Nabung 300k', "description": "", "id": `.atm 300000` },
          { "header": "", "title": 'Nabung 400k', "description": "", "id": `.atm 400000` },
          { "header": "", "title": 'Nabung 500k', "description": "", "id": `.atm 500000` },
          { "header": "", "title": 'Nabung 1jt', "description": "", "id": `.atm 1000000` },
        ]
      }
    ]
              })              
            }, {
              "name": "single_select",
              "buttonParamsJson":
JSON.stringify({
 "title": "Tarik Uang",
"sections": [
      {
        title: '',
        highlight_label: '', /*personal*/
        rows: [
          { "header": "", "title": 'Tarik uang 10k', "description": "", "id": `.pull 10000` },
          { "header": "", "title": 'Tarik uang 50k', "description": "", "id": `.pull 50000` },
          { "header": "", "title": 'Tarik uang 100k', "description": "", "id": `.pull 100000` },
          { "header": "", "title": 'Tarik uang 200k', "description": "", "id": `.pull 200000` },
          { "header": "", "title": 'Tarik uang 300k', "description": "", "id": `.pull 300000` },
          { "header": "", "title": 'Tarik uang 400k', "description": "", "id": `.pull 400000` },
          { "header": "", "title": 'Tarik uang 500k', "description": "", "id": `.pull 500000` },
          { "header": "", "title": 'Tarik uang 1jt', "description": "", "id": `.pull 1000000` },
        ]
      }
    ]
              })              
            } 
						],
					},
					contextInfo: {
						quotedMessage: m.message,
						participant: m.sender,
						...m.key
					}
				},
			},
		},
	};
    return conn.relayMessage(m.chat, msg, { });
}

handler.help = ['Bank']
handler.tags = ['rpg']
handler.command = /^bank$/i

module.exports = handler