let fs = require('fs')
let path = require('path')
let assert = require('assert')
let { spawn } = require('child_process')

const RESET = '\x1b[0m'
const BRIGHT = '\x1b[1m'
const DIM = '\x1b[2m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const BLUE = '\x1b[34m'

let folders = ['.', ...Object.keys(require('./package.json').directories)]
let files = []

for (let folder of folders) {
  for (let file of fs.readdirSync(folder).filter(v => v.endsWith('.js'))) {
    files.push(path.resolve(path.join(folder, file)))
  }
}

for (let file of files) {
  if (file == path.join(__dirname, __filename)) continue

  console.error(`${BRIGHT}${BLUE}Checking${RESET} ${file}`) // Highlight "Checking" in console logs with blue color
  spawn(process.argv0, ['-c', file])
    .on('close', () => {
      assert.ok(file)
      console.log(`${BRIGHT}${GREEN}Done${RESET} ${file} ${BRIGHT}${Math.floor(Math.random() * 100)}%${RESET}`)
    })
    .stderr.on('data', chunk => assert.ok(chunk.length < 1, `${RED}${DIM}${file}\n\n${chunk}${RESET}`)) 
}
