const __dirname = import.meta.dirname;
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import cluster from 'cluster';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import http from 'http';

const nodeVersion = parseInt(process.versions.node.split('.')[0]);
if (nodeVersion < 22) {
  console.error(`\x1b[31m❌ Node.js ${nodeVersion} is not supported. Please use Node.js 22 or higher.\x1b[0m`);
  process.exit(1);
}

// HTTP Server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-Type', 'application/json');
    const data = {
      status: 'true',
      message: 'Bot Successfully Activated!',
      author: 'BOTCAHX'
    };
    res.writeHead(200);
    res.end(JSON.stringify({ response: data }, null, 2));
  } else {
    res.writeHead(404);
    res.end();
  }
});

function listenOnPort(port) {
  server.once('error', (e) => {
    if (e.code === 'EADDRINUSE' && port !== 0) {
      console.warn(`Port ${port} iport sudah dipakai, mencoba port random lain`);
      listenOnPort(0);
      return;
    }

    console.error('gagal:', e);
    process.exit(1);
  });

  server.listen(port, '0.0.0.0', () => {
    const actualPort = server.address().port;
    console.log('\x1b[33m%s\x1b[0m', `Port ${actualPort} is open`);
  });
}

listenOnPort(Number(process.env.PORT) || 0);

let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  const resolvedFile = path.resolve(__dirname, path.basename(file));
  if (!resolvedFile.startsWith(path.resolve(__dirname) + path.sep)) {
    throw new Error('Invalid file path');
  }
  const args = [resolvedFile, ...process.argv.slice(2)];
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
    start('main.js');

    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
	  console.error('\x1b[31m%s\x1b[0m', `File ${args[0]} has been modified. Script will restart...`);
      start("main.js");
    });
  });

  p.on("error", (err) => {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${err}`);
    p.kill();
    isRunning = false;
    console.error('\x1b[31m%s\x1b[0m', `Error occurred. Script will restart...`);
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
      require.resolve('@whiskeysockets/baileys');
      console.log('\x1b[33m%s\x1b[0m', `🟡 Baileys library version ${require('@whiskeysockets/baileys/package.json').version} is installed`);
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
  console.log('\x1b[33m%s\x1b[0m', `🔗 Github: https://github.com/BOTCAHX/RTXZY-MD`);	

  setInterval(() => {}, 1000);
}

start("main.js");

const tmpDir = './tmp';
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
    console.log('\x1b[33m%s\x1b[0m', `📁 Created directory ${tmpDir}`);
}

process.on('unhandledRejection', (reason) => {
  console.error('\x1b[31m%s\x1b[0m', `Unhandled promise rejection: ${reason}`);
  console.error('\x1b[31m%s\x1b[0m', 'Unhandled promise rejection. Script will restart...');
  start('main.js');
});

process.on('exit', (code) => {
  console.error(`Exited with code: ${code}`);
  console.error('Script will restart...');
  start('main.js');
});
