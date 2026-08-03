let handler = m => m

handler.before = async function (m) {
  if (!this._anticall_registered) {
    this._anticall_registered = true;
    this.ev.on('call', async (call) => {
        if (call[0].status == 'offer') {
          if (this.callWhitelistMode) {
             let isContact = global.db.data.users[call[0].from] && global.db.data.users[call[0].from].name;
             if (!isContact) {
               await this.rejectCall(call[0].id, call[0].from);
               await this.sendMessage(call[0].from, { text: "⚠️ Panggilan ditolak otomatis. Bot sedang dalam mode whitelist panggilan (hanya nomor tersimpan yang bisa menelepon)." });
             }
          }
        }
    });
  }
}

export default handler
