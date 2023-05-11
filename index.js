const http = require('http');
const port = 3000; //according to your port requirements
const server = http.createServer();
console.log('\x1b[32m%s\x1b[0m', `✅ Please Wait... Port ${port} is open`);
server.listen(port);

cluster = require("cluster");
const { 
  spawn
} = require("child_process");
const path = require("path");
const fs = require("fs");
const package = require("./package.json");

let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;
  const args = [path.join(__dirname, file), ...process.argv.slice(2)];
  const p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });
  p.on("message", (data) => {
    console.log('\x1b[36m%s\x1b[0m', `✅ RECEIVED ${data}`);
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

  // Find folder plugins
  const pluginsFolder = path.join(__dirname, "plugins");
  fs.readdir(pluginsFolder, (err, files) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', `Error reading plugins folder: ${err}`);
      return;
    }
    console.log('\x1b[32m%s\x1b[0m', `✅ Found ${files.length} plugins in folder ${pluginsFolder}`);
    // Add code here to process each plugin
  });
}

start("main.js");
