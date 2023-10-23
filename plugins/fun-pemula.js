let handler = async (m, { conn }) => {
  let wm = global.wm;
  let _uptime = process.uptime() * 1000;
  let uptimex = clockString(_uptime);
  conn.sendFile(
    m.chat,
    "https://aemt.me/file/rmrNoAqhgoNr.aac",
    "rmrNoAqhgoNr.aac",
    null,
    m,
    true,
    {
      type: "audioMessage",
      ptt: false,
      seconds: 9000,
      contextInfo: {
        forwardingScore: fsizedoc,
        externalAdReply: {
          body: null,
          containsAutoReply: true,
          mediaType: 1,
          mediaUrl: sig,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceId: null,
          sourceType: "PDF",
          previewType: "PDF",
          sourceUrl: null,
          thumbnailUrl:
            "https://telegra.ph/file/234426607fe35722c53c8.jpg",
          title: "AkuMahPemula"
        }
      }
    }
  );
};

handler.help = ["mode"];
handler.tags = ["main"];
handler.customPrefix = /^(sepuh|puhsepuh|pemula|maafpemula|sepuhpuh)$/i;
handler.command = new RegExp();
handler.limit = false;

module.exports = handler;

function clockString(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let daysms = ms % (24 * 60 * 60 * 1000);
  let hours = Math.floor(daysms / (60 * 60 * 1000));
  let hoursms = ms % (60 * 60 * 1000);
  let minutes = Math.floor(hoursms / (60 * 1000));
  let minutesms = ms % (60 * 1000);
  let sec = Math.floor(minutesms / 1000);
  return `${days} Hari ${hours} Jam ${minutes} Menit ${sec} Detik`;
}
