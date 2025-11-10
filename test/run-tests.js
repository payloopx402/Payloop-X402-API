// Basic smoke test that spins the server and checks /payments/create returns 402
const assert = require('assert');
const fetch = require('node:fetch');
const child = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srv = child.spawn('node', ['server.js'], { cwd: repoRoot, stdio: ['ignore', 'pipe', 'pipe'] });

let started = false;
srv.stdout.on('data', d => {
  const s = d.toString();
  process.stdout.write(s);
  if (s.includes('listening')) started = true;
});

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  for (let i = 0; i < 20; i++) {
    if (started) break;
    await wait(200);
  }
  if (!started) {
    console.error('Server did not start in time');
    process.exit(2);
  }

  try {
    const base = 'http://localhost:3000';
    const create = await fetch(base + '/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1 })
    });
    assert.equal(create.status, 402, 'expected 402 from create');

    const body = await create.json();
    assert(body.payment && body.payment.id, 'create must return payment id');

    console.log('smoke tests passed');
    srv.kill();
    process.exit(0);
  } catch (err) {
    console.error(err);
    srv.kill();
    process.exit(1);
  }
})();
