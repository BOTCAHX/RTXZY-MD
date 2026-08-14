let handler = m => m;

handler.before = async function (m) {
    let user = db.data.users[m.sender];
    if (user.premiumTime > 0 && new Date() - user.premiumTime > 0) {
        user.premiumTime = 0;
        user.premium = false;
    }
};

export default handler;
