let toMs = require("ms");
let jimp = require("jimp");

let thumb1 =
    "https://user-images.githubusercontent.com/72728486/235344562-4677d2ad-48ee-419d-883f-e0ca9ba1c7b8.jpg";
let thumb2 =
    "https://user-images.githubusercontent.com/72728486/235344861-acdba7d1-8fce-41b8-adf6-337c818cda2b.jpg";
let thumb3 =
    "https://user-images.githubusercontent.com/72728486/235316834-f9f84ba0-8df3-4444-81d8-db5270995e6d.jpg";
let thumb4 =
    "https://user-images.githubusercontent.com/72728486/235354619-6ad1cabd-216c-4c7c-b7c2-3a564836653a.jpg";
let thumb5 =
    "https://user-images.githubusercontent.com/72728486/235365156-cfab66ce-38b2-4bc7-90d7-7756fc320e06.jpg";
let thumb6 =
    "https://user-images.githubusercontent.com/72728486/235365148-35b8def7-c1a2-451d-a2f2-6b6a911b37db.jpg";

const resize = async (image, width, height) => {
    const read = await jimp.read(image);
    const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
    return data;
};
var a;
var b;
var d;
var e;
var f;
var textnya;
var idd;
var room;

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function emoji_role(role) {
    if (role === "warga") {
        return "👱‍♂️";
    } else if (role === "seer") {
        return "👳";
    } else if (role === "guardian") {
        return "👼";
    } else if (role === "sorcerer") {
        return "🔮";
    } else if (role === "werewolf") {
        return "🐺";
    } else {
        return "";
    }
}

const findObject = (obj = {}, key, value) => {
    const result = [];
    const recursiveSearch = (obj = {}) => {
        if (!obj || typeof obj !== "object") {
            return;
        }
        if (obj[key] === value) {
            result.push(obj);
        }
        Object.keys(obj).forEach(function(k) {
            recursiveSearch(obj[k]);
        });
    };
    recursiveSearch(obj);
    return result;
};

// sessions
const sesi = (from, data) => {
    if (!data[from]) return false;
    return data[from];
};

// check sessions
const playerOnGame = (sender, data) => {
    let result = findObject(data, "id", sender);
    let index = false;
    if (result.length === 0) {
        return index;
    } else {
        index = true;
    }
    return index;
};

// in room
const playerOnRoom = (sender, from, data) => {
    let result = findObject(data, "id", sender);
    let index = false;
    if (result.length > 0 && result[0].sesi === from) {
        index = true;
    } else {
        return index;
    }
    return index;
};

// get data player
const dataPlayer = (sender, data) => {
    let result = findObject(data, "id", sender);
    let index = false;
    if (result.length > 0 && result[0].id === sender) {
        index = result[0];
    } else {
        return index;
    }
    return index;
};

// get data player by id
const dataPlayerById = (id, data) => {
    let result = findObject(data, "number", id);
    let index = false;
    if (result.length > 0 && result[0].number === id) {
        index = result[0];
    } else {
        return index;
    }
    return index;
};

// keluar game
const playerExit = (from, id, data) => {
    room = sesi(from, data);
    if (!room) return false;
    const indexPlayer = room.player.findIndex((i) => i.id === id);
    room.player.splice(indexPlayer, 1);
};

// get player id
const getPlayerById = (from, sender, id, data) => {
    room = sesi(from, data);
    if (!room) return false;
    const indexPlayer = room.player.findIndex((i) => i.number === id);
    if (indexPlayer === -1) return false;
    return {
        index: indexPlayer,
        sesi: room.player[indexPlayer].sesi,
        db: room.player[indexPlayer],
    };
};

// get player id 2
const getPlayerById2 = (sender, id, data) => {
    let result = findObject(data, "id", sender);
    if (result.length > 0 && result[0].id === sender) {
        let from = result[0].sesi;
        room = sesi(from, data);
        if (!room) return false;
        const indexPlayer = room.player.findIndex((i) => i.number === id);
        if (indexPlayer === -1) return false;
        return {
            index: indexPlayer,
            sesi: room.player[indexPlayer].sesi,
            db: room.player[indexPlayer],
        };
    }
};

// werewolf kill
const killWerewolf = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    if (data[sesi].player[index].number === id) {
        if (db.effect.includes("guardian")) {
            data[sesi].guardian.push(parseInt(id));
            data[sesi].dead.push(parseInt(id));
        } else if (!db.effect.includes("guardian")) {
            data[sesi].dead.push(parseInt(id));
        }
    }
};

