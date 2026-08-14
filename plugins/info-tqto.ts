/**
* Don't replace this - it's just to keep my credit :)
* Don't remove, you may add to it 🐦
**/
let handler: WaPlugin = async (m) => {
    const text = [
        '',
        '- Allah SWT',
        '- Hyzer',
        '- Bochilgaming',
        '- Nurutomo',
        '- Erlanrahmat',
        '- BOTCAHX',
        '- Kurukuu-MD',
        '- Dana Putra',
        '- Kalian semua yang telah menggunakan script ini.',
        ''
    ].join('\n')
    m.reply(text)
}

handler.help = ['tqto']
handler.tags = ['info']
handler.command = /^(tqto)$/i

export default handler
