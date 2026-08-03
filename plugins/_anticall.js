let handler = m => m

handler.before = async function (m) {
  if (!this._anticall_registered) {
    this._anticall_registered = true;
    this.ev.on('call', async (call) => {
        if (call[0].status == 'offer') {
          if (this.anticall) {
             await this.rejectCall(call[0].id, call[0].from);
             await this.sendMessage(call[0].from, { text: "⚠️ Panggilan ditolak otomatis karena bot sedang dalam mode anticall (anti panggilan)." });
          }
        }
    });
  }
}

export default handler