// seer dreamy
const dreamySeer = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    if (data[sesi].player[index].role === "werewolf") {
        data[sesi].seer = true;
    }
    return data[sesi].player[index].role;
};

// seer dreamy
const sorcerer = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    return data[sesi].player[index].role;
};

// guardian protect
const protectGuardian = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    data[sesi].player[index].effect.push("guardian");
};

// pengacakan role
const roleShuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
};

// memberikan role ke player
const roleChanger = (from, id, role, data) => {
    room = sesi(from, data);
    if (!room) return false;
    var index = room.player.findIndex((i) => i.id === id);
    if (index === -1) return false;
    room.player[index].role = role;
};

// memberikan peran ke semua player
const roleAmount = (from, data) => {
    const result = sesi(from, data);
    if (!result) return false;
    if (result.player.length == 4) {
        return {
            werewolf: 1,
            seer: 1,
            guardian: 1,
            warga: 1,
            sorcere: 0,
        };
    } else if (result.player.length == 5) {
        return {
            werewolf: 1,
            seer: 1,
            guardian: 1,
            warga: 3,
            sorcere: 0,
        };
    } else if (result.player.length == 6) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 1,
            warga: 2,
            sorcere: 0,
        };
    } else if (result.player.length == 7) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 1,
            warga: 3,
            sorcere: 0,
        };
    } else if (result.player.length == 8) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 1,
            warga: 4,
            sorcere: 0,
        };
    } else if (result.player.length == 9) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 1,
            warga: 4,
            sorcere: 1,
        };
    } else if (result.player.length == 10) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 1,
            warga: 5,
            sorcere: 1,
        };
    } else if (result.player.length == 11) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 2,
            warga: 5,
            sorcere: 1,
        };
    } else if (result.player.length == 12) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 2,
            warga: 6,
            sorcere: 1,
        };
    } else if (result.player.length == 13) {
        return {
            werewolf: 2,
            seer: 1,
            guardian: 1,
            warga: 7,
            sorcere: 1,
        };
    } else if (result.player.length == 14) {
        return {
            werewolf: 2,
            seer: 2,
            guardian: 2,
            warga: 7,
            sorcere: 1,
        };
    } else if (result.player.length == 15) {
        return {
            werewolf: 3,
            seer: 2,
            guardian: 3,
            warga: 6,
            sorcere: 1,
        };
    }
};

const roleGenerator = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    var role = roleAmount(from, data);
    for (var i = 0; i < role.werewolf; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "werewolf", data);
    }
    for (var i = 0; i < role.seer; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "seer", data);
    }
    for (var i = 0; i < role.guardian; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "guardian", data);
    }
    for (var i = 0; i < role.warga; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "warga", data);
    }
    for (var i = 0; i < role.sorcere; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "sorcerer", data);
    }
    shortPlayer(from, data);
};

// add cooldown
const addTimer = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.cooldown = Date.now() + toMs(90 + "s");
};

// merubah status room, dalam permainan
const startGame = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.status = true;
};

// rubah hari
const changeDay = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    if (room.time === "pagi") {
        room.time = "voting";
    } else if (room.time === "malem") {
        room.time = "pagi";
        room.day += 1;
    } else if (room.time === "voting") {
        room.time = "malem";
    }
};

// hari voting
const dayVoting = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    if (room.time === "malem") {
        room.time = "voting";
    } else if (room.time === "pagi") {
        room.time = "voting";
    }
};

// voting
const vote = (from, id, sender, data) => {
    room = sesi(from, data);
    if (!room) return false;
    const idGet = room.player.findIndex((i) => i.id === sender);
    if (idGet === -1) return false;
    const indexPlayer = room.player.findIndex((i) => i.number === id);
    if (indexPlayer === -1) return false;
    if (idGet !== -1) {
        room.player[idGet].isvote = true;
    }
    room.player[indexPlayer].vote += 1;
};

// hasil voting
const voteResult = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.player.sort((a, b) => (a.vote < b.vote ? 1 : -1));
    if (room.player[0].vote === 0) return 0;
    if (room.player[0].vote === room.player[1].vote) return 1;
    return room.player[0];
};

// vote killing
const voteKill = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.player.sort((a, b) => (a.vote < b.vote ? 1 : -1));
    if (room.player[0].vote === 0) return 0;
    if (room.player[0].vote === room.player[1].vote) return 1;
    room.player[0].isdead = true;
};

