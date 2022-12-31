const simple = require('./lib/simple')
const util = require('util')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    async handler(chatUpdate) {
        if (global.db.data == null) await loadDatabase()
        this.msgqueque = this.msgqueque || []
        // console.log(chatUpdate)
        if (!chatUpdate) return
        // if (chatUpdate.messages.length > 2 || !chatUpdate.messages.length) return
        if (chatUpdate.messages.length > 1) console.log(chatUpdate.messages)
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        console.log(JSON.stringify(m, null, 4))
        try {
            m = simple.smsg(this, m) || m
            if (!m) return
            // console.log(m)
            m.exp = 0
            m.limit = false
            try {
                let user = global.db.data.users[m.sender]
                if (typeof user !== 'object') global.db.data.users[m.sender] = {}
                if (user) {
                    if (!isNumber(user.healt)) user.healt = 100
                    if (!isNumber(user.title)) user.title = 0
                    if (!isNumber(user.stamina)) user.stamina = 100
                    if (!isNumber(user.haus)) user.haus = 100
                    if (!isNumber(user.laper)) user.laper = 100
                    if (!isNumber(user.level)) user.level = 0
                    if (!('pasangan' in user)) user.pasangan = ''
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.pc)) user.pc = 0
                    if (!isNumber(user.korbanngocok)) user.korbanngocok = 0
                    if (!isNumber(user.ojekk)) user.ojekk = 0
                    if (!isNumber(user.trofi)) user.trofi= 0
                    if (!user.rtrofi) user.rtrofi = 'Perunggu'
                    if (!isNumber(user.troopcamp)) user.troopcamp = 0
                    if (!isNumber(user.coin)) user.coin = 0
                    if (!isNumber(user.atm)) user.atm = 0
                    if (!isNumber(user.limit)) user.limit = 100
                    if (!isNumber(user.glimit)) user.glimit = 100
                    if (!isNumber(user.tprem)) user.tprem = 0
                    if (!isNumber(user.tigame)) user.tigame = 5
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (!isNumber(user.money)) user.money = 0
                    if (!isNumber(user.rumahsakit)) user.rumahsakit= 0
                    if (!isNumber(user.fortress)) user.fortress = 0
                    if (!isNumber(user.shield)) user.shield = false
                    if (!isNumber(user.pertanian)) user.pertanian = 0
                    if (!isNumber(user.pertambangan)) user.pertambangan = 0
                    
                    
                    if (!isNumber(user.botol)) user.botol = 0
                    if (!isNumber(user.kardus)) user.kardus = 0
                    if (!isNumber(user.kaleng)) user.kaleng = 0
                    if (!isNumber(user.aqua)) user.aqua = 0
                    if (!isNumber(user.diamond)) user.diamond = 0
                    if (!isNumber(user.iron)) user.iron = 0
                    if (!isNumber(user.emas)) user.emas = 0
                    if (!isNumber(user.arlok)) user.arlok = 0
        
                    if (!isNumber(user.common)) user.common = 0
                    if (!isNumber(user.as)) user.as = 0
                    if (!isNumber(user.uncommon)) user.uncommon = 0
                    if (!isNumber(user.mythic)) user.mythic = 0
                    if (!isNumber(user.legendary)) user.legendary = 0
                    if (!isNumber(user.glory)) user.glory = 0
                    if (!isNumber(user.enchant)) user.enchant = 0
                    if (!isNumber(user.pet)) user.pet = 0
                    if (!isNumber(user.psepick)) user.psepick = 0
                    if (!isNumber(user.psenjata)) user.psenjata = 0
                
                    if (!isNumber(user.potion)) user.potion = 0
                    if (!isNumber(user.sampah)) user.sampah = 0
                    if (!isNumber(user.armor)) user.armor = 0
                    if (!isNumber(user.pancing)) user.pancing = 0
                    //penambah stamina
                    if (!isNumber(user.apel)) user.apel = 0
                    if (!isNumber(user.ayamb)) user.ayamb = 0
                    if (!isNumber(user.ayamg)) user.ayamg = 0
                    if (!isNumber(user.sapir)) user.sapir = 0
                    if (!isNumber(user.ssapi)) user.ssapi = 0
                    if (!isNumber(user.esteh)) user.esteh = 0
                    if (!isNumber(user.leleg)) user.leleg = 0
                    if (!isNumber(user.leleb)) user.leleb = 0
                    //tools
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
                    if (!isNumber(user.umpan)) user.umpan = 0
                    
                    if (!isNumber(user.kucing)) user.kucing = 0
                    if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
                    if (!isNumber(user.rubah)) user.rubah = 0
                    if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
                    if (!isNumber(user.anjing)) user.anjing = 0
                    if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0
                    if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0
                    if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0
                    if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0
                    if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0
                    if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0
                    
                    if (!isNumber(user.makananpet)) user.makananpet
                    if (!isNumber(user.makanannaga)) user.makanannaga = 0
                    if (!isNumber(user.makananphonix)) user.makananphonix = 0
                    if (!isNumber(user.makanangriffin)) user.makanangriffin = 0
                    if (!isNumber(user.makananserigala)) user.makananserigala = 0
                    if (!isNumber(user.makanancentaur)) user.makanancentaur = 0
        
                    if (!'Banneduser' in user) user.Banneduser = false
                    if (!'BannedReason' in user) user.BannedReason = ''
                    if (!isNumber(user.warn)) user.warn = 0
        
                    if (!isNumber(user.afk)) user.afk = -1
                    if (!'afkReason' in user) user.afkReason = ''
                
                //PET
                    if (!isNumber(user.healthmonster)) user.healthmonster = 0
                    if (!isNumber(user.anakkucing)) user.anakkucing = 0
                    if (!isNumber(user.anakkuda)) user.anakkuda = 0
                    if (!isNumber(user.anakrubah)) user.anakrubah = 0
                    if (!isNumber(user.anakanjing)) user.anakanjing = 0
                    if (!isNumber(user.serigala)) user.serigala = 0
                    if (!isNumber(user.anakserigala)) user.anakserigala = 0
                    if (!isNumber(user.naga)) user.naga = 0
                    if (!isNumber(user.anaknaga)) user.anaknaga = 0
                    if (!isNumber(user.phonix)) user.phonix = 0
                    if (!isNumber(user.anakphonix)) user.anakphonix = 0
                    if (!isNumber(user.griffin)) user.griffin = 0
                    if (!isNumber(user.anakgriffin)) user.anakgriffin = 0
                    if (!isNumber(user.kyubi)) user.kyubi = 0
                    if (!isNumber(user.anakkyubi)) user.anakkyubi = 0
                    if (!isNumber(user.centaur)) user.centaur = 0
                    if (!isNumber(user.anakcentaur)) user.anakcentaur = 0
                    if (!isNumber(user.makananpet)) user.makananpet = 0
        
                    if (!isNumber(user.antispam)) user.antispam = 0
                    if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
        
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!('kingdom' in user)) user.kingdom = false
                    if (!isNumber(user.batu)) user.batu = 0
                    if (!isNumber(user.ramuan)) user.ramuan = 0
                    if (!isNumber(user.string)) user.string = 0
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
        
                    //mancing
                    if (!isNumber(user.paus)) user.paus = 0
             if (!isNumber(user.kepiting)) user.kepiting = 0
             if (!isNumber(user.gurita)) user.gurita = 0
             if (!isNumber(user.cumi)) user.cumi= 0
             if (!isNumber(user.buntal)) user.buntal = 0
             if (!isNumber(user.dory)) user.dory = 0
             if (!isNumber(user.lumba)) user.lumba = 0
             if (!isNumber(user.lobster)) user.lobster = 0
             if (!isNumber(user.hiu)) user.hiu = 0
             if (!isNumber(user.udang)) user.udang = 0
             if (!isNumber(user.ikan)) user.ikan = 0
             if (!isNumber(user.nila)) user.nila = 0
             if (!isNumber(user.bawal)) user.bawal = 0
             if (!isNumber(user.lele)) user.lele = 0
             if (!isNumber(user.orca)) user.orca = 0
                
             if (!isNumber(user.banteng)) user.banteng = 0
             if (!isNumber(user.harimau)) user.harimau = 0
             if (!isNumber(user.gajah)) user.gajah = 0
             if (!isNumber(user.kambing)) user.kambing = 0
             if (!isNumber(user.panda)) user.panda = 0
             if (!isNumber(user.buaya)) user.buaya = 0
             if (!isNumber(user.kerbau)) user.kerbau = 0
             if (!isNumber(user.sapi)) user.sapi = 0
             if (!isNumber(user.monyet)) user.monyet = 0
             if (!isNumber(user.babihutan)) user.babihutan = 0
             if (!isNumber(user.babi)) user.babi = 0
             if (!isNumber(user.ayam)) user.ayam = 0
         
                    if (!isNumber(user.lastadventure)) user.lastadventure = 0
                    if (!isNumber(user.lastkill)) user.lastkill = 0
                    if (!isNumber(user.lastfishing)) user.lastfishing = 0
                    if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
                    if (!isNumber(user.lastwar)) user.lastwar = 0
                    if (!isNumber(user.lastsda)) user.lastsda = 0
                    if (!isNumber(user.lastberbru)) user.lastberbru = 0
                    if (!isNumber(user.lastduel)) user.lastduel = 0
                    if (!isNumber(user.lastjb)) user.lastjb = 0
                    if (!isNumber(user.lastSetStatus)) user.lastSetStatus = 0
                    if (!isNumber(user.lastmining)) user.lastmining = 0
                    if (!isNumber(user.lasthunt)) user.lasthunt = 0
                    if (!isNumber(user.lastngocok)) user.lastngocok = 0
                    if (!isNumber(user.lastgift)) user.lastgift = 0
                    if (!isNumber(user.lastrob)) user.lastrob = 0
                    if (!isNumber(user.lastngojek)) user.lastngojek = 0
                    if (!isNumber(user.lastgrab)) user.lastgrab = 0
                    if (!isNumber(user.lastberkebon)) user.lastberkebon = 0
                    if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
                    if (!isNumber(user.lastdagang)) user.lastdagang = 0
                    if (!isNumber(user.lasthourly)) user.lasthourly = 0
                    if (!isNumber(user.lastweekly)) user.lastweekly = 0
                    if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
                    if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0
                    if (!isNumber(user.lastturu)) user.lastturu = 0
                    if (!isNumber(user.lastseen)) user.lastseen = 0
                    if (!isNumber(user.lastbansos)) user.lastbansos = 0
                    if (!isNumber(user.lastrampok)) user.lastrampok = 0
                    if (!('registered' in user)) user.registered = false
                    if (!user.registered) {
                    if (!('name' in user)) user.name = this.getName(m.sender)
        
                    if (!isNumber(user.apel)) user.apel = 0
                    if (!isNumber(user.anggur)) user.anggur = 0
                    if (!isNumber(user.jeruk)) user.jeruk = 0
                    if (!isNumber(user.semangka)) user.semangka = 0
                    if (!isNumber(user.mangga)) user.mangga = 0
                    if (!isNumber(user.stroberi)) user.stroberi = 0
                    if (!isNumber(user.pisang)) user.pisang = 0
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!isNumber(user.emas)) user.emas = 0
                    if (!isNumber(user.makanan)) user.makanan = 0
                    if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
                    if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
                    if (!isNumber(user.bibitapel)) user.bibitapel = 0
                    if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
                    if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
        
                      
                        if (!isNumber(user.age)) user.age = -1
                        if (!isNumber(user.premiumDate)) user.premiumDate = -1
                        if (!isNumber(user.regTime)) user.regTime = -1
                        
        }
                    if (!isNumber(user.level)) user.level = 0
                    if (!user.job) user.job = 'Pengangguran'
                    if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]'
                    if (!user.premium) user.premium = false
                    if (!user.premium) user.premiumTime= 0
                    if (!user.role) user.role = 'Newbie ㋡'
                    if (!('autolevelup' in user)) user.autolevelup = true
                    if (!('lastIstigfar' in user)) user.lastIstigfar = true
                } else global.db.data.users[m.sender] = {
                    healt: 100,
                    title: '',
                    haus: 100,
                    laper: 100,
                    tprem: 0,
                    stamina : 100,
                    level: 0,
                    pasangan: '',
                    pc : 0,
                    exp: 0,
                    coin: 0,
                    atm: 0,
                    limit: 100,
                    tigame: 999,
                    lastclaim: 0,
                    money: 0,
                    diamond: 0,
                    iron: 0,
                    emas: 0,
                    common: 0,
                    uncommon: 0,
                    mythic: 0,
                    legendary: 0,
                    rumahsakit: 0,
                    fortress: 0,
                    trofi: 0,
                    rtrofi: 'perunggu',
                    makanan: 0,
                    troopcamp: 0,
                    shield: 0,
                    arlok: 0,
                    ojekk: 0,
                    korbanngocok: 0,
                    //mancing
             as: 0,
            paus: 0,
            kepiting: 0,
            gurita: 0,
            cumi: 0,
            buntal: 0,
            dory: 0,
            lumba: 0,
            lobster: 0,
            hiu: 0,
            lele: 0,
            nila: 0,
            bawal: 0,
            udang: 0,
            ikan: 0,
            orca: 0,
            banteng: 0,
            harimau: 0,
            gajah: 0,
            kambing: 0,
            panda: 0,
            buaya: 0,
            kerbau : 0,
            sapi: 0,
            monyet : 0,
            babihutan: 0,
            babi: 0,
            ayam: 0,
            apel: 20,
            ayamb: 0,
            ayamg: 0,
            ssapi: 0,
            sapir: 0,
            leleb: 0,
            leleg: 0,
            esteh: 0,
                    pet: 0,
                    potion: 0,
                    sampah: 0,
                    armor: 0,
                    kucing: 0,
                    kucinglastclaim: 0,
                    kuda: 0,
                    kudalastclaim: 0,
                    rubah: 0,
                    rubahlastclaim: 0,
                    anjing: 0,
                    anjinglastclaim: 0,
                    naga: 0,
                    nagalastclaim: 0,
                    griffin: 0,
                    griffinlastclaim: 0,
                    centaur: 0,
                    centaurlastclaim: 0,
                    serigala: 0,
                    serigalalastclaim: 0,
                    phonix: 0,
                    phonixlastclaim: 0,
                    makanannaga: 0,
                    makananphonix: 0,
                    makanancentaur: 0,
                    makananserigala: 0,
                    
                    Banneduser: false,
                    BannedReason: '',
                    warn: 0,
                    afk: -1,
                    afkReason: '',
                    anakkucing: 0,
                    anakkuda: 0,
                    anakrubah: 0,
                    anakanjing: 0,
                    makananpet: 0,
                    antispam: 0,
                    antispamlastclaim: 0,
                    kayu: 0,
                    batu: 0,
                    string: 0,
                    umpan: 0,
                    sword: 0,
                    sworddurability: 0,
                    pickaxe: 0,
                    pickaxedurability: 0,
                    fishingrod: 0,
                    fishingroddurability: 0,
                    lastadventure: 0,
                    lastkill: 0,
                    lastfishing: 0,
                    lastdungeon: 0,
                    lastduel: 0,
                    lastmining: 0,
                    lasthourly: 0,
                    lasthunt: 0,
                    lastweekly: 0,
                    lastmonthly: 0,
                    lastjb: 0,
                    lastrob: 0,
                    lastdaang: 0,
                    lastngojek: 0,
                    lastgrab: 0,
                    lastngocok: 0,
                    lastturu: 0,
                    lastseen: 0,
                    lastSetStatus: 0,
                    registered: false,
                    apel: 20,
                    mangga: 0,
                    stroberi: 0,
                    semangka: 0,
                    jeruk: 0,
                    semangka: 0,
                    name: this.getName(m.sender),
                    age: -1,
                    regTime: -1,
                    premium: false, 
                    premiumTime: 0,
                    job: 'Pengangguran', 
                    lbars: '[▒▒▒▒▒▒▒▒▒]', 
                    role: 'Newbie ㋡', 
                    registered: false,
                    name: this.getName(m.sender),
                    age: -1,
                    regTime: -1,
                    autolevelup: true,
                    lastIstigfar: 0,
                }
                let chat = global.db.data.chats[m.chat]
                if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
                if (chat) {
                    if (!('isBanned' in chat)) chat.isBanned = false
                    if (!('welcome' in chat)) chat.welcome = true
                    if (!('detect' in chat)) chat.detect = false
                    if (!('sWelcome' in chat)) chat.sWelcome = ''
                    if (!('sBye' in chat)) chat.sBye = ''
                    if (!('sPromote' in chat)) chat.sPromote = ''
                    if (!('sDemote' in chat)) chat.sDemote = ''
                    if (!('delete' in chat)) chat.delete = true
                    if (!('antiLink' in chat)) chat.antiLink = true
                    if (!('viewonce' in chat)) chat.viewonce = false
                    if (!('antiToxic' in chat)) chat.antiToxic = false
                } else global.db.data.chats[m.chat] = {
                    isBanned: false,
                    welcome: true,
                    detect: false,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    delete: true,
                    antiLink: false,
                    viewonce: false,
                    antiToxic: true,
                }
            } catch (e) {
                console.error(e)
            }
            if (opts['nyimak']) return
            if (!m.fromMe && opts['self']) return
            if (opts['pconly'] && m.chat.endsWith('g.us')) return
            if (opts['gconly'] && !m.chat.endsWith('g.us')) return
            if (opts['swonly'] && m.chat !== 'status@broadcast') return
            if (typeof m.text !== 'string') m.text = ''
            if (opts['queque'] && m.text) {
                this.msgqueque.push(m.id || m.key.id)
                await delay(this.msgqueque.length * 1000)
            }
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!plugin.all) continue
                if (typeof plugin.all !== 'function') continue
                try {
                    await plugin.all.call(this, m, chatUpdate)
                } catch (e) {
                    if (typeof e === 'string') continue
                    console.error(e)
                }
            }
            if (m.isBaileys) return
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

            let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isOwner = isROwner || m.fromMe
            let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let groupMetadata = (m.isGroup ? (conn.chats[m.chat] || {}).metadata : {}) || {}
            let participants = (m.isGroup ? groupMetadata.participants : []) || []
            let user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
            let bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
            let isAdmin = user && user.admin || false // Is User Admin?
            let isBotAdmin = bot && bot.admin || false // Are you Admin?
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restrict', m, this)
                    continue
                }
                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
                let match = (_prefix instanceof RegExp ? // RegExp Mode?
                    [[_prefix.exec(m.text), _prefix]] :
                    Array.isArray(_prefix) ? // Array?
                        _prefix.map(p => {
                            let re = p instanceof RegExp ? // RegExp in Array?
                                p :
                                new RegExp(str2Regex(p))
                            return [re.exec(m.text), re]
                        }) :
                        typeof _prefix === 'string' ? // String?
                            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                            [[[], new RegExp]]
                ).find(p => p[1])
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                    command = (command || '').toLowerCase()
                    let fail = plugin.fail || global.dfail // When failed
                    let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                        plugin.command.test(command) :
                        Array.isArray(plugin.command) ? // Array?
                            plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                                cmd.test(command) :
                                cmd === command
                            ) :
                            typeof plugin.command === 'string' ? // String?
                                plugin.command === command :
                                false

                    if (!isAccept) continue
                    m.plugin = name
                    if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                        let chat = global.db.data.chats[m.chat]
                        let user = global.db.data.users[m.sender]
                        if (name != 'unbanchat.js' && chat && chat.isBanned) return // Except this
                        if (name != 'unbanuser.js' && user && user.banned) return
                    }
                    if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.rowner && !isROwner) { // Real Owner
                        fail('rowner', m, this)
                        continue
                    }
                    if (plugin.owner && !isOwner) { // Number Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.mods && !isMods) { // Moderator
                        fail('mods', m, this)
                        continue
                    }
                    if (plugin.premium && !isPrems) { // Premium
                        fail('premium', m, this)
                        continue
                    }
                    if (plugin.group && !m.isGroup) { // Group Only
                        fail('group', m, this)
                        continue
                    } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                        fail('botAdmin', m, this)
                        continue
                    } else if (plugin.admin && !isAdmin) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    if (plugin.private && m.isGroup) { // Private Chat Only
                        fail('private', m, this)
                        continue
                    }
                    if (plugin.register == true && _user.registered == false) { // Butuh daftar?
                        fail('unreg', m, this)
                        continue
                    }
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                    if (xp > 200) m.reply('Ngecit -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
                        continue // Limit habis
                    }
                    if (plugin.level > _user.level) {
                        this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
                        continue // If the level has not been reached
                    }
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        command,
                        text,
                        conn: this,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isOwner,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                    }
                    try {
                        await plugin.call(this, m, extra)
                        if (!isPrems) m.limit = m.limit || plugin.limit || false
                    } catch (e) {
                        // Error occured
                        m.error = e
                        console.error(e)
                        if (e) {
                            let text = util.format(e)
                            for (let key of Object.values(global.APIKeys))
                                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            m.reply(text)
                        }
                    } finally {
                        // m.reply(util.format(_user))
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
                    }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            //console.log(global.db.data.users[m.sender])
            let user, stats = global.db.data.stats
            if (m) {
                if (m.sender && (user = global.db.data.users[m.sender])) {
                    user.exp += m.exp
                    user.limit -= m.limit * 1
                }

                let stat
                if (m.plugin) {
                    let now = + new Date
                    if (m.plugin in stats) {
                        stat = stats[m.plugin]
                        if (!isNumber(stat.total)) stat.total = 1
                        if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                        if (!isNumber(stat.last)) stat.last = now
                        if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                    } else stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                    stat.total += 1
                    stat.last = now
                    if (m.error == null) {
                        stat.success += 1
                        stat.lastSuccess = now
                    }
                }
            }

            // try {
            //     require('./lib/print')(m, this)
            // } catch (e) {
            //     console.log(m, m.quoted, e)
            // }
            if (opts['autoread']) await this.chatRead(m.chat, m.isGroup ? m.sender : undefined, m.id || m.key.id).catch(() => { })
            let quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (opts['queque'] && m.text && quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
        }
    },
     async participantsUpdate({ id, participants, action }) {
        if (opts['self']) return
        // if (id in conn.chats) return // First login will spam
        if (global.isInit) return
        let chat = global.db.data.chats[id] || {}
        let text = ''
        switch (action) {
            case 'add':
            case 'remove':
                if (chat.welcome) {
                    let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                    for (let user of participants) {
                        let welc = 'Selamat Datang'
                        let outss = 'Selamat Tinggal'
                        let pp = 'https://i.ibb.co/sQTkHLD/ppkosong.png'
                        try {
                            pp = await this.profilePictureUrl(user, 'image')
                        } catch (e) {

                        } finally {
                            text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc ? String.fromCharCode(8206).repeat(4001) + groupMetadata.desc : '') :
                                (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', await this.getName(user))
                            let wel = API('popcat', '/welcomecard', {
                                background: 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png',
                                text1: welc,
                                text2: await this.getName(user),
                                text3: groupMetadata.participants.length, 
                                avatar: pp,
                            })
                            let lea = API('popcat', '/welcomecard', {
                                background: 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png',
                                text1: outss,
                                text2: await this.getName(user),
                                text3: groupMetadata.participants.length, 
                                avatar: pp,
                            })
                            await this.sendButtonImg(id, action === 'add' ? wel : lea, text, wm, action === 'add' ? 'Welcome' : 'Good Bye', action === 'add' ? '.intro' : '-') 
                        }
                    }
                }
                break

            case 'promote':
                text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
            case 'demote':
                if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
                text = text.replace('@user', '@' + participants[0].split('@')[0])
                if (chat.detect) this.sendMessage(id, text, {
                    contextInfo: {
                        mentionedJid: this.parseMention(text)
                    }
                })
                break
        }
    },
    async delete({ remoteJid, fromMe, id, participant }) {
        if (fromMe) return
        let chats = Object.entries(conn.chats).find(([user, data]) => data.messages && data.messages[id])
        if (!chats) return
        let msg = JSON.parse(chats[1].messages[id])
        let chat = global.db.data.chats[msg.key.remoteJid] || {}
        if (chat.delete) return
        await this.reply(msg.key.remoteJid, `
Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik
*.enable delete*
`.trim(), msg, {
            mentions: [participant]
        })
        this.copyNForward(msg.key.remoteJid, msg).catch(e => console.log(e, msg))
    }
}

global.dfail = (type, m, conn) => {
    let msg = {
        rowner: 'Perintah ini hanya dapat digunakan oleh _*OWWNER!1!1!*_',
        owner: 'Perintah ini hanya dapat digunakan oleh _*Owner Bot*_!',
        mods: 'Perintah ini hanya dapat digunakan oleh _*Moderator*_ !',
        premium: 'Perintah ini hanya untuk member _*Premium*_ !',
        group: 'Perintah ini hanya dapat digunakan di grup!',
        private: 'Perintah ini hanya dapat digunakan di Chat Pribadi!',
        admin: 'Perintah ini hanya untuk *Admin* grup!',
        botAdmin: 'Jadikan bot sebagai *Admin* untuk menggunakan perintah ini!',
        unreg: 'Silahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*#daftar nama.umur*\n\nContoh: *#daftar Mansur.16*',
        restrict: 'Fitur ini di *disable*!'
    }[type]
    if (msg) return m.reply(msg)
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})
