
const http = require('http');
const os = require('os');
const port = 3000; //according to your hosting port (sesuaikan dengan port hosting kalian
const server = http.createServer();
console.log('\x1b[33m%s\x1b[0m', `🌐 Port ${port} is open`);
server.listen(port);
cluster = require("cluster");
const {
spawn
} = require("child_process");
const path = require("path");
const fs = require("fs");
const packageJson = require("./package.json");
let isRunning = false;
function start(file) {
if (isRunning) return;
isRunning = true;
const args = [path.join(__dirname, file), ...process.argv.slice(2)];
const p = spawn(process.argv[0], args, {
stdio: ["inherit", "inherit", "inherit", "ipc"],
});
p.on("message", (data) => {
console.log('\x1b[36m%s\x1b[0m', `🟢 RECEIVED ${data}`);
switch (data) {
case "reset":
p.kill();
isRunning = false;
start.apply(this, arguments);
break;
case "uptime":
p.send(process.uptime());
break;
}
});
p.on("exit", (code) => {
isRunning = false;
console.error('\x1b[31m%s\x1b[0m', `Exited with code: ${code}`);
if (code === 0) return;
fs.watchFile(args[0], () => {
fs.unwatchFile(args[0]);
start("main.js");
});
});
p.on("error", (err) => {
console.error('\x1b[31m%s\x1b[0m', `Error: ${err}`);
p.kill();
isRunning = false;
start("main.js");
});
const pluginsFolder = path.join(__dirname, "plugins");
fs.readdir(pluginsFolder, (err, files) => {
if (err) {
console.error('\x1b[31m%s\x1b[0m', `Error reading plugins folder: ${err}`);
return;
}
console.log('\x1b[33m%s\x1b[0m', `🟡 Found ${files.length} plugins in folder ${pluginsFolder}`);
try {
require.resolve('@adiwajshing/baileys');
console.log('\x1b[33m%s\x1b[0m', `🟡 Baileys library version ${require('@adiwajshing/baileys/package.json').version} is installed`);
} catch (e) {
console.error('\x1b[31m%s\x1b[0m', `❌ Baileys library is not installed`);
}
});
console.log(`🖥️ \x1b[33m${os.type()}\x1b[0m, \x1b[33m${os.release()}\x1b[0m - \x1b[33m${os.arch()}\x1b[0m`);
const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
console.log(`💾 \x1b[33mTotal RAM: ${ramInGB.toFixed(2)} GB\x1b[0m`);
const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
console.log(`💽 \x1b[33mFree RAM: ${freeRamInGB.toFixed(2)} GB\x1b[0m`);
console.log('\x1b[33m%s\x1b[0m', `📃 Script by BOTCAHX`);
}
start("main.js");
