import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dirname, 'plugins');
const files = readdirSync(dir).filter((f) => f.endsWith('.ts'));

let failed = 0;
const commands = new Map<string, string[]>();

for (const file of files) {
  const src = readFileSync(join(dir, file), 'utf8');
  const isSideEffect = /\bsetInterval\(|^\s*[a-zA-Z]+\(\);\s*$/m.test(src);
  if (isSideEffect) continue;

  const hasHandler =
    /handler\s*[:=]/.test(src) ||
    /exports\.[a-zA-Z]+\s*=[^=]/.test(src) ||
    /export default/.test(src);
  if (!hasHandler) {
    console.error(`✗ ${file}: no handler declaration`);
    failed++;
    continue;
  }

  const hasTrigger =
    /(?:handler|exports)\.(?:command|before|all|customPrefix)\s*=/.test(src) ||
    /handler\[/.test(src) ||
    /(?:^|\n)\s*(?:command|before|all|customPrefix)\s*:/.test(src) ||
    /(?:^|\n)\s*(?:async\s+)?(?:function\s+)?(?:before|all)\s*\(/.test(src) ||
    /export default\s*(?:Object\.assign\s*\(\s*)?(?:async\s+)?function/.test(src);
  if (!hasTrigger) {
    console.error(`✗ ${file}: handler without command/before/all/customPrefix`);
    failed++;
  }

  const cmdBlock = src.match(/(?:handler|exports)\.command\s*=\s*(\[[\s\S]*?\]|'[^']*'|"[^"]*"|\/[\s\S]*?\/[a-z]*)/);
  if (cmdBlock) {
    const raw = cmdBlock[1];
    const names = raw.startsWith('[')
      ? [...raw.matchAll(/'([^']*)'|"([^"]*)"/g)].map((m) => m[1] || m[2])
      : raw.startsWith('/')
        ? [raw]
        : [raw.replace(/^['"]|['"]$/g, '')];
    for (const name of names) {
      if (!name) continue;
      if (!commands.has(name)) commands.set(name, []);
      commands.get(name)!.push(file);
    }
  }
}

for (const [cmd, owners] of commands) {
  if (owners.length > 1) {
    console.error(`✗ duplicate command "${cmd}": ${owners.join(', ')}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} issues found in ${files.length} plugins.`);
  process.exit(1);
}
console.log(`✓ ${files.length} plugins valid, ${commands.size} unique commands.`);