let handler: WaPlugin = m => m

handler.before = async function (m) {
   if (m.sender.startsWith('212')) {
   	global.db.data.users[m.sender].banned = true
   }
   
   if (m.sender.startsWith('91')) {
   	global.db.data.users[m.sender].banned = true
   }
   
   if (m.sender.startsWith('263')) {

   	global.db.data.users[m.sender].banned = true

   }
}

export default handler
