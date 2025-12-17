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
        //console.log(JSON.stringify(m, null, 4))
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
                    if (!isNumber(user.saldo)) user.saldo = 0
                    if (!isNumber(user.pengeluaran)) user.pengeluaran = 0
                    if (!isNumber(user.healt)) user.healt = 100
                    if (!isNumber(user.health)) user.health = 100
                    if (!isNumber(user.energi)) user.energi = 100
                    if (!isNumber(user.power)) user.power = 100
                    if (!isNumber(user.title)) user.title = 0
                    if (!isNumber(user.stamina)) user.stamina = 100
                    if (!isNumber(user.haus)) user.haus = 100
                    if (!isNumber(user.laper)) user.laper = 100
                    if (!isNumber(user.level)) user.level = 0
                    if (!('titlein' in user)) user.titlein = 'Belum Ada'
                    if (!("ultah" in user)) user.ultah = ''
                    if (!('pasangan' in user)) user.pasangan = ''
                    if (!('sahabat' in user)) user.sahabat = ''
                    if (!('location' in user)) user.location = 'Gubuk'
                    if (!('husbu' in user)) user.husbu = 'Belum Di Set'
                    if (!('waifu' in user)) user.waifu = 'Belum Di Set'
                    if (!isNumber(user.follow)) user.follow = 0
                    if (!isNumber(user.lastfollow)) user.lastfollow = 0
                    if (!isNumber(user.followers)) user.followers = 0
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.pc)) user.pc = 0
                    if (!isNumber(user.korbanngocok)) user.korbanngocok = 0
                    if (!isNumber(user.ojekk)) user.ojekk = 0
                    if (!isNumber(user.polisi)) user.polisi = 0
                    if (!isNumber(user.ojek)) user.ojek = 0
                    if (!isNumber(user.pedagang)) user.pedagang = 0
                    if (!isNumber(user.dokter)) user.dokter = 0
                    if (!isNumber(user.petani)) user.petani = 0
                    if (!isNumber(user.montir)) user.montir = 0
                    if (!isNumber(user.kuli)) user.kuli = 0
                    if (!isNumber(user.trofi)) user.trofi= 0
                    if (!user.rtrofi) user.rtrofi = 'Perunggu'
                    if (!isNumber(user.troopcamp)) user.troopcamp = 0
                    if (!isNumber(user.coin)) user.coin = 0
                    if (!isNumber(user.atm)) user.atm = 0
                    if (!isNumber(user.limit)) user.limit = 100
                    if (!isNumber(user.glimit)) user.glimit = 10
                    if (!isNumber(user.tprem)) user.tprem = 0
                    if (!isNumber(user.tigame)) user.tigame = 5
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (isNumber(user.lastmulung)) user.lastmulung = 0
                    if (!isNumber(user.judilast)) user.judilast = 0
                    if (!isNumber(user.lastnambang)) user.lastnambang = 0
                    if (!isNumber(user.lastnebang)) user.lastnebang = 0
                    if (!isNumber(user.lastkerja)) user.lastkerja = 0
                    if (!isNumber(user.lastmaling)) user.lastmaling = 0
                    if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0
                    if (!isNumber(user.lastbisnis)) user.lastbisnis = 0
                    if (!isNumber(user.lastberbisnis)) user.lastberbisnis = 0
                    if (!isNumber(user.berbisnis)) user.berbisnis = 0
                    if (!isNumber(user.bisnis)) user.bisnis = 0
                    if (!isNumber(user.lastmancing)) user.lastmancing = 0
                    if (!isNumber(user.money)) user.money = 0
                    if (!isNumber(user.rumahsakit)) user.rumahsakit= 0
                    if (!isNumber(user.fortress)) user.fortress = 0
                    if (!isNumber(user.shield)) user.shield = false
                    if (!isNumber(user.pertanian)) user.pertanian = 0
                    if (!isNumber(user.pertambangan)) user.pertambangan = 0
                    if (!isNumber(user.camptroops)) user.camptroops = 0
                    if (!isNumber(user.tambang)) user.tambang = 0
                    
                    //Tambahan rpg
                    if (!isNumber(user.litecoin)) user.litecoin = 0
                    if (!isNumber(user.chip)) user.chip = 0
                    if (!isNumber(user.tiketcoin)) user.tiketcoin = 0
                    if (!isNumber(user.poin)) user.poin = 0
                    if (!isNumber (user.lastbossbattle)) user.lastbossbattle = 0
                    if (!isNumber (user.bank)) user.bank = 0
                    if (!isNumber (user.balance)) user.balance = 0
                    
                    if (!isNumber(user.botol)) user.botol = 0
                    if (!isNumber(user.kardus)) user.kardus = 0
                    if (!isNumber(user.kaleng)) user.kaleng = 0
                    if (!isNumber(user.aqua)) user.aqua = 0
                    if (!isNumber(user.diamond)) user.diamond = 0
                    if (!isNumber(user.emerald)) user.emerald = 0
                    if (!isNumber(user.wood)) user.wood = 0
                    if (!isNumber(user.rock)) user.rock = 0
                    if (!isNumber(user.berlian)) user.berlian = 0
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
                    //rpg meracik
                    if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0
                    if (!isNumber(user.gems)) user.gems = 0
                    if (!isNumber(user.cupon)) user.cupon = 0
                    if (!isNumber(user.lastgemclaim)) user.lastgemclaim = 0
                    if (!isNumber(user.eleksirb)) user.eleksirb = 0
                    if (!isNumber(user.penduduk)) user.penduduk = 0
                    if (!isNumber(user.archer)) user.archer = 0
                    if (!isNumber(user.shadow)) user.shadow = 0
                    if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0
                    if (!isNumber(user.laststringclaim)) user.laststringclaim = 0
                    if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0
                    if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0
                    if (!isNumber(user.lastironclaim)) user.lastironclaim = 0
                    if (!isNumber(user.lastmancingclaim)) user.lastmancingclaim = 0
                    if (!isNumber(user.anakpancingan)) user.anakpancingan = 0
                
                    if (!isNumber(user.potion)) user.potion = 0
                    if (!isNumber(user.sampah)) user.sampah = 0
                    if (!isNumber(user.pancing)) user.pancing = 0
                    if (!isNumber(user.pancingan)) user.pancingan = 0
                    if (!isNumber(user.totalPancingan)) user.totalPancingan = 0
                    //penambah stamina
                    if (!isNumber(user.apel)) user.apel = 0
                    if (!isNumber(user.ayamb)) user.ayamb = 0
                    if (!isNumber(user.ayamg)) user.ayamg = 0
                    if (!isNumber(user.sapir)) user.sapir = 0
                    if (!isNumber(user.ssapi)) user.ssapi = 0
                    if (!isNumber(user.esteh)) user.esteh = 0
                    if (!isNumber(user.leleg)) user.leleg = 0
                    if (!isNumber(user.leleb)) user.leleb = 0
                    
                    if (!isNumber(user.ayambakar)) user.ayambakar = 0
                    if (!isNumber(user.gulai)) user.gulai = 0
                    if (!isNumber(user.rendang)) user.rendang = 0
                    if (!isNumber(user.ayamgoreng)) user.ayamgoreng = 0
                    if (!isNumber(user.oporayam)) user.oporayam = 0
                    if (!isNumber(user.steak)) user.steak = 0
                    if (!isNumber(user.babipanggang)) user.babipanggang = 0
                    if (!isNumber(user.ikanbakar)) user.ikanbakar = 0
                    if (!isNumber(user.nilabakar)) user.nilabakar = 0
                    if (!isNumber(user.lelebakar)) user.lelebakar = 0
                    if (!isNumber(user.bawalbakar)) user.bawalbakar = 0
                    if (!isNumber(user.udangbakar)) user.udangbakar = 0
                    if (!isNumber(user.pausbakar)) user.pausbakar = 0
                    if (!isNumber(user.kepitingbakar)) user.kepitingbakar = 0
                    if (!isNumber(user.soda)) user.soda = 0
                    if (!isNumber(user.vodka)) user.vodka = 0
                    if (!isNumber(user.ganja)) user.ganja = 0
                    if (!isNumber(user.bandage)) user.bandage = 0
                    if (!isNumber(user.sushi)) user.sushi = 0
                    if (!isNumber(user.roti)) user.roti = 0
                    //untuk masak
                    if (!isNumber(user.coal)) user.coal = 0
                    if (!isNumber(user.korekapi)) user.korekapi = 0
                    //tools
                    if (!isNumber(user.umpan)) user.umpan = 0
                   
                    if (!isNumber(user.armor)) user.armor = 0
                    if (!isNumber(user.armordurability)) user.armordurability = 0
                    if (!isNumber(user.weapon)) user.weapon = 0
                    if (!isNumber(user.weapondurability)) user.weapondurability = 0
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
                    if (!isNumber(user.katana)) user.katana = 0
                    if (!isNumber(user.katanadurability)) user.katanadurability = 0
                    if (!isNumber(user.bow)) user.bow = 0
                    if (!isNumber(user.bowdurability)) user.bowdurability = 0
                    if (!isNumber(user.kapak)) user.kapak = 0
                    if (!isNumber(user.kapakdurability)) user.kapakdurability = 0
                    if (!isNumber(user.axe)) user.axe = 0
                    if (!isNumber(user.axedurability)) user.axedurability = 0
                    if (!isNumber(user.pisau)) user.pisau = 0
                    if (!isNumber(user.pisaudurability)) user.pisaudurability = 0
                    
                    if (!isNumber(user.kerjasatu)) user.kerjasatu = 0
                    if (!isNumber(user.kerjadua)) user.kerjadua = 0
                    if (!isNumber(user.kerjatiga)) user.kerjatiga = 0
                    if (!isNumber(user.kerjaempat)) user.kerjaempat = 0
                    if (!isNumber(user.kerjalima)) user.kerjalima = 0
                    if (!isNumber(user.kerjaenam)) user.kerjaenam = 0
                    if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0
                    if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0
                    if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0
                    if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0
                    if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0
                    if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0
                    if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0
                    if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0
                    if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0
                    
                    if (!isNumber(user.pekerjaansatu)) user.pekerjaansatu = 0
                    if (!isNumber(user.pekerjaandua)) user.pekerjaandua = 0
                    if (!isNumber(user.pekerjaantiga)) user.pekerjaantiga = 0
                    if (!isNumber(user.pekerjaanempat)) user.pekerjaanempat = 0
                    if (!isNumber(user.pekerjaanlima)) user.pekerjaanlima = 0
                    if (!isNumber(user.pekerjaanenam)) user.pekerjaanenam = 0
                    if (!isNumber(user.pekerjaantujuh)) user.pekerjaantujuh = 0
                    if (!isNumber(user.pekerjaandelapan)) user.pekerjaandelapan = 0
                    if (!isNumber(user.pekerjaansembilan)) user.pekerjaansembilan = 0
                    if (!isNumber(user.pekerjaansepuluh)) user.pekerjaansepuluh = 0
                    if (!isNumber(user.pekerjaansebelas)) user.pekerjaansebelas = 0
                    if (!isNumber(user.pekerjaanduabelas)) user.pekerjaanduabelas = 0
                    if (!isNumber(user.pekerjaantigabelas)) user.pekerjaantigabelas = 0
                    if (!isNumber(user.pekerjaanempatbelas)) user.pekerjaanempatbelas = 0
                    if (!isNumber(user.pekerjaanlimabelas)) user.pekerjaanlimabelas = 0
                    
                    if (!isNumber(user.kucing)) user.kucing = 0
                    if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
                    if (!isNumber(user.kucingexp)) user.kucingexp = 0
                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
                    if (!isNumber(user.rubah)) user.rubah = 0
                    if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
                    if (!isNumber(user.rubahexp)) user.rubahexp = 0
                    if (!isNumber(user.anjing)) user.anjing = 0
                    if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0
                    if (!isNumber(user.anjingexp)) user.anjingexp = 0
                    if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0
                    if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0
                    if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0
                    if (!isNumber(user.phonixexp)) user.phonixexp = 0
                    if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0
                    if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0
                    
                    if (!isNumber(user.makananpet)) user.makananpet = 0
                    if (!isNumber(user.makanannaga)) user.makanannaga = 0
                    if (!isNumber(user.makananphonix)) user.makananphonix = 0
                    if (!isNumber(user.makanangriffin)) user.makanangriffin = 0
                    if (!isNumber(user.makananserigala)) user.makananserigala = 0
                    if (!isNumber(user.makanancentaur)) user.makanancentaur = 0
        
                    if (!'Banneduser' in user) user.Banneduser = false
                    if (!'BannedReason' in user) user.BannedReason = ''
                    if (!isNumber(user.warn)) user.warn = 0
                    if (!('banned' in user)) user.banned = false
                    if (!isNumber(user.bannedTime)) user.bannedTime = 0
        
                    if (!isNumber(user.afk)) user.afk = -1
                    if (!'afkReason' in user) user.afkReason = ''
                
                //PET
                    if (!isNumber(user.healthmonster)) user.healthmonster = 0
                    if (!isNumber(user.anakkucing)) user.anakkucing = 0
                    if (!isNumber(user.anakkuda)) user.anakkuda = 0
                    if (!isNumber(user.anakrubah)) user.anakrubah = 0
                    if (!isNumber(user.anakanjing)) user.anakanjing = 0
                    if (!isNumber(user.serigala)) user.serigala = 0
                    if (!isNumber(user.serigalaexp)) user.serigalaexp = 0
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
                    if (!isNumber(user.fightnaga)) user.fightnaga = 0
                    if (!isNumber(user.anakcentaur)) user.anakcentaur = 0
                    if (!isNumber(user.makananPet)) user.makananPet = 0
        
                    if (!isNumber(user.antispam)) user.antispam = 0
                    if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
        
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!('kingdom' in user)) user.kingdom = false
                    if (!isNumber(user.batu)) user.batu = 0
                    if (!isNumber(user.ramuan)) user.ramuan = 0
                    if (!isNumber(user.string)) user.string = 0
        
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
                      if (!isNumber(user.lastberburu)) user.lastberburu = 0
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
                      if (!isNumber(user.lasthun)) user.lasthun = 0
                      if (!isNumber(user.lastngocok)) user.lastngocok = 0
                      if (!isNumber(user.lastgift)) user.lastgift = 0
                      if (!isNumber(user.lastrob)) user.lastrob = 0
                      if (!isNumber(user.lastngojek)) user.lastngojek = 0
                      if (!isNumber(user.lastngewe)) user.lastngewe = 0
                      if (!isNumber(user.ngewe)) user.ngewe = 0
                      if (!isNumber(user.jualan)) user.jualan = 0
                      if (!isNumber(user.lastjualan)) user.lastjualan = 0
                      if (!isNumber(user.ngocokk)) user.ngocokk = 0
                      if (!isNumber(user.lastngocokk)) user.lastngocokk = 0
                      if (!isNumber(user.lastgrab)) user.lastgrab = 0
                      if (!isNumber(user.lastberkebon)) user.lastberkebon = 0
                      if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
                      if (!isNumber(user.lastdagang)) user.lastdagang = 0
                      if (!isNumber(user.lasthourly)) user.lasthourly = 0
                      if (!isNumber(user.lastweekly)) user.lastweekly = 0
                      if (!isNumber(user.lastyearly)) user.lastyearly = 0
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
                      if (!isNumber(user.makanan)) user.makanan = 0
                      if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
                      if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
                      if (!isNumber(user.bibitapel)) user.bibitapel = 0
                      if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
                      if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
                     
                      //sambung kata
                      if (!isNumber(user.skata)) user.skata = 0
        
                      
                      if (!isNumber(user.age)) user.age = -1
                      if (!isNumber(user.premiumDate)) user.premiumDate = -1
                      if (!isNumber(user.regTime)) user.regTime = -1
                        
        }
                      if (!isNumber(user.level)) user.level = 0
                      if (!user.job) user.job = 'Pengangguran'
                      if (!isNumber(user.jobexp)) user.jobexp = 0
                      if (!('jail' in user)) user.jail = false
                      if (!('penjara' in user)) user.penjara = false
                      if (!('dirawat' in user)) user.dirawat = false
                      if (!isNumber(user.antarpaket)) user.antarpaket = 0
                      if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]'
                      if (!user.premium) user.premium = false
                      if (!user.premiumTime) user.premiumTime= 0
                      if (!user.vip) user.vip = 'tidak'
                      if (!isNumber(user.vipPoin)) user.vipPoin = 0
                      if (!user.role) user.role = 'Newbie ㋡'
                      if (!('autolevelup' in user)) user.autolevelup = true
                      if (!('lastIstigfar' in user)) user.lastIstigfar = true
                  
                      //demon slayer dan rpg baru
                      if (!("skill" in user)) user.skill = ""
                      if (!("korps" in user)) user.korps = ""
                      if (!("korpsgrade" in user)) user.korpsgrade = ""
                      if (!("breaths" in user)) user.breaths = ""
                      if (!("magic" in user)) user.magic = ""
                      if (!("demon" in user)) user.demon = ""
                      if (!isNumber(user.darahiblis)) user.darahiblis = 0
                      if (!isNumber(user.demonblood)) user.demonblood = 0
                      if (!isNumber(user.demonkill)) user.demonkill = 0
                      if (!isNumber(user.hashirakill)) user.hashirakill = 0
                      if (!isNumber(user.alldemonkill)) user.alldemonkill = 0
                      if (!isNumber(user.allhashirakill)) user.allhashirakill = 0
                      if (!isNumber(user.attack)) user.attack = 0
                      if (!isNumber(user.strenght)) user.strenght = 0
                      if (!isNumber(user.speed)) user.speed = 0
                      if (!isNumber(user.defense)) user.defense = 0
                      if (!isNumber(user.regeneration)) user.regeneration = 0                    
                      if (!isNumber(user.dana)) user.dana = 0
                      if (!isNumber(user.gopay)) user.gopay = 0
                      if (!isNumber(user.ovo)) user.ovo = 0
                      if (!isNumber(user.lastngaji)) user.lastngaji = 0
                      if (!isNumber(user.lastlonte)) user.lastlonte = 0
                      if (!isNumber(user.lastkoboy)) user.lastkoboy = 0
                      if (!isNumber(user.lastdate)) user.lastdate = 0
                      if (!isNumber(user.lasttambang)) user.lasttambang = 0
                      if (!isNumber(user.lastngepet)) user.lastngepet = 0
                      if (!isNumber(user.lasttaxi)) user.lasttaxi = 0
                      if (!isNumber(user.taxi)) user.taxi = 0  
                      if (!isNumber(user.lastyoutuber)) user.lastyoutuber = 0
                      if (!isNumber(user.subscribers)) user.subscribers = 0
                      if (!isNumber(user.viewers)) user.viewers = 0
                      if (!isNumber(user.like)) user.like = 0
                      if (!isNumber(user.playButton)) user.playButton = 0
                   
                  } else global.db.data.users[m.sender] = {
                      taxi: 0,
                      lasttaxi: 0,
                      lastyoutuber: 0,
                      subscribers: 0,
                      viewers: 0,
                      like: 0,
                      playButton: 0,
                      saldo: 0,
                      pengeluaran: 0,
                      healt: 100,
                      health: 100,
                      energi: 100,
                      power: 100,
                      title: '',
                      haus: 100,
                      laper: 100,
                      tprem: 0,
                      stamina : 100,
                      level: 0,
                      follow: 0,
                      lastfollow: 0,
                      followers: 0,
                      pasangan: '',
                      sahabat: '', 
                      location: 'Gubuk', 
                      titlein: 'Belum Ada',
                      ultah: '', 
                      waifu: 'Belum Di Set', 
                      husbu: 'Belum Di Set',
                      pc : 0,
                      exp: 0,
                      coin: 0,
                      atm: 0,
                      limit: 100,
                      skata: 0,
                      tigame: 999,
                      lastclaim: 0,
                      judilast: 0,
                      lastnambang: 0,
                      lastnebang: 0,
                      lastmulung: 0,
                      lastkerja: 0,
                      lastmaling: 0,
                      lastbunuhi: 0,
                      lastbisnis: 0,
                      lastberbisnis: 0,
                      bisnis: 0,
                      berbisnis: 0,
                      lastmancing: 0,
                      pancing: 0,
                      pancingan: 0,
                      totalPancingan: 0,
                      kardus: 0,
                      botol: 0,
                      kaleng: 0,
                      money: 0,
                      litecoin: 0,
                      chip: 0,
                      tiketcoin: 0,
                      poin: 0,
                      bank: 0,
                      balance: 0,
                      diamond: 0,
                      emerald: 0,
                      rock: 0,
                      wood: 0,
                      berlian: 0,
                      iron: 0,
                      emas: 0,
                      common: 0,
                      uncommon: 0,
                      mythic: 0,
                      legendary: 0,
                      rumahsakit: 0,
                      tambang: 0,
                      camptroops: 0,
                      pertanian: 0,
                      fortress: 0,
                      trofi: 0,
                      rtrofi: 'perunggu',
                      makanan: 0,
                      troopcamp: 0,
                      shield: 0,
                      arlok: 0,
                      ojekk: 0,
                      ojek: 0,
                      lastngewe: 0,
                      ngewe: 0,
                      polisi: 0,
                      pedagang: 0,
                      dokter: 0,
                      petani: 0,
                      montir: 0,
                      kuli: 0,
                      korbanngocok: 0,
                      //+ stamina
                      coal: 0,
                      korekapi: 0,
                      ayambakar: 0,
                      gulai: 0,
                      rendang: 0,
                      ayamgoreng: 0,
                      oporayam: 0,
                      steak: 0,
                      babipanggang: 0,
                      ikanbakar: 0,
                      lelebakar: 0,
                      nilabakar: 0,
                      bawalbakar: 0,
                      udangbakar: 0,
                      pausbakar: 0,
                      kepitingbakar: 0,
                      soda: 0,
                      vodka: 0,
                      ganja: 0,
                      bandage: 0,
                      sushi: 0,
                      roti: 0,
                      //meracik
                      ramuan: 0,
                      lastramuanclaim: 0,
                      gems: 0,
                      cupon: 0,
                      lastgemsclaim: 0,
                      eleksirb: 0,
                      penduduk: 0,
                      archer: 0,
                      shadow: 0,
                      laststringclaim: 0,
                      lastpotionclaim: 0,
                      lastswordclaim: 0,
                      lastweaponclaim: 0,
                      lastironclaim: 0,
                      lastmancingclaim: 0,
                      anakpancingan: 0,
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
                      kucing: 0,
                      kucinglastclaim: 0,
                      kucingexp: 0,
                      kuda: 0,
                      kudalastclaim: 0,
                      rubah: 0,
                      rubahlastclaim: 0,
                      rubahexp: 0,
                      anjing: 0,
                      anjinglastclaim: 0,
                      anjingexp: 0,
                      naga: 0,
                      nagalastclaim: 0,
                      griffin: 0,
                      griffinlastclaim: 0,
                      centaur: 0,
                      fightnaga: 0,
                      centaurlastclaim: 0,
                      serigala: 0,
                      serigalalastclaim: 0,
                      serigalaexp: 0,
                      phonix: 0,
                      phonixlastclaim: 0,
                      phonixexp : 0,
                      makanannaga: 0,
                      makananphonix: 0,
                      makanancentaur: 0,
                      makananserigala: 0,
                      
                      Banneduser: false,
                      BannedReason: '',
                      banned: false, 
                      bannedTime: 0,
                      warn: 0,
                      afk: -1,
                      afkReason: '',
                      anakkucing: 0,
                      anakkuda: 0,
                      anakrubah: 0,
                      anakanjing: 0,
                      makananpet: 0,
                      makananPet: 0,
                      antispam: 0,
                      antispamlastclaim: 0,
                      kayu: 0,
                      batu: 0,
                      string: 0,
                      umpan: 0,
                      armor: 0,
                      armordurability: 0,
                      weapon: 0,
                      weapondurability: 0,
                      sword: 0,
                      sworddurability: 0,
                      pickaxe: 0,
                      pickaxedurability: 0,
                      fishingrod: 0,
                      fishingroddurability: 0,
                      katana: 0,
                      katanadurability: 0,
                      bow: 0,
                      bowdurability: 0,
                      kapak: 0,
                      kapakdurability: 0,
                      axe: 0,
                      axedurability: 0,
                      pisau: 0,
                      pisaudurability: 0,                  
                      kerjasatu: 0,
                      kerjadua: 0,
                      kerjatiga: 0,
                      kerjaempat: 0,
                      kerjalima: 0,
                      kerjaenam: 0,
                      kerjatujuh: 0,
                      kerjadelapan: 0,
                      kerjasembilan: 0,
                      kerjasepuluh: 0,
                      kerjasebelas: 0,
                      kerjaduabelas: 0,
                      kerjatigabelas: 0,
                      kerjaempatbelas: 0,
                      kerjalimabelas: 0,    
                      pekerjaansatu: 0,
                      pekerjaandua: 0,
                      pekerjaantiga: 0,
                      pekerjaanempat: 0,
                      pekerjaanlima: 0,
                      pekerjaanenam: 0,
                      pekerjaantujuh: 0,
                      pekerjaandelapan: 0,
                      pekerjaansembilan: 0,
                      pekerjaansepuluh: 0,
                      pekerjaansebelas: 0,
                      pekerjaanduabelas: 0,
                      pekerjaantigabelas: 0,
                      pekerjaanempatbelas: 0,
                      pekerjaanlimabelas: 0,                    
                      lastadventure: 0,
                      lastwar: 0,
                      lastberkebon: 0,
                      lastberburu: 0,
                      lastbansos: 0,
                      lastrampok: 0,
                      lastkill: 0,
                      lastfishing: 0,
                      lastdungeon: 0,
                      lastduel: 0,
                      lastmining: 0,
                      lasthourly: 0,
                      lastdagang: 0,
                      lasthunt: 0,
                      lasthun : 0,
                      lastweekly: 0,
                      lastmonthly: 0,
                      lastyearly: 0,
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
                      premiumDate: -1, 
                      premium: false,
                      premiumTime: 0,
                      vip: 'tidak', 
                      vipPoin: 0,
                      job: 'Pengangguran', 
                      jobexp: 0,
                      jail: false, 
                      penjara: false, 
                      antarpaket: 0,
                      dirawat: false, 
                      lbars: '[▒▒▒▒▒▒▒▒▒]', 
                      role: 'Newbie ㋡', 
                      registered: false,
                      name: this.getName(m.sender),
                      age: -1,
                      regTime: -1,
                      autolevelup: true,
                      lastIstigfar: 0,
                      
                      skill: "",
                      korps: "",
                      korpsgrade: "",
                      demon: "",
                      breaths: "",
                      magic: "",
                      darahiblis: 0,
                      demonblood: 0,
                      demonkill: 0,
                      hashirakill: 0,
                      alldemonkill: 0,
                      allhashirakill: 0,
                      attack: 0,
                      speed: 0,
                      strenght: 0,
                      defense: 0,
                      regeneration: 0,
                      ovo: 0,
                      dana: 0,
                      gopay: 0,
                      lastngaji: 0,
                      lastlonte: 0,
                      lastkoboy: 0,
                      lastdate: 0,
                      lasttambang: 0,
                      lastngepet: 0,
                  }
             let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat)) chat.isBanned = false
                if (!('welcome' in chat)) chat.welcome = true
                if (!isNumber(chat.welcometype)) chat.welcometype = 1
                if (!('detect' in chat)) chat.detect = false
                if (!('isBannedTime' in chat)) chat.isBannedTime = false
                if (!('mute' in chat)) chat.mute = false
                if (!('listStr' in chat)) chat.listStr = {}
                if (!('sWelcome' in chat)) chat.sWelcome = 'Hai, @user!\nSelamat datang di grup @subject\n\n@desc'
                if (!('sBye' in chat)) chat.sBye = 'Selamat tinggal @user!'
                if (!('sPromote' in chat)) chat.sPromote = ''
                if (!('sDemote' in chat)) chat.sDemote = ''
                if (!('delete' in chat)) chat.delete = true
                if (!('antiLink' in chat)) chat.antiLink = true
                if (!('antiLinknokick' in chat)) chat.antiLinknokick = false
                if (!('antiSticker' in chat)) chat.antiSticker = false
                if (!('antiStickernokick' in chat)) chat.antiStickernokick = false
                if (!('viewonce' in chat)) chat.viewonce = false
                if (!('antiToxic' in chat)) chat.antiToxic = false
                if (!isNumber(chat.expired)) chat.expired = 0
                if (!("memgc" in chat)) chat.memgc = {}
                if (!('antilinkig' in chat)) chat.antilinkig = false
                if (!('antilinkignokick' in chat)) chat.antilinkignokick = false
                if (!('antilinkfb' in chat)) chat.antilinkfb = false
                if (!('antilinkfbnokick' in chat)) chat.antilinkfbnokick = false
                if (!('antilinktwit' in chat)) chat.antilinktwit = false
                if (!('antilinktwitnokick' in chat)) chat.antilinktwitnokick = false
                if (!('antilinkyt' in chat)) chat.antilinkyt = false
                if (!('antilinkytnokick' in chat)) chat.antilinkytnokick = false
                if (!('antilinktele' in chat)) chat.antilinktele = false
                if (!('antilinktelenokick' in chat)) chat.antilinktelenokick = false
                if (!('antilinkwame' in chat)) chat.antilinkwame = false
                if (!('antilinkwamenokick' in chat)) chat.antilinkwamenokick = false
                if (!('antilinkall' in chat)) chat.antilinkall = false
                if (!('antilinkallnokick' in chat)) chat.antilinkallnokick = false
                if (!('antilinktt' in chat)) chat.antilinktt = false
                if (!('antilinkttnokick' in chat)) chat.antilinkttnokick = false
                if (!('antibot' in chat)) chat.antibot = false
            } else global.db.data.chats[m.chat] = {
                isBanned: false,
                welcome: true,
                welcometype: 1,
                detect: false,
                isBannedTime: false,
                mute: false,
                listStr: {},
                sWelcome: 'Hai, @user!\nSelamat datang di grup @subject\n\n@desc',
                sBye: 'Selamat tinggal @user!',
                sPromote: '',
                sDemote: '',
                delete: false, 
                antiLink: false,
                antiLinknokick: false,
                antiSticker: false, 
                antiStickernokick: false, 
                viewonce: false,
                antiToxic: true,
                antilinkig: false, 
                antilinkignokick: false, 
                antilinkyt: false, 
                antilinkytnokick: false, 
                antilinktwit: false, 
                antilinktwitnokick: false, 
                antilinkfb: false, 
                antilinkfbnokick: false, 
                antilinkall: false, 
                antilinkallnokick: false, 
                antilinkwame: false,
                antilinkwamenokick: false, 
                antilinktele: false, 
                antilinktelenokick: false, 
                antilinktt: false, 
                antilinkttnokick: false, 
                antibot: false, 
                rpg: false, 
            }
            let memgc = global.db.data.chats[m.chat]?.memgc?.[m.sender];
            if (typeof memgc !== 'object' || memgc === null) {
                global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
                global.db.data.chats[m.chat].memgc = global.db.data.chats[m.chat].memgc || {};
                global.db.data.chats[m.chat].memgc[m.sender] = {};
                memgc = global.db.data.chats[m.chat].memgc[m.sender];
            }
            if (memgc) {
                if (!('blacklist' in memgc)) memgc.blacklist = false;
                if (!('banned' in memgc)) memgc.banned = false;
                if (!isNumber(memgc.bannedTime)) memgc.bannedTime = 0;
                if (!isNumber(memgc.chat)) memgc.chat = 0;
                if (!isNumber(memgc.chatTotal)) memgc.chatTotal = 0;
                if (!isNumber(memgc.command)) memgc.command = 0;
                if (!isNumber(memgc.commandTotal)) memgc.commandTotal = 0;
                if (!isNumber(memgc.lastseen)) memgc.lastseen = 0;
            } else {
                global.db.data.chats[m.chat].memgc[m.sender] = {
                    blacklist: false,
                    banned: false,
                    bannedTime: 0,
                    chat: 0,
                    chatTotal: 0,
                    command: 0,
                    commandTotal: 0,
                    lastseen: 0
                };
            }
            } catch (e) {
                console.error(e);
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
        //if (m.id.startsWith('BAE5') && m.id.length === 16 || m.isBaileys && m.fromMe) return
	        if (m.id.startsWith('3EB0') || (m.id.startsWith('BAE5') && m.id.length === 16 || m.isBaileys && m.fromMe)) return;	
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

            let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isOwner = isROwner || m.fromMe
            let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isPrems = isROwner || (db.data.users[m.sender].premiumTime > 0 || db.data.users[m.sender].premium)
           
        const groupMetadata = (m.isGroup ? (conn.chats[m.chat] || {}).metadata || (await this.groupMetadata(m.chat).catch((_) => null)) : {}) || {};
		const participants = (m.isGroup ? groupMetadata.participants : []) || [];
		const user = (m.isGroup ? participants.find((u) => conn.getJid(u.id) === m.sender) : {}) || {}; // User Data
		const bot = (m.isGroup ? participants.find((u) => conn.getJid(u.id) == this.user.jid) : {}) || {}; // Your Data
		const isRAdmin = user?.admin == 'superadmin' || false;
		const isAdmin = isRAdmin || user?.admin == 'admin' || false; // Is User Admin?
		const isBotAdmin = bot?.admin || false; // Are you Admin?
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
                        if (name != 'group-modebot.js' && name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && (chat?.isBanned || chat?.mute))
                        return
                        if (name != 'unbanchat.js' && chat && chat.isBanned) return // Except this
                        if (name != 'unbanuser.js' && user && user.banned) return
                        if (m.isGroup) {
                            chat.memgc[m.sender].command++
                            chat.memgc[m.sender].commandTotal++
                            chat.memgc[m.sender].lastCmd = Date.now()
                        }
                        user.command++
                        user.commandTotal++
                        user.lastCmd = Date.now()
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
                        this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy* atau beli di *${usedPrefix}shop*`, m)
                        continue // Limit habis
                    }
                    if (plugin.level > _user.level) {
                        this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}\m gunakan .levelup untuk menaikan level!`, m)
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
                            for (let key of Object.values(APIKeys))
                                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            if (e.name)
                            for (let jid of owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != this.user.jid)) {
                                let data = (await this.onWhatsApp(jid))[0] || {}
                                if (data.exists)
                                    //m.reply(`*Plugin:* ${m.plugin}\n*Sender:* @${m.sender.split`@`[0]}\n*Chat:* ${m.chat}\n*Chat Name:* ${await this.getName(m.chat)}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid, { mentions: [m.sender] })
									console.error(`Plugin:${m.plugin} | Sender:@${m.sender.split('@')[0]} | Chat:${m.chat} | ChatName:${await this.getName(m.chat)} | Command:${usedPrefix}${command} ${args.join(' ')} | Error:${text}`)
                            }
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
             //conn.sendPresenceUpdate('composing', m.chat) // kalo pengen auto vn hapus // di baris dekat conn
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

            try {
                 require('./lib/print')(m, this)
             } catch (e) {
                 console.log(m, m.quoted, e)
             }
            if (opts['autoread']) await this.readMessages([m.key])
        }
    },
	
  async participantsUpdate({ id, participants, action }) {
    if (opts['self']) return
    if (global.isInit) return

    let chat = db.data.chats[id] || {}
    let text = ''

    switch (action) {
        case 'add':
        case 'remove':
        case 'leave':
        case 'invite':
        case 'invite_v4':
            if (chat.welcome) {
                let groupMetadata = await this.groupMetadata(id).catch(() => null)
                if (!groupMetadata) break

                for (let user of participants) {
                    let jid = user
                    if (typeof user === 'object') {
                        jid = user.phoneNumber || user.id || user.jid || user
                    }
                    if (!jid || (!jid.includes('@s.whatsapp.net') && !jid.includes('@lid'))) continue

                    let pp = 'https://telegra.ph/file/70e8de9b1879568954f09.jpg'
                    try { pp = await this.profilePictureUrl(jid, 'image') } catch {}

                    const isAdd = ['add', 'invite', 'invite_v4'].includes(action)

                    text = (isAdd
                        ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!')
                        : (chat.sBye || this.bye || conn.bye || 'Bye, @user!'))
                        .replace('@subject', groupMetadata.subject || 'this group')
                        .replace('@desc', groupMetadata.desc?.toString() || '')
                        .replace('@user', '@' + jid.split('@')[0])

                    await this.sendMessage(id, {
                        text,
                        mentions: [jid]
                    })
					/*
                    await this.sendMessage(id, {
                        text: text,
                        mentions: [jid],
                        contextInfo: {
                            externalAdReply: {
                                title: isAdd ? 'Selamat Datang' : 'Selamat Tinggal',
                                body: global.wm || 'Bot WhatsApp',
                                thumbnailUrl: pp,
                                sourceUrl: 'https://api.botcahx.eu.org',
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    })
 */
                }
            }
            break            
            /**case 'promote':
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
            case 'demote':
            if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect) this.sendMessage(id, { text }, { mentions: [participants[0]] })
            break**/
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
