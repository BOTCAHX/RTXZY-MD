const __dirname = import.meta.dirname;
import fs from 'fs'
import path from 'path'
let handler: WaPlugin = async (m, { usedPrefix, command, text }) => {
    if (!text) throw `where is the text?\n\nexempel: ${usedPrefix + command} menu`
    const filename = path.join(__dirname, `./${text}${!/\.ts$/i.test(text) ? '.ts' : ''}`)
    const listPlugins = fs.readdirSync(path.join(__dirname)).map(v => v.replace(/\.ts/, ''))
    if (!fs.existsSync(filename)) return m.reply(`
'${filename}' not found!
${listPlugins.map(v => v).join('\n').trim()}
`.trim())
    m.reply(fs.readFileSync(filename, 'utf8'))
}
handler.help = ['getplugin'].map(v => v + ' [filename]')
handler.tags = ['owner']
handler.command = /^(getplugin|get ?plugin|gp)$/i

handler.rowner = true

export default handler
