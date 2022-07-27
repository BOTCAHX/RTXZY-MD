let fetch = require("node-fetch");
let handler = async (m, { conn, args }) => {
  let res = await fetch("https://axoltlapi.herokuapp.com");
  if (!res.ok) throw await `${res.status} ${res.statusText}`;
  let json = await res.json();
  if (json.url) conn.sendFile(m.chat, json.url, "axoltl.jpg", json.facts, m);
  else throw eror
};
handler.help = ["axoltl"];
handler.tags = ["image"];

handler.command = /^(axoltl)$/i;

module.exports = handler;
