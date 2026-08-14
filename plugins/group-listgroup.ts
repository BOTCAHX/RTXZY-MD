const __dirname = import.meta.dirname;
import fs from 'fs';
import path from 'path';

let handler: WaPlugin = async (m, { conn, participants, groupMetadata }) => {
    let now = Date.now();
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => 
        jid.endsWith('@g.us') && 
        chat.isChats && 
        !chat.metadata?.read_only && 
        !chat.metadata?.announce
    ).map(v => v[0]);

    let txt = '';
    let groupDataFile = path.join(__dirname, 'info-listgroup.json');
    let groupData;

    try {
        groupData = fs.existsSync(groupDataFile) 
            ? JSON.parse(fs.readFileSync(groupDataFile, 'utf-8')) 
            : {};
    } catch (error) {
        groupData = {};
    }

    for (let jid in groupData) {
        if (!groups.includes(jid)) {
            groups.push(jid);
        }
    }

    for (let jid of groups) {
        let chat = conn.chats[jid] || {};
        
        let groupInfo = groupData[jid] || {};
        let dbGroupInfo = global.db?.data?.chats?.[jid] || {};

        let mergedGroupInfo = {
            isBanned: groupInfo.isBanned || dbGroupInfo.isBanned || false,
            welcome: groupInfo.welcome || dbGroupInfo.welcome || false,
            antiLink: groupInfo.antiLink || dbGroupInfo.antiLink || false,
            delete: groupInfo.delete !== undefined ? groupInfo.delete : (dbGroupInfo.delete !== undefined ? dbGroupInfo.delete : true),
            detect: groupInfo.detect || dbGroupInfo.detect || false,
            expired: groupInfo.expired || dbGroupInfo.expired,
            descUpdate: groupInfo.descUpdate || dbGroupInfo.descUpdate || false,
            stiker: groupInfo.stiker || dbGroupInfo.stiker || false,
            sWelcome: groupInfo.sWelcome || dbGroupInfo.sWelcome || '',
            sBye: groupInfo.sBye || dbGroupInfo.sBye || '',
            sPromote: groupInfo.sPromote || dbGroupInfo.sPromote || '',
            sDemote: groupInfo.sDemote || dbGroupInfo.sDemote || ''
        };

        groupData[jid] = mergedGroupInfo;

        let groupName = await conn.getName(jid);
        let isLeft = chat?.metadata?.read_only;

        txt += `${groupName}\n${jid} [${isLeft ? 'Left' : 'Joined'}]\n`;
        txt += `Expired: ${mergedGroupInfo.expired ? msToDate(mergedGroupInfo.expired - now) : 'Tidak Diatur'}\n`;
        txt += `${mergedGroupInfo.isBanned ? '✅' : '❌'} Group Banned\n`;
        txt += `${mergedGroupInfo.welcome ? '✅' : '❌'} Auto Welcome\n`;
        txt += `${mergedGroupInfo.antiLink ? '✅' : '❌'} Anti Link\n`;
        txt += `${mergedGroupInfo.detect ? '✅' : '❌'} Detect\n`;
        txt += `${mergedGroupInfo.stiker ? '✅' : '❌'} Stiker\n\n`;
    }

    m.reply(`List Groups:
Total Group: ${groups.length}
${txt}
`.trim());

    fs.writeFileSync(groupDataFile, JSON.stringify(groupData, null, 2));
}

handler.help = ['grouplist'];
handler.tags = ['group'];
handler.command = /^(group(s|list)|(s|list)group)$/i;

export default handler;

function msToDate(ms) {
    if (ms <= 0) return 'Expired';
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${days} hari ${hours} jam ${minutes} menit`;
}
