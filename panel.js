require('child_process').spawn('bash', [], {
  stdio: ['inherit', 'inherit', 'inherit', 'ipc']
})