// voting reset
const resetVote = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].vote = 0;
    }
};

const voteDone = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.voting = false;
};

const voteStart = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.voting = true;
};

// clear vote
const clearAllVote = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].vote = 0;
        room.player[i].isvote = false;
    }
};

// clearAll
const clearAll = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.dead = [];
    room.seer = false;
    room.guardian = [];
    room.voting = false;
};

// clear all status player
const clearAllSTATUS = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].effect = [];
    }
};

const skillOn = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].status = false;
    }
};

const skillOff = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].status = true;
    }
};

const playerHidup = (data) => {
    const hasil = data.player.filter((x) => x.isdead === false);
    return hasil.length;
};

const playerMati = (data) => {
    const hasil = data.player.filter((x) => x.isdead === true);
    return hasil.length;
};

// get player win
const getWinner = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    var ww = 0;
    var orang_baek = 0;
    for (let i = 0; i < room.player.length; i++) {
        if (room.player[i].isdead === false) {
            if (
                room.player[i].role === "werewolf" ||
                room.player[i].role === "sorcerer"
            ) {
                ww += 1;
            } else if (
                room.player[i].role === "warga" ||
                room.player[i].role === "guardian" ||
                room.player[i].role === "seer"
            ) {
                orang_baek += 1;
            }
        }
    }
    if (room.voting) {
        b = voteResult(from, data);
        if (b != 0 && b != 1) {
            if (b.role === "werewolf" || b.role === "sorcerer") {
                ww -= 1;
            } else if (
                b.role === "warga" ||
                b.role === "seer" ||
                b.role === "guardian"
            ) {
                orang_baek -= 1;
            }
        }
    }
    if (ww === 0) {
        room.iswin = true;
        return {
            voting: room.voting,
            status: true
        };
    } else if (ww === orang_baek) {
        room.iswin = false;
        return {
            voting: room.voting,
            status: false
        };
    } else if (orang_baek === 0) {
        room.iswin = false;
        return {
            voting: room.voting,
            status: false
        };
    } else {
        return {
            voting: room.voting,
            status: null
        };
    }
};

// shorting
const shortPlayer = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.player.sort((a, b) => a.number - b.number);
};

// werewolf killing
const killww = (from, id, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let j = 0; j < room.dead.length; j++) {
        idd = getPlayerById(from, room.player[0].id, room.dead[j], data);
        if (!idd) return false;
        if (room.player[idd.index].effect.includes("guardian")) return;
        room.player[idd.index].isdead = true;
    }
};

const pagii = (data) => {
    if (data.dead.length < 1) {
        return `*⌂ W E R E W O L F - G A M E*\n\nMentari telah terbit, tidak ada korban berjatuhan malam ini, warga kembali melakukan aktifitasnya seperti biasa.\n90 detik tersisa sebelum waktu penentuan, para warga dipersilahkan untuk berdiskusi\n*Hari ke ${data.day}*`;
    } else {
        a = "";
        d = "";
        e = [];
        f = [];
        for (let i = 0; i < data.dead.length; i++) {
            b = data.player.findIndex((x) => x.number === data.dead[i]);
            if (data.player[b].effect.includes("guardian")) {
                e.push(data.player[b].id);
            } else {
                f.push(data.player[b].id);
            }
        }
        for (let i = 0; i < f.length; i++) {
            if (i === f.length - 1) {
                if (f.length > 1) {
                    a += ` dan @${f[i].replace("@s.whatsapp.net", "")}`;
                } else {
                    a += `@${f[i].replace("@s.whatsapp.net", "")}`;
                }
            } else if (i === f.length - 2) {
                a += `@${f[i].replace("@s.whatsapp.net", "")}`;
            } else {
                a += `@${f[i].replace("@s.whatsapp.net", "")}, `;
            }
        }
        for (let i = 0; i < e.length; i++) {
            if (i === e.length - 1) {
                if (e.length > 1) {
                    d += ` dan @${e[i].replace("@s.whatsapp.net", "")}`;
                } else {
                    d += `@${e[i].replace("@s.whatsapp.net", "")}`;
                }
            } else if (i === e.length - 2) {
                d += `@${e[i].replace("@s.whatsapp.net", "")}`;
            } else {
                d += `@${e[i].replace("@s.whatsapp.net", "")}, `;
            }
        }
        textnya = `*⌂ W E R E W O L F - G A M E*\n\nPagi telah tiba, warga desa menemukan ${
      data.dead.length > 1 ? "beberapa" : "1"
    } mayat di tumpukan puing dan darah berceceran. ${a ? a + " telah mati! " : ""}${
      d.length > 1
        ? ` ${d} hampir dibunuh, namun *Guardian Angel* berhasil melindunginya.`
        : ""
    }\n\nTak terasa hari sudah siang, matahari tepat di atas kepala, terik panas matahari membuat suasana menjadi riuh, warga desa mempunyai 90 detik untuk berdiskusi\n*Hari ke ${
      data.day
    }*`;
        return textnya;
    }
};

