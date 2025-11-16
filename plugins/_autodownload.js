const fetch = require('node-fetch');
const axios = require('axios');

let handler = (m) => m;
handler.before = async function (m, { conn, isPrems }) {
    let chat = global.db.data.chats[m.chat];
    if (!m.text) return;
    if (m.text.startsWith("=>") || m.text.startsWith(">") || m.text.startsWith(".") || m.text.startsWith("#") || m.text.startsWith("!") || m.text.startsWith("/") || m.text.startsWith("\\")) return;
    if (chat.isBanned) return;
    if (!m.text.includes("http")) return;
    let text = m.text.replace(/\n+/g, " ");
    const tiktokRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/i;
    const douyinRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.|v\.)?(?:douyin\.com\/)(?:\S+)?$/i;
    const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/i;
    const facebookRegex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/i;
    const pinRegex = /^(?:https?:\/\/)?(?:www\.|id\.)?(?:pinterest\.(?:com|it|co\.[a-z]{2}|[a-z]{2})|pin\.it)\/(?:pin\/)?[^\/\s]+(?:\/)?$/i;
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:\S+)?$/i;
    const spotifyRegex = /^(?:https?:\/\/)?(?:open\.spotify\.com\/track\/)([a-zA-Z0-9]+)(?:\S+)?$/i;
    const twitterRegex = /^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)\/status\/(\d+)(?:\?[^#]*)?(?:#.*)?$/i;
    const threadsRegex = /^(https?:\/\/)?(www\.)?(threads\.(net|com))(\/[^\s]*)?(\?[^\s]*)?$/;
    const capcutRegex = /^https:\/\/www\.capcut\.com\/(t\/[A-Za-z0-9_-]+\/?|template-detail\/\d+\?(?:[^=]+=[^&]+&?)+)$/;
    const snackvideoRegex = /^(https?:\/\/)?s\.snackvideo\.com\/p\/[a-zA-Z0-9]+$/i;
    const xiaohongshuRegex = /^(https?:\/\/)?(www\.)?(xiaohongshu\.com\/discovery\/item\/[a-zA-Z0-9]+|xhslink\.com\/[a-zA-Z0-9/]+)(\?.*)?$/i;
    const soundcloudRegex = /^(https?:\/\/)?(www\.|m\.)?soundcloud\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?(\?.*)?$/i;
    const cocofunRegex = /^(https?:\/\/)?(www\.)?icocofun\.com\/share\/post\/\d+(\?.*)?$/i;
    if (text.match(tiktokRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _tiktok(text.match(tiktokRegex)[0], m);
    } else if (text.match(douyinRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _douyin(text.match(douyinRegex)[0], m);
    } else if (text.match(instagramRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _instagram(text.match(instagramRegex)[0], m);
    } else if (text.match(facebookRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _facebook(text.match(facebookRegex)[0], m);
    } else if (text.match(pinRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _pindl(text.match(pinRegex)[0], m);
    } else if (text.match(youtubeRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _youtube(text.match(youtubeRegex)[0], m);
    } else if (text.match(spotifyRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _spotify(text.match(spotifyRegex)[0], m);
    } else if (text.match(twitterRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _twitter(text.match(twitterRegex)[0], m);
    } else if (text.match(threadsRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _threads(text.match(threadsRegex)[0], m);
    } else if (text.match(capcutRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _capcut(text.match(capcutRegex)[0], m);
    } else if (text.match(snackvideoRegex)) {
        conn.sendMessage(m.chat, {
            react: {
                text: "🕒",
                key: m.key,
            },
        });
        await _snackvideo(text.match(snackvideoRegex)[0], m);
    } else if (text.match(xiaohongshuRegex)) {
    conn.sendMessage(m.chat, {
        react: {
            text: "🕒",
            key: m.key,
        },
    });
    await _xiaohongshu(text.match(xiaohongshuRegex)[0], m);
   } else if (text.match(soundcloudRegex)) {
    conn.sendMessage(m.chat, {
        react: {
            text: "🕒",
            key: m.key,
        },
    });
    await _soundcloud(text.match(soundcloudRegex)[0], m);
  } else if (text.match(cocofunRegex)) {
    conn.sendMessage(m.chat, {
        react: {
            text: "🕒",
            key: m.key,
        },
    });
    await _cocofun(text.match(cocofunRegex)[0], m);
  } 
    return true;
};
module.exports = handler;

let old = new Date();
const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function _tiktok(link, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.botcahx.eu.org/api/download/tiktok?url=${link}&apikey=${btc}`);
            const data = await response.json();
            if (!data.result.video) return;
            if (data.result.video.length > 1) {
                global.db.data.users[m.sender].limit -= 1;
                for (let v of data.result.video) {
                    await conn.sendFile(m.chat, v, null, `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                    await _sleep(3000);
                }
            } else {
                await conn.sendMessage(
                    m.chat,
                    {
                        video: {
                            url: data.result.video[0],
                        },
                        caption: `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
                    },
                    {
                        mention: m,
                    }
                );
            }
        } else {
            conn.reply(m.chat, "limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}
async function _douyin(link, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            let response = await fetch(`https://api.botcahx.eu.org/api/download/douyin?url=${link}&apikey=${btc}`);
            let data = await response.json();
            if (!data.result.video || data.result.video.length === 0) {
                response = await fetch(`https://api.botcahx.eu.org/api/download/douyinslide?url=${link}&apikey=${btc}`);
                data = await response.json();
                if (data.result.images && data.result.images.length > 0) {
                    global.db.data.users[m.sender].limit -= 1;
                    for (let img of data.result.images) {
                        await conn.sendFile(m.chat, img, null, `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                        await _sleep(3000);
                    }
                    return;
                }
            }
            if (data.result.video && data.result.video.length > 0) {
                global.db.data.users[m.sender].limit -= 1;
                if (data.result.video.length > 1) {
                    for (let v of data.result.video) {
                        await conn.sendFile(m.chat, v, null, `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                        await _sleep(3000);
                    }
                } else {
                    await conn.sendMessage(
                        m.chat,
                        {
                            video: {
                                url: data.result.video[0],
                            },
                            caption: `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
                        },
                        {
                            mention: m,
                        }
                    );
                }
            } else {
                conn.reply(m.chat, "Maaf, tidak dapat mengunduh konten!", m);
            }
        } else {
            conn.reply(m.chat, "limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}
async function _instagram(link, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${link}&apikey=${btc}`);
            const res = await response.json();
            const limitnya = 3;
            for (let i = 0; i < Math.min(limitnya, res.result.length); i++) {
                await _sleep(3000);
                conn.sendFile(m.chat, res.result[i].url, null, `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
            }
            global.db.data.users[m.sender].limit -= 1;
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (err) {
        console.error(err);
    }
}

async function _facebook(link, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/fbdown3?url=${link}&apikey=${btc}`);
            let json = await response.json();
            let urls = json.result.url.urls;
            if (Array.isArray(urls)) {
                let videoUrl = urls.find((url) => url.sd)?.sd || urls.find((url) => url.hd)?.hd;
                if (videoUrl) {
                    global.db.data.users[m.sender].limit -= 1;
                    conn.sendFile(m.chat, videoUrl, "fb.mp4", `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                } else {
                    conn.reply(m.chat, "Gagal mendapatkan video SD atau HD", m);
                }
            } else {
                conn.reply(m.chat, "Gagal mendapatkan video", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}
async function _youtube(link, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${link}&apikey=${btc}`);
            const result = await response.json();
            if (result.status && result.result && result.result.mp4) {
                global.db.data.users[m.sender].limit -= 1;
                await conn.sendMessage(
                    m.chat,
                    {
                        audio: {
                            url: result.result.mp3,
                        },
                        mimetype: "audio/mpeg",
                    },
                    {
                        quoted: m,
                    }
                );
                await _sleep(1000);
                await conn.sendMessage(
                    m.chat,
                    {
                        video: {
                            url: result.result.mp4,
                        },
                        caption: `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
                    },
                    {
                        quoted: m,
                    }
                );
            } else {
                conn.reply(m.chat, "Gagal mendapatkan video", m);
            }
        } else {
            conn.reply(m.chat, "limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}
async function _spotify(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const res = await fetch(`https://api.botcahx.eu.org/api/download/spotify?url=${url}&apikey=${btc}`);
            const jsons = await res.json();
            if (jsons.result && jsons.result.data) {
                global.db.data.users[m.sender].limit -= 1;
                const { url: downloadUrl } = jsons.result.data;
                await conn.sendMessage(
                    m.chat,
                    {
                        audio: {
                            url: downloadUrl,
                        },
                        mimetype: "audio/mpeg",
                    },
                    {
                        quoted: m,
                    }
                );
            } else {
                conn.reply(m.chat, "Gagal mendapatkan media dari Spotify!", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}
async function _twitter(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const api = await fetch(`https://api.botcahx.eu.org/api/download/twitter2?url=${url}&apikey=${btc}`);
            const res = await api.json();
            if (res.result && res.result.mediaURLs) {
                global.db.data.users[m.sender].limit -= 1;
                const mediaURLs = res.result.mediaURLs;
                for (const url of mediaURLs) {
                    const response = await fetch(url);
                    const buffer = await response.buffer();
                    await _sleep(3000);
                    conn.sendFile(m.chat, buffer, null, `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                }
            } else {
                conn.reply(m.chat, "Gagal mendapatkan media dari Twitter!", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}
async function _threads(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const apiResponse = await fetch(`https://api.botcahx.eu.org/api/download/threads?url=${url}&apikey=${btc}`);
            const api = await apiResponse.json();
            const foto = api.result.image_urls[0] || null;
            const video = api.result.video_urls[0] || null;
            if (video) {
                try {
                    await conn.sendFile(m.chat, video.download_url, "threads.mp4", `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                } catch (e) {
                    throw "Media video tidak ditemukan!";
                }
            } else if (foto) {
                try {
                    await conn.sendFile(m.chat, foto, "threads.jpeg", `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                } catch (e) {
                    throw "Media foto tidak ditemukan!";
                }
            } else {
                throw "Konten tidak ditemukan!";
            }
            global.db.data.users[m.sender].limit -= 1;
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}
async function _capcut(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/capcut?url=${url}&apikey=${btc}`);
            const res = await response.json();
            const { video } = res.result;
            global.db.data.users[m.sender].limit -= 1;
            await conn.sendFile(m.chat, video, "capcut.mp4", `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (e) {
        console.error(e);
    }
}
async function _snackvideo(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const api = await fetch(`https://api.botcahx.eu.org/api/download/snackvideo?url=${url}&apikey=${btc}`);
            const res = await api.json();
            const { media } = res.result;
            await conn.sendFile(m.chat, media, null, `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
            global.db.data.users[m.sender].limit -= 1;
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (e) {
        console.log(e);
    }
}

async function _pindl(link, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const api = await fetch(`https://api.botcahx.eu.org/api/download/pinterest?url=${link}&apikey=${btc}`);
            const res = await api.json();
            if (res.result && res.result.data) {
                let { media_type, image, title, video } = res.result.data;
                global.db.data.users[m.sender].limit -= 1;
                if (media_type === "video/mp4") {
                    await conn.sendMessage(m.chat, {
                        video: {
                            url: video,
                        },
                        caption: `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
                    });
                } else {
                    await conn.sendFile(m.chat, image, "pindl.jpeg", `🍟 *Fetching* : ${(new Date() - old) * 1} ms`, m);
                }
            } else {
                conn.reply(m.chat, "Gagal mendapatkan media!", m);
            }
        } else {
            conn.reply(m.chat, "limit kamu habis!", m);
        }
    } catch (error) {
        console.error(error);
    }
}

async function _xiaohongshu(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            let res = await axios.get(`https://api.botcahx.eu.org/api/download/rednote?url=${url}&apikey=${btc}`);
            let result = res.data.result;

            if (!result || !result.media) throw `Gagal mengambil data!`;

            global.db.data.users[m.sender].limit -= 1;

            const media = result.media;
            const meta = result.metadata;
            const title = meta?.title || "No title";

            if (media.videoUrl) {
                await conn.sendMessage(
                    m.chat,
                    {
                        video: {
                            url: media.videoUrl,
                        },
                        caption: `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
                    },
                    {
                        mention: m,
                    }
                );
            } else if (media.images && media.images.length > 0) {
                for (let img of media.images) {
                    await _sleep(3000);
                    await conn.sendMessage(
                        m.chat,
                        {
                            image: { url: img },
                            caption: `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
                        },
                        { quoted: m }
                    );               
                }
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (e) {
        console.log(e);
    }
}

async function _soundcloud(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const res = await fetch(`https://api.botcahx.eu.org/api/download/soundcloud?url=${url}&apikey=${btc}`);
            let anu = await res.json();
            await conn.sendMessage(
                    m.chat,
                    {
                        audio: {
                            url: anu.result.url,
                        },
                        mimetype: "audio/mpeg",
                    },
                    {
                        quoted: m,
                    }
                );
            global.db.data.users[m.sender].limit -= 1;
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (e) {
        console.log(e);
    }
}

async function _cocofun(url, m) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const res = await fetch(`https://api.botcahx.eu.org/api/download/cocofun?url=${encodeURIComponent(url)}&apikey=${btc}`);
           const json = await res.json();
           const videoUrl = json.result.no_watermark || json.result.watermark;
            await conn.sendMessage(
                    m.chat,
                    {
                        video: {
                            url: videoUrl,
                        },
                        caption: `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
                    },
                    {
                        mention: m,
                    }
                );
            global.db.data.users[m.sender].limit -= 1;
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (e) {
        console.log(e);
    }
}
