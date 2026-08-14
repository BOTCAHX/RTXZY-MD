import fs from 'fs'
import os from 'os'
import path from 'path'
import Database from 'better-sqlite3'

let handler = async (m, { conn }) => {
    const dir = global.opts?._?.[0] || 'sessions'
    const dbPath = path.join(dir, 'state.sqlite')
    if (!fs.existsSync(dbPath)) return m.reply(`File sesi tidak ditemukan: ${dbPath}\nBot belum pernah login, atau folder sesi berbeda.`)

    m.reply('Tunggu Sebentar, Proses Getting File state.sqlite...')
    const tmpPath = path.join(os.tmpdir(), `session-${Date.now()}.sqlite`)
    try {
        // Online backup via better-sqlite3 → file konsisten walau bot sedang jalan
        // (memasukkan data yang masih ada di -wal).
        const db = new Database(dbPath, { readonly: true })
        try {
            await db.backup(tmpPath)
        } finally {
            db.close()
        }
        const sesi = fs.readFileSync(tmpPath)
        return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/x-sqlite3', fileName: 'state.sqlite' }, { quoted: m })
    } catch (e) {
        conn.logger?.warn?.(`[getsesi] backup gagal, fallback copy mentah: ${e?.message || e}`)
        // Fallback: copy mentah (mungkin tidak konsisten kalau masih ada data di -wal)
        const sesi = fs.readFileSync(dbPath)
        return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/x-sqlite3', fileName: 'state.sqlite' }, { quoted: m })
    } finally {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
    }
}

handler.help = ['getsesi']
handler.tags = ['internet']
handler.command = /^(getsesi)$/i

handler.rowner = true

export default handler