async function pagi(conn, x, data) {
    skillOff(x.room, data)
    let ment = [];
    for (let i = 0; i < x.player.length; i++) {
        ment.push(x.player[i].id);
    }
    shortPlayer(x.room, data);
    killww(x.room, x.dead, data);
    shortPlayer(x.room, data);
    changeDay(x.room, data);
    return await conn.sendMessage(x.room, {
        text: pagii(x),
        contextInfo: {
            externalAdReply: {
                title: "W E R E W O L F",
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnail: await resize(thumb1, 300, 175),
                sourceUrl: "",
                mediaUrl: thumb1,
            },
            mentionedJid: ment,
        },
    });
}

async function voting(conn, x, data) {
    let row = [];
    let ment = [];
    voteStart(x.room, data)
    textnya =
        "*⌂ W E R E W O L F - G A M E*\n\nSenja telah tiba. Seluruh warga berkumpul di balai desa untuk memilih siapa yang akan dieksekusi. Sebagian warga terlihat sibuk menyiapkan alat penyiksaan untuk malam ini. Kalian mempunyai waktu selama 90 detik untuk memilih! Hati-hati, ada penghianat diantara kalian!\n\n*L I S T - P L A Y E R*:\n";
    shortPlayer(x.room, data);
    for (let i = 0; i < x.player.length; i++) {
        textnya += `(${x.player[i].number}) @${x.player[i].id.replace(
      "@s.whatsapp.net",
      ""
    )} ${x.player[i].isdead === true ? "☠️" : ""}\n`;
        ment.push(x.player[i].id);
    }
    textnya += "\nketik *.ww vote nomor* untuk voting player";
    dayVoting(x.room, data);
    clearAll(x.room, data);
    clearAllSTATUS(x.room, data);
    return await conn.sendMessage(x.room, {
        text: textnya,
        contextInfo: {
            externalAdReply: {
                title: "W E R E W O L F",
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnail: await resize(thumb2, 300, 175),
                sourceUrl: "",
                mediaUrl: thumb2,
            },
            mentionedJid: ment,
        },
    });
}

