global.anticall = global.anticall ?? false
let initialized = false

async function init(conn) {
  if (initialized) return
  if (!conn?.ev) return
  conn.ev.on("call", async (call) => {
    // Read from either global.anticall or conn.anticall (set via .enable)
    if (!(global.anticall || conn.anticall)) return
    if (!Array.isArray(call) || !call[0]) return
    if (call[0].status !== "offer") return
    try {
      await conn.rejectCall(call[0].id, call[0].from)
      await conn.updateBlockStatus(call[0].from, "block")
    } catch (e) {
      console.error("anticall error", e)
    }
  })
  initialized = true
}

let handler: WaPlugin = m => m
handler.before = async function (m, { conn }) {
  init(conn)
}

export default handler
