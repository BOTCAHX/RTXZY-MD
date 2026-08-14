global.anticall = global.anticall ?? false
let initialized = false

async function init(conn) {
  if (initialized) return
  if (!conn?.ev) return
  conn.ev.on("call", async (call) => {
    // Membaca baik dari global.anticall maupun conn.anticall (dari .enable)
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

let handler = m => m
handler.before = async function (m, { conn }) {
  init(conn)
}

export default handler
