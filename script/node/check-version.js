const nodeVersion = parseInt(process.versions.node.split('.')[0]);

if (nodeVersion < 22) {
    console.error(`\x1b[31m❌ INSTALLATION FAILED!\x1b[0m`);
    console.error(`\x1b[31mYour Node.js version is ${process.version}. This bot requires Node.js v22 or higher.\x1b[0m`);
    console.error(`\x1b[33mPlease upgrade your Node.js to v22+ and try running 'npm install' again.\x1b[0m\n`);
    process.exit(1); // Fails the npm install process
}

// If version is >= 22, script exits with 0 silently and npm install proceeds normally.
