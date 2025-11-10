/**
 * sample_client.js
 * Simple Node script to create a payment and then fulfill it.
 * Requires Node 18+ (built-in fetch)
 */

const base = process.env.BASE || 'http://localhost:3000';

async function createPayment(amount = 9.99) {
  const res = await fetch(base + '/payments/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency: 'USD', description: 'Demo API usage' })
  });
  console.log('create status ->', res.status);
  const body = await res.json();
  console.log('create body ->', body);
  return body.payment && body.payment.id;
}

async function fulfillPayment(id) {
  const res = await fetch(base + `/payments/${id}/fulfill`, { method: 'POST' });
  console.log('fulfill status ->', res.status, await res.json());
}

async function status(id) {
  const res = await fetch(base + `/payments/${id}`);
  console.log('status ->', await res.json());
}

(async () => {
  try {
    const id = await createPayment(12.5);
    if (!id) return;
    console.log('Payment id:', id);

    // simulate a short wait before fulfilling
    await new Promise(r => setTimeout(r, 2000));
    await fulfillPayment(id);
    await status(id);
  } catch (err) {
    console.error(err);
  }
})();
