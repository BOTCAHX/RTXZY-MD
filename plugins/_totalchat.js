module.exports = {
    before: async (m, { conn }) => {
        try {
            if (!m.chat || !m.sender) return;
            if (!global.db.data.totalchat) global.db.data.totalchat = {};
            if (!global.db.data.totalchat[m.chat]) global.db.data.totalchat[m.chat] = {};

            if (!global.db.data.totalchat[m.chat][m.sender])
                global.db.data.totalchat[m.chat][m.sender] = 0;
            global.db.data.totalchat[m.chat][m.sender] += 1;

        } catch (e) {
            console.error(e);
        }
    }
};
