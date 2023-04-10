console.log("Connecting sessions...");
var cluster = require("cluster");
var { 
spawn
 } = require("child_process");
var path = require("path");
var fs = require("fs");
var package = require("./package.json");

var isRunning = false;

function start(file) {
	if (isRunning) return;
	isRunning = true;
	var args = [path.join(__dirname, file), ...process.argv.slice(2)];
	var p = spawn(process.argv[0], args, {
		stdio: ["inherit", "inherit", "inherit", "ipc"],
	});
	p.on("message", (data) => {
		console.log("[✔️RECEIVED]", data);
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
		console.error("Exited with code:", code);
		if (code === 0) return;
		fs.watchFile(args[0], () => {
			fs.unwatchFile(args[0]);
			start("main.js");
		});
	});
	
}

start("main.js");
