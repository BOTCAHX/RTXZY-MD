const fetch = require('node-fetch');

let handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'ffstalk') {
    if (!text) throw `Example : ${usedPrefix + command} 919044185`;
    m.reply(wait);
    try {
      let ff = await fetch(`https://api.botcahx.eu.org/api/stalk/ff?id=${text}&apikey=${btc}`).then(res => res.json());
      await conn.reply(m.chat, ff.result.userNameGame, m);
    } catch (e) {
      console.log(e);
      throw eror;
    }
  }
  if (command == 'mlstalk') {
    if (text.length < 2) throw `Contoh: ${usedPrefix + command} 2480197|2001`;
    m.reply(wait);
    let [id, server] = text.split('|');
    try {
      let ml = await fetch(`https://api.botcahx.eu.org/api/stalk/ml?id=${id}&server=${server}&apikey=${btc}`).then(res => res.json());
      await conn.reply(m.chat, `*ID:* ${ml.result.user_id}\n*Server:* ${ml.result.server_id}\n*Username:* ${ml.result.userName}\n*Region:* ${ml.result.country}`, m);
    } catch (e) {
      console.log(e);
      throw eror;
    }
  }
  if (command == 'mlstalk2') {
    if (text.length < 2) throw `Contoh: ${usedPrefix + command} 214885010|2253`;
    m.reply(wait);
    let [id, server] = text.split('|');
    try {
      let ml = await fetch(`https://api.botcahx.eu.org/api/stalk/ml-v2?id=${id}&server=${server}&apikey=${btc}`).then(res => res.json());
      if (!ml.status) throw 'Failed to fetch Mobile Legends data';
      let result = ml.result.data.stalk_info;
      let shopData = ml.result.data.categorized_shop;
      let caption = `*M O B I L E  L E G E N D S  (V2)*\n\n`;
      caption += `*User ID:* ${result.user_id}\n`;
      caption += `*Server:* ${result.region}\n`;
      caption += `*Nickname:* ${result.stalk_data.split('\n')[2].split(': ')[1]}\n`;
      caption += `*Country:* ${result.stalk_data.split('\n')[3].split(': ')[1]}\n\n`;
      caption += `*Diamond Packs:*\n`;
      result.shop_data.diamond.goods.forEach(good => {
        caption += `- ${good.title}: ${good.limits.reached ? 'Reached' : 'Available'}, Inventory: ${good.limits.inventory}\n`;
      });
      caption += `\n*Event Packs:*\n`;
      result.shop_data.event.goods.forEach(good => {
        caption += `- ${good.title}: ${good.limits.reached ? 'Reached' : 'Available'}, Inventory: ${good.limits.inventory}\n`;
      });
      caption += `\n*Weekly Pass:*\n`;
      shopData.weeklyPass.items.forEach(item => {
        caption += `- ${item.title}: ${item.limits.reached_limit ? 'Reached' : 'Available'}\n`;
      });
      caption += `\n*Diamond Packs (Categorized):*\n`;
      shopData.diamondPacks.items.forEach(item => {
        caption += `- ${item.title}: ${item.limits.reached_limit ? 'Reached' : 'Available'}\n`;
      });
      caption += `\n*First Charge Bonus:*\n`;
      shopData.firstCharge.items.forEach(item => {
        caption += `- ${item.title}: ${item.limits.reached_limit ? 'Reached' : 'Available'}\n`;
      });
      caption += `\n*Special Offers:*\n`;
      if (shopData.specialOffers.items.length === 0) {
        caption += `- No special offers available\n`;
      } else {
        shopData.specialOffers.items.forEach(item => {
          caption += `- ${item.title}: ${item.limits.reached_limit ? 'Reached' : 'Available'}\n`;
        });
      }
      caption += `\n*Other Items:*\n`;
      if (shopData.other.items.length === 0) {
        caption += `- No other items available\n`;
      } else {
        shopData.other.items.forEach(item => {
          caption += `- ${item.title}: ${item.limits.reached_limit ? 'Reached' : 'Available'}\n`;
        });
      }
      await conn.reply(m.chat, caption, m);
    } catch (e) {
      console.log(e);
      throw eror;
    }
  }
  if (command == 'supersusstalk') {
    if (!text) throw `Example : ${usedPrefix + command} 20431364`;
    m.reply(wait);
    try {
      let sus = await fetch(`https://api.botcahx.eu.org/api/stalk/supersus?id=${text}&apikey=${btc}`).then(res => res.json());
      let results = sus.result;
      let caption = `*S U P E R S U S*\n\n`;
      caption += `*ID:* ${results.id}\n`;
      caption += `*Name:* ${results.name}\n`;
      caption += `*Account:* ${results.account}\n`;
      caption += `*User ID:* ${results.userId}\n`;
      caption += `*Space ID:* ${results.spaceId}\n`;
      caption += `*Sex:* ${results.sex}\n`;
      caption += `*Cup Number:* ${results.cupNum}\n`;
      caption += `*Bind Type:* ${results.bindType}\n`;
      caption += `*Head ID:* ${results.headId}\n`;
      caption += `*Head URL:* ${results.headUrl}\n`;
      caption += `*Device:* ${results.device}\n`;
      await conn.reply(m.chat, caption, m);
    } catch (e) {
      console.log(e);
      throw eror;
    }
  }
  if (command == 'npmstalk') {
    if (!text) throw `Example : ${usedPrefix + command} tiktokdl`;
    m.reply(wait);
    try {
      let npm = await fetch(`https://api.botcahx.eu.org/api/stalk/npm?name=${text}&apikey=${btc}`).then(res => res.json());
      let caption = `*N P M S T A L K*\n\n`;
      caption += `*ID:* ${npm.result._id}\n`;
      caption += `*Name:* ${npm.result.name}\n`;
      caption += `*Description:* ${npm.result.description}\n`;
      caption += `*Main:* ${npm.result.main}\n`;
      caption += `*License:* ${npm.result.license}\n`;
      caption += `*Homepage:* ${npm.result.homepage}\n`;
      caption += `*Keywords:* ${npm.result.keywords}\n`;
      caption += `*Repository:* ${npm.result.repository.url}\n`;
      caption += `*Bugs:* ${npm.result.bugs.url}\n`;
      let versions = npm.result.versions;
      for (let version in versions) {
        let v = versions[version];
        caption += `\n*Version: ${v.version}*\n`;
        caption += `*Description:* ${v.description}\n`;
        caption += `*Main:* ${v.main}\n`;
        caption += `*License:* ${v.license}\n`;
        caption += `*Homepage:* ${v.homepage}\n`;
        caption += `*Keywords:* ${v.keywords}\n`;
        caption += `*Repository:* ${v.repository.url}\n`;
        caption += `*Bugs:* ${v.bugs.url}\n`;
      }
      await conn.reply(m.chat, caption, m);
    } catch (e) {
      throw eror;
    }
  }
  if (command == 'repostalk') {
    if (!text) throw `Example : ${usedPrefix + command} RTXZY-MD`;
    m.reply(wait);
    try {
      let repo = await fetch(`https://api.botcahx.eu.org/api/stalk/repo?repo=${text}&apikey=${btc}`).then(res => res.json());
      let caption = `*R E P O S T A L K*\n\n`;
      caption += `*ID:* ${repo.result.items[0].id}\n`;
      caption += `*Node ID:* ${repo.result.items[0].nodeId}\n`;
      caption += `*Nama Repo:* ${repo.result.items[0].nameRepo}\n`;
      caption += `*Nama Lengkap Repo:* ${repo.result.items[0].fullNameRepo}\n`;
      caption += `*URL Repo:* ${repo.result.items[0].url_repo}\n`;
      caption += `*Deskripsi:* ${repo.result.items[0].description}\n`;
      caption += `*URL Git:* ${repo.result.items[0].git_url}\n`;
      caption += `*URL SSH:* ${repo.result.items[0].ssh_url}\n`;
      caption += `*URL Clone:* ${repo.result.items[0].clone_url}\n`;
      caption += `*URL SVN:* ${repo.result.items[0].svn_url}\n`;
      caption += `*Homepage:* ${repo.result.items[0].homepage}\n`;
      caption += `*Stargazers:* ${repo.result.items[0].stargazers}\n`;
      caption += `*Watchers:* ${repo.result.items[0].watchers}\n`;
      caption += `*Forks:* ${repo.result.items[0].forks}\n`;
      caption += `*Default Branch:* ${repo.result.items[0].defaultBranch}\n`;
      caption += `*Bahasa:* ${repo.result.items[0].language}\n`;
      caption += `*Private:* ${repo.result.items[0].isPrivate}\n`;
      caption += `*Fork:* ${repo.result.items[0].isFork}\n`;
      caption += `*Created At:* ${repo.result.items[0].createdAt}\n`;
      caption += `*Updated At:* ${repo.result.items[0].updatedAt}\n`;
      caption += `*Pushed At:* ${repo.result.items[0].pushedAt}\n`;
      caption += `*Author Username:* ${repo.result.items[0].author.username}\n`;
      caption += `*Author ID:* ${repo.result.items[0].author.id_user}\n`;
      caption += `*Author Avatar URL:* ${repo.result.items[0].author.avatar_url}\n`;
      caption += `*Author GitHub URL:* ${repo.result.items[0].author.user_github_url}\n`;
      caption += `*Author Type:* ${repo.result.items[0].author.type}\n`;
      caption += `*Is Site Admin:* ${repo.result.items[0].author.isSiteAdmin}\n`;
      await conn.reply(m.chat, caption, m);
    } catch (error) {
      throw eror;
    }
  }
  if (command == 'genshinstalk' || command == 'stalkgenshin') {
    if (!text) throw `Example : ${usedPrefix + command} 843829161`;
    m.reply(wait);
    try {
      let genshin = await fetch(`https://api.botcahx.eu.org/api/stalk/genshin?id=${text}&apikey=${btc}`).then(res => res.json());
      if (!genshin.status) throw 'Failed to fetch Genshin Impact data';
      let result = genshin.result[0];
      let caption = `*G E N S H I N  I M P A C T*\n\n`;
      caption += `*Nickname:* ${result.nickname}\n`;
      caption += `*UID:* ${result.uid}\n`;
      caption += `*Level:* ${result.level}\n`;
      caption += `*World Level:* ${result.worldLevel}\n`;
      caption += `*Achievement:* ${result.achievement}\n`;
      caption += `*Card ID:* ${result.cardId}\n`;
      caption += `*Spiral Abyss:* ${result.spiralAbyss}\n`;
      caption += `*Detail:* ${result.detail}\n`;
      await conn.reply(m.chat, caption, m);
    } catch (e) {
      console.log(e);
      throw eror;
    }
  }
  if (command == 'hokstalk') {
    if (!text) throw `Example: ${usedPrefix + command} 6467015277108375938`;
    m.reply(wait);
    try {
      let { result } = await fetch(`https://api.botcahx.eu.org/api/stalk/hok?id=${text}&apikey=${btc}`).then(res => res.json());
      if (!result.ok) throw 'Player not found!';
      conn.reply(m.chat, result.name, m);
    } catch (e) {
      throw eror;
    }
  }
  if (command == 'robloxstalk') {
    if (!text) throw `Example: ${usedPrefix + command} betabotzz`;
    m.reply(wait);
    try {
      let roblox = await fetch(`https://api.botcahx.eu.org/api/stalk/roblox?username=${text}&apikey=${btc}`).then(res => res.json());
      if (!roblox.result) throw 'Failed to fetch Roblox data';
      let result = roblox.result;
      let caption = `*R O B L O X  S T A L K*\n\n`;
      caption += `*Username:* ${result.account.username}\n`;
      caption += `*Display Name:* ${result.account.displayName}\n`;
      caption += `*Description:* ${result.account.description}\n`;
      caption += `*Created:* ${result.account.created}\n`;
      caption += `*Is Banned:* ${result.account.isBanned}\n`;
      caption += `*Has Verified Badge:* ${result.account.hasVerifiedBadge}\n`;
      caption += `*Presence:*\n`;
      caption += `- Is Online: ${result.presence.isOnline}\n`;
      caption += `- Last Online: ${result.presence.lastOnline}\n`;
      caption += `- Recent Game: ${result.presence.recentGame}\n\n`;
      caption += `*Stats:*\n`;
      caption += `- Friend Count: ${result.stats.friendCount}\n`;
      caption += `- Followers: ${result.stats.followers}\n`;
      caption += `- Following: ${result.stats.following}\n\n`;
      caption += `*Badges:*\n`;
      if (result.badges.length === 0) {
        caption += `- No badges available\n`;
      } else {
        result.badges.forEach(badge => {
          caption += `- ${badge.name}: ${badge.description} (Icon ID: ${badge.iconImageId})\n`;
        });
      }
      caption += `\n*Friend List:*\n`;
      if (result.friendList.length === 0) {
        caption += `- No friends available\n`;
      } else {
        result.friendList.forEach(friend => {
          caption += `- ${friend.name} (${friend.displayName}): ID ${friend.id}\n`;
        });
      }
      await conn.sendFile(m.chat, result.account.profilePicture, "profile.png", caption, m);
    } catch (e) {
      console.log(e);
      throw eror;
    }
  }
}

handler.command = handler.help = ['ffstalk', 'mlstalk', 'mlstalk2', 'supersusstalk', 'npmstalk', 'repostalk', 'genshinstalk', 'stalkgenshin', 'hokstalk', 'robloxstalk'];
handler.tags = ['stalk'];
handler.limit = true;

module.exports = handler;
