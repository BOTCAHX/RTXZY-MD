import fs from 'fs'
import os from 'os'
import path from 'path'
import Database from 'better-sqlite3'

let handler = async (m, { conn }) => {
    const prefix = global.opts?._?.[0] ? global.opts._[0] + '_' : ''
    const dbPath = path.join('database', `${prefix}database.sqlite`)
    if (!fs.existsSync(dbPath)) return m.reply(`File database tidak ditemukan: ${dbPath}\nBot belum pernah menyimpan database, atau memakai --db lain.`)

    m.reply('Tunggu Sebentar, Proses Getting File database.sqlite...')
    const tmpPath = path.join(os.tmpdir(), `database-${Date.now()}.sqlite`)
    try {
        const db = new Database(dbPath, { readonly: true })
        try {
            await db.backup(tmpPath)
        } finally {
            db.close()
        }
        const data = fs.readFileSync(tmpPath)
        return await conn.sendMessage(m.chat, { document: data, mimetype: 'application/x-sqlite3', fileName: 'database.sqlite' }, { quoted: m })
    } catch (e) {
        conn.logger?.warn?.(`[getdb] backup gagal, fallback copy mentah: ${e?.message || e}`)
        const data = fs.readFileSync(dbPath)
        return await conn.sendMessage(m.chat, { document: data, mimetype: 'application/x-sqlite3', fileName: 'database.sqlite' }, { quoted: m })
    } finally {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
    }
}

handler.help = ['getdb', 'getdatabase']
handler.tags = ['owner']
handler.command = /^(db|getdb)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler
