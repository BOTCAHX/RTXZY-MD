import cp from 'child_process';

const bsp = cp.spawn('bash', [], {
  stdio: ['inherit', 'inherit', 'inherit', 'ipc']
});
