/**
 * PAYLOOP x402 Payments API
 * Simple Express server demonstrating HTTP 402 flows
 */

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// In-memory store for payments
const payments = new Map();

app.get('/health', (req, res) => res.json({ ok: true, time: Date.now() }));

/**
 * POST /payments/create
 * Creates a payment request and returns HTTP 402 with payment metadata.
 */
app.post('/payments/create', (req, res) => {
  const { amount, currency = 'USD', description = '' } = req.body || {};
  if (!amount || isNaN(Number(amount))) {
    return res.status(400).json({ error: 'amount is required and must be a number' });
  }

  const id = 'pay_' + uuidv4();
  const record = {
    id,
    amount: Number(amount),
    currency,
    description,
    status: 'pending_payment',
    created_at: new Date().toISOString(),
    payment_url: `https://payloop.example/checkout/${id}`
  };

  payments.set(id, record);

  // Return 402 Payment Required with payment object
  return res.status(402).json({
    message: 'Payment Required',
    payment: record
  });
});

/**
 * GET /payments/:id
 * Fetch payment status
 */
app.get('/payments/:id', (req, res) => {
  const id = req.params.id;
  const record = payments.get(id);
  if (!record) return res.status(404).json({ error: 'not_found' });
  return res.json(record);
});

/**
 * POST /payments/:id/fulfill
 * Mark a payment as paid (fulfillment)
 */
app.post('/payments/:id/fulfill', (req, res) => {
  const id = req.params.id;
  const record = payments.get(id);
  if (!record) return res.status(404).json({ error: 'not_found' });
  if (record.status === 'paid') return res.status(400).json({ error: 'already_paid' });

  record.status = 'paid';
  record.paid_at = new Date().toISOString();
  payments.set(id, record);

  // In a production system, add verification and notifications here
  return res.json({ ok: true, payment: record });
});

/**
 * GET /protected/resource
 * Example protected endpoint. Use query ?paid=true to simulate access after payment.
 */
app.get('/protected/resource', (req, res) => {
  const paid = req.query.paid === 'true';
  if (!paid) {
    return res.status(402).json({
      error: 'payment_required',
      message: 'Access to this resource requires payment. Create a payment at /payments/create',
      docs: '/openapi.yaml'
    });
  }
  return res.json({ secret: '🎉 you accessed a paid resource!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`PAYLOOP x402 API listening on http://localhost:${PORT}`);
});
