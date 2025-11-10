<h1 align="center">🌀 PAYLOOP x402 Payments API</h1>

<p align="center">
  <b>Real-time on-chain payments for APIs, apps, and AI agents — powered by the HTTP 402 Payment Required standard.</b>
</p>

<p align="center">
  <a href="https://github.com/<your-username>/payloop-x402-api/actions"><img src="https://img.shields.io/github/actions/workflow/status/<your-username>/payloop-x402-api/ci.yml?branch=main&label=build" alt="Build Status"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-green" alt="Node.js">
  <img src="https://img.shields.io/badge/status-active-success" alt="Project Status">
</p>

---

## 📘 Table of Contents

1. [Overview](#-overview)
2. [Why x402](#-why-x402)
3. [Features](#-features)
4. [Tech Stack](#-tech-stack)
5. [Architecture Diagram](#-architecture-diagram)
6. [API Endpoints](#-api-endpoints)
7. [Example Usage](#-example-usage)
8. [Integration Scenarios](#-integration-scenarios)
9. [Developer Setup](#-developer-setup)
10. [OpenAPI Specification](#-openapi-specification)
11. [Example Client](#-example-client)
12. [Security Considerations](#-security-considerations)
13. [Future Roadmap](#-future-roadmap)
14. [Ecosystem](#-ecosystem)
15. [Contributing](#-contributing)
16. [License](#-license)
17. [Legal Notice](#-legal-notice)
18. [Support](#-support)

---

## 🚀 Overview

The **PAYLOOP x402 Payments API** is a next-generation infrastructure for **monetizing APIs and digital resources** using the HTTP `402 Payment Required` standard.  
It allows APIs, applications, and AI agents to exchange value **directly and instantly**, without third-party payment gateways or platform friction.

With PAYLOOP, developers can:
- Gate API endpoints behind **verified payments**
- Handle **real-time transaction fulfillment**
- Create **automated, on-chain payment flows**
- Build **AI agents that can pay other APIs**

PAYLOOP transforms the web into an **economically aware layer**, where every resource can be priced, billed, and accessed seamlessly.

---

## 💡 Why x402?

The `402 Payment Required` status code was part of the original HTTP specification — designed for digital payments that never materialized... until now.

PAYLOOP revives that vision by defining **x402**, a modern payment flow that extends HTTP semantics to handle real-time, verifiable transactions.  
Instead of returning “Access Denied” or “Unauthorized”, your API can now return a structured `402` response containing payment details, settlement URLs, and retry logic.

Example Response:
```http
HTTP/1.1 402 Payment Required
Content-Type: application/json
{
  "message": "Payment Required",
  "payment": {
    "id": "pay_32e5c7c9-102f",
    "amount": 0.0003,
    "currency": "USDC",
    "status": "pending_payment",
    "payment_url": "https://payloop.io/checkout/pay_32e5c7c9-102f"
  }
}
⚙️ Features

✅ x402-native architecture — built directly on the HTTP 402 standard
✅ Real-time payment verification — plug in on-chain or off-chain systems
✅ Lightweight REST API — works out of the box with any backend
✅ Event-driven fulfillment — callbacks and post-payment actions
✅ OpenAPI schema — compatible with Swagger, Postman, and SDK generators
✅ Docker + CI ready — production-grade workflow and container setup
✅ Developer-first design — easy to extend, test, and self-host

🧰 Tech Stack
Layer	Technology
Language	Node.js (Express)
Protocol	HTTP 402 + JSON
Payment Logic	x402 Standard
Data Store	In-memory (demo)
API Spec	OpenAPI 3.0
Containerization	Docker
CI/CD	GitHub Actions
🧭 Architecture Diagram
+-------------------+      +----------------------+
|   Client / Agent  | ---> | PAYLOOP x402 API     |
|                   |      |                      |
| Requests Resource | ---> | /payments/create     |
|                   | <--- | HTTP 402 + metadata  |
+-------------------+      +----------------------+
           |                         |
           |   Payment Settlement     |
           v                         |
     +---------------+               |
     | Blockchain /  |               |
     | Payment Rail  |---------------+
     +---------------+

📡 API Endpoints
Method	Endpoint	Description
POST	/payments/create	Creates a new payment request. Returns HTTP 402 if payment required.
GET	/payments/:id	Fetches the current payment status.
POST	/payments/:id/fulfill	Confirms and finalizes payment fulfillment.
GET	/protected/resource	Example endpoint that enforces payment validation.
GET	/health	System health check.
🧑‍💻 Example Usage
1️⃣ Create a Payment
curl -X POST http://localhost:3000/payments/create \
  -H "Content-Type: application/json" \
  -d '{"amount":10.5,"currency":"USD","description":"API access"}'


Response:

{
  "message": "Payment Required",
  "payment": {
    "id": "pay_12acb9",
    "amount": 10.5,
    "currency": "USD",
    "status": "pending_payment",
    "payment_url": "https://payloop.example/checkout/pay_12acb9"
  }
}

2️⃣ Fulfill the Payment
curl -X POST http://localhost:3000/payments/pay_12acb9/fulfill


Response:

{
  "ok": true,
  "payment": {
    "id": "pay_12acb9",
    "status": "paid",
    "paid_at": "2025-11-11T07:00:00.000Z"
  }
}

3️⃣ Access a Paid Resource
curl "http://localhost:3000/protected/resource?paid=true"


Response:

{
  "secret": "🎉 you accessed a paid resource!",
  "timestamp": "2025-11-11T07:05:00.000Z"
}

🧩 Integration Scenarios
Use Case	Description
API Monetization	Charge per API call, dataset, or feature access.
AI Agent Billing	Let autonomous agents handle payments programmatically.
Decentralized APIs	Replace API keys with cryptographic payment proofs.
Streaming Data	Pay-per-second or pay-per-byte API usage.
Serverless Functions	Gate expensive executions behind micropayments.
🧱 Developer Setup
1️⃣ Clone & Install
git clone https://github.com/<your-username>/payloop-x402-api.git
cd payloop-x402-api
npm install

2️⃣ Run Locally
npm start


Server runs at http://localhost:3000

3️⃣ Run Tests
npm test

4️⃣ Docker Deployment
docker build -t payloop-x402-api .
docker run -p 3000:3000 payloop-x402-api

📜 OpenAPI Specification

The API is fully documented in openapi.yaml
, compliant with OpenAPI 3.0.

Generate SDKs using:

npx openapi-generator-cli generate -i openapi.yaml -g javascript -o ./sdk

🧪 Example Client (Node.js)
const base = 'http://localhost:3000';

(async () => {
  const res = await fetch(base + '/payments/create', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({amount: 2.99, currency: 'USD'})
  });
  const body = await res.json();
  console.log(body);
})();

🔐 Security Considerations

Add JWT or OAuth2 authentication for private APIs.

Use signature-based callbacks for verifying fulfillment events.

Integrate on-chain payment verification (e.g., Ethereum, Solana, USDC).

Enable rate limiting and webhook validation in production.

🛣 Future Roadmap
Version	Focus	Status
v0.1	Local demo API	✅ Released
v0.2	Blockchain integration layer	🚧 In progress
v0.3	Subscriptions & recurring payments	⏳ Planned
v0.4	PAYLOOP Dashboard	⏳ Planned
v1.0	Production-grade launch	🔜 Coming soon
🌍 Ecosystem
Component	Description
PAYLOOP Core	The x402 API service.
PAYLOOP SDK	Client-side SDK for integrating payments.
PAYLOOP Checkout	Web checkout interface for payment completion.
PAYLOOP Node Network	Peer-to-peer validation network (coming soon).
🧑‍🤝‍🧑 Contributing

We welcome developers, builders, and cryptographers to contribute.

Steps:

Fork the repository

Create a new branch (feature/add-webhooks)

Commit your changes

Submit a Pull Request

All contributions must follow conventional commits and include at least one test.

📜 License

Licensed under the MIT License
.
You’re free to use, modify, and distribute this software with attribution.

💬 Support

📘 Docs: docs.payloop.io (coming soon)

🐙 GitHub Issues: Open an Issue

💌 Email: support@payloop.io

🧵 Twitter: @PayloopHQ