async function malam(conn, x, data) {
    var hasil_vote = voteResult(x.room, data);
    if (hasil_vote === 0) {
        textnya = `*⌂ W E R E W O L F - G A M E*\n\nTerlalu bimbang menentukan pilihan. Warga pun pulang ke rumah masing-masing, tidak ada yang dieksekusi hari ini. Bulan bersinar terang, malam yang mencekam telah datang. Semoga tidak ada yang mati malam ini. Pemain malam hari: kalian punya 90 detik untuk beraksi!`;
        return conn
            .sendMessage(x.room, {
                text: textnya,
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb3, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb3,
                    },
                },
            })
            .then(() => {
                changeDay(x.room, data);
                voteDone(x.room, data);
                resetVote(x.room, data);
                clearAllVote(x.room, data);
                if (getWinner(x.room, data).status != null)
                    return win(x, 1, conn, data);
            });
    } else if (hasil_vote === 1) {
        textnya = `*⌂ W E R E W O L F - G A M E*\n\nWarga desa telah memilih, namun hasilnya seri.\n\nBintang memancarkan cahaya indah malam ini, warga desa beristirahat di kediaman masing masing. Pemain malam hari: kalian punya 90 detik untuk beraksi!`;
        let ment = [];
        return conn
            .sendMessage(x.room, {
                text: textnya,
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb3, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb3,
                    },
                    mentionedJid: ment,
                },
            })
            .then(() => {
                changeDay(x.room, data);
                voteDone(x.room, data);
                resetVote(x.room, data);
                clearAllVote(x.room, data);
                if (getWinner(x.room, data).status != null)
                    return win(x, 1, conn, data);
            });
    } else if (hasil_vote != 0 && hasil_vote != 1) {
        if (hasil_vote.role === "werewolf") {
            textnya = `*⌂ W E R E W O L F - G A M E*\n\nWarga desa telah memilih dan sepakat @${hasil_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} dieksekusi mati.\n\n@${hasil_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} adalah ${hasil_vote.role} ${emoji_role(hasil_vote.role)}`;
            voteKill(x.room, data);
            let ment = [];
            ment.push(hasil_vote.id);
            return await conn
                .sendMessage(x.room, {
                    text: textnya,
                    contextInfo: {
                        externalAdReply: {
                            title: "W E R E W O L F",
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            thumbnail: await resize(thumb4, 300, 175),
                            sourceUrl: "",
                            mediaUrl: thumb4,
                        },
                        mentionedJid: ment,
                    },
                })
                .then(() => {
                    changeDay(x.room, data);
                    voteDone(x.room, data);
                    resetVote(x.room, data);
                    clearAllVote(x.room, data);
                    if (getWinner(x.room, data).status != null)
                        return win(x, 1, conn, data);
                });
        } else {
            textnya = `*⌂ W E R E W O L F - G A M E*\n\nWarga desa telah memilih dan sepakat @${hasil_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} dieksekusi mati.\n\n@${hasil_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} adalah ${hasil_vote.role} ${emoji_role(
        hasil_vote.role
      )}\n\nBulan bersinar terang malam ini, warga desa beristirahat di kediaman masing masing. Pemain malam hari: kalian punya 90 detik untuk beraksi!`;
            voteKill(x.room, data);
            let ment = [];
            ment.push(hasil_vote.id);
            return await conn
                .sendMessage(x.room, {
                    text: textnya,
                    contextInfo: {
                        externalAdReply: {
                            title: "W E R E W O L F",
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            thumbnail: await resize(thumb4, 300, 175),
                            sourceUrl: "",
                            mediaUrl: thumb4,
                        },
                        mentionedJid: ment,
                    },
                })
                .then(() => {
                    changeDay(x.room, data);
                    voteDone(x.room, data);
                    resetVote(x.room, data);
                    clearAllVote(x.room, data);
                    if (getWinner(x.room, data).status != null)
                        return win(x, 1, conn, data);
                });
        }
    }
}

async function skill(conn, x, data) {
    skillOn(x.room, data)
    if (getWinner(x.room, data).status != null || x.win != null) {
        return win(x, 1, conn, data);
    } else {
        if (!x) return;
        if (!x.player) return;
        if (x.win != null) return;
        let tok1 = "\n";
        let tok2 = "\n";
        let membernya = [];
        shortPlayer(x.room, data);
        for (let i = 0; i < x.player.length; i++) {
            tok1 += `(${x.player[i].number}) @${x.player[i].id.replace(
        "@s.whatsapp.net",
        ""
      )}${x.player[i].isdead === true ? " ☠️" : ""}\n`;
            membernya.push(x.player[i].id);
        }
        for (let i = 0; i < x.player.length; i++) {
            tok2 += `(${x.player[i].number}) @${x.player[i].id.replace(
        "@s.whatsapp.net",
        ""
      )} ${
        x.player[i].role === "werewolf" || x.player[i].role === "sorcerer"
          ? `${x.player[i].isdead === true ? ` ☠️` : ` ${x.player[i].role}`}`
          : " "
      }\n`;
            membernya.push(x.player[i].id);
        }
        for (let i = 0; i < x.player.length; i++) {
            if (x.player[i].role === "werewolf") {
                if (x.player[i].isdead != true) {
                    textnya = `Silahkan pilih salah satu orang yang ingin kamu makan pada malam hari ini\n*LIST PLAYER*:\n${tok2}\n\nKetik *.wwpc kill nomor* untuk membunuh player`;

                    await conn.sendMessage(x.player[i].id, {
                        text: textnya,
                        mentions: membernya,
                    });
                }
            } else if (x.player[i].role === "warga") {
                if (x.player[i].isdead != true) {
                    textnya = `*⌂ W E R E W O L F - G A M E*\n\nSebagai seorang warga berhati-hatilah, mungkin kamu adalah target selanjutnya.\n*LIST PLAYER*:${tok1}`;
                    await conn.sendMessage(x.player[i].id, {
                        text: textnya,
                        mentions: membernya,
                    });
                }
            } else if (x.player[i].role === "seer") {
                if (x.player[i].isdead != true) {
                    textnya = `Baiklah, siapa yang ingin kamu lihat peran nya kali ini.\n*LIST PLAYER*:${tok1}\n\nKetik *.wwpc dreamy nomor* untuk melihat role player`;

                    await conn.sendMessage(x.player[i].id, {
                        text: textnya,
                        mentions: membernya,
                    });
                }
            } else if (x.player[i].role === "guardian") {
                if (x.player[i].isdead != true) {
                    textnya = `Kamu adalah seorang*Guardian*, lindungi para warga, silahkan pilih salah 1 player yang ingin kamu lindungi\n*LIST PLAYER*:${tok1}\n\nKetik *.wwpc deff nomor* untuk melindungi player`;

                    await conn.sendMessage(x.player[i].id, {
                        text: textnya,
                        mentions: membernya,
                    });
                }
            } else if (x.player[i].role === "sorcerer") {
                if (x.player[i].isdead != true) {
                    textnya = `Baiklah, lihat apa yang bisa kamu buat, silakan pilih 1 orang yang ingin kamu buka identitasnya\n*LIST PLAYER*:${tok2}\n\nKetik *.wwpc sorcerer nomor* untuk melihat role player`;

                    await conn.sendMessage(x.player[i].id, {
                        text: textnya,
                        mentions: membernya,
                    });
                }
            }
        }
    }
}

