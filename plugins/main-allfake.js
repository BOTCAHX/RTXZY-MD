/*
 * Hyzer Baik :) 
 * Wkwkk Ini Cuman Buat Pelengkap Doang
 * Bukan Bagian Dari Fitur Deck
 * Sumimasen >,<
*/

const fs = require('fs') 
//----------[ FAKE TOKO ]--------//
global.ftoko = {
key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "0@s.whatsapp.net" } : {})
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": fs.readFileSync('./media/thumbnail.jpg') //Gambarnya
					},
					"title": wm, //Kasih namalu 
					"description": "Botcahx", 
					"currencyCode": "USD",
					"priceAmount1000": "2000",
					"retailerId": "Ghost",
					"productImageCount": 1
				},
				    "businessOwnerJid": `0@s.whatsapp.net`
		}
	}
}
//----------[ FAKE TROLI ]--------//
global.ftroli = {
	key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 1,
                            status: 1,
                            surface : 1,
                            message: wm, //Kasih namalu
                            orderTitle: 'Bang',
                            thumbnail: fs.readFileSync('./media/thumbnail.jpg'), //Gambarnya
                            sellerJid: '0@s.whatsapp.net'
          
                          }
                        }
                      }
//----------[ FAKE LOKASI ]--------//
global.flokasi = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    locationMessage: {
                    name: 'Russia',
                    jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
                          }
                        }
                      }
                      
global.floc = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "locationMessage": { "title":"jakarta","h": `aloo`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}
	}
	
global.fliveLoc = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.chat  ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "liveLocationMessage": { "caption":"ANTIBOT","h": `aloo`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}
	}
global.fliveLoc2 = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "liveLocationMessage": { "title": "ANTIBOT","h": `aloo`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}
	}
//FAKEREPLY KONTAK
 global.fcon = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "contactMessage": { "title":"sri","h": `haloo`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}
	}
	
 global.fcona = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "contactsArrayMessage": { "title":"antibot","h": `aloo`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}
	}
 global.bugcon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) }, message: { "contactMessage": { "vcard": ""}}}
	
//----------[ FAKE DOC ]--------//
global.fdocs = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    documentMessage: {
                    title: 'Hello World!', 
                    jpegThumbnail: fs.readFileSync('./media/thumbnail.jpg')
                          }
                        }
                      }
//----------[ FAKE VIDEO ]--------//
global.fvideo = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "0-1625305606@g.us" } : {}) 
                },
	 message: { 
                 "videoMessage": { 
                 "title":"Hello World!",
                 "h": `Hmm`,
                 'seconds': '99999', 
                 'caption': 'Hello World!',
                 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
                        }
                       }
	                  }
//----------[ FAKE GC ]--------//
global.fgclink = {
	"key": {
		"fromMe": false,
		"participant": "0@s.whatsapp.net",
		"remoteJid": "0@s.whatsapp.net"
	},
	"message": {
		"groupInviteMessage": {
			"groupJid": "0-1625305606@g.us",
			"inviteCode": "mememteeeekkeke",
			"groupName": "Mengter", 
            "caption": "Halo bang jagoo", 
            'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
		}
	}
}
//----------[ FAKE GIF  ]--------//
global.fgif = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "0-1625305606@g.us" } : {}) 
                },
	 message: { 
                 "videoMessage": { 
                 "title":"hallo bang",
                 "h": `Hmm`,
                 'seconds': '99999', 
                 'gifPlayback': 'true', 
                 'caption': 'Halo bang',
                 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
                        }
                       }
	                  } 
//----------[ FAKE TEXT  ]--------//
global.ftextt = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "0-1625305606@g.us" } : {}) 
                },
	 message: { 
		"extendedTextMessage": {
                 "text":"hallo bang",
                 "title": `Hmm`,
                 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')
                        }
	                  } 
                     }
//----------[ FAKE VN  ]--------//
global.fvn = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "0-1625305606@g.us" } : {}) 
                },
	 message: { 
		"audioMessage": {
                 "mimetype":"audio/ogg; codecs=opus",
                 "seconds": "${second}",
                 "ptt": "true"
                        }
	                  } 
                     }
global.allfake = pickRandom[global.fvn, global.ftextt, global.fgif, global.fgclink, global.fvideo, global.fdocs, global.fcon, global.fcona, global.floc, global.fliveLoc, global.fliveLoc2, global.bugcon, global.flokasi, global.ftroli, global.ftoko]

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