async function win(x, t, conn, data) {
    const sesinya = x.room;
    if (getWinner(x.room, data).status === false || x.iswin === false) {
        textnya = `*W E R E W O L F - W I N*\n\nTEAM WEREWOLF\n\n`;
        let ment = [];
        for (let i = 0; i < x.player.length; i++) {
            if (x.player[i].role === "sorcerer" || x.player[i].role === "werewolf") {
                textnya += `${x.player[i].number}) @${x.player[i].id.replace(
          "@s.whatsapp.net",
          ""
        )}\n     *Role* : ${x.player[i].role}\n\n`;
                ment.push(x.player[i].id);
            }
        }
        return await conn
            .sendMessage(sesinya, {
                text: textnya,
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb5, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb5,
                    },
                    mentionedJid: ment,
                },
            })
            .then(() => {
                delete data[x.room];
            });
    } else if (getWinner(x.room, data).status === true) {
        textnya = `*T E A M - W A R G A - W I N*\n\nTEAM WARGA\n\n`;
        let ment = [];
        for (let i = 0; i < x.player.length; i++) {
            if (
                x.player[i].role === "warga" ||
                x.player[i].role === "guardian" ||
                x.player[i].role === "seer"
            ) {
                textnya += `${x.player[i].number}) @${x.player[i].id.replace(
          "@s.whatsapp.net",
          ""
        )}\n     *Role* : ${x.player[i].role}\n\n`;
                ment.push(x.player[i].id);
            }
        }
        return await conn.sendMessage(sesinya, {
            text: textnya,
            contextInfo: {
                externalAdReply: {
                    title: "W E R E W O L F",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnail: await resize(thumb6, 300, 175),
                    sourceUrl: "",
                    mediaUrl: thumb5,
                },
                mentionedJid: ment,
            },
        });
    }
}

// playing
async function run(conn, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await pagi(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await voting(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await malam(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await skill(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, conn, data);
}

async function run_vote(conn, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await voting(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await malam(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await skill(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await pagi(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, conn, data);
}

async function run_malam(conn, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await skill(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await pagi(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await voting(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await malam(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, conn, data);
}

async function run_pagi(conn, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await pagi(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await voting(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await malam(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await skill(conn, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, conn, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, conn, data);
}

module.exports = {
    emoji_role,
    sesi,
    playerOnGame,
    playerOnRoom,
    playerExit,
    dataPlayer,
    dataPlayerById,
    getPlayerById,
    getPlayerById2,
    killWerewolf,
    killww,
    dreamySeer,
    sorcerer,
    protectGuardian,
    roleShuffle,
    roleChanger,
    roleAmount,
    roleGenerator,
    addTimer,
    startGame,
    playerHidup,
    playerMati,
    vote,
    voteResult,
    clearAllVote,
    getWinner,
    win,
    pagi,
    malam,
    skill,
    voteStart,
    voteDone,
    voting,
    run,
    run_vote,
    run_malam,
    run_pagi,
};
