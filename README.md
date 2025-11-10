PAYLOOP x402 Payments API

PAYLOOP provides an advanced x402-native payment infrastructure, enabling real-time on-chain payments for APIs, apps, and AI agents.
Built on the HTTP 402 Payment Required standard, PAYLOOP allows developers to seamlessly integrate direct payment flows into their software — unlocking new monetization models for the decentralized web.

🔹 Why PAYLOOP

x402-Native Infrastructure – Native support for HTTP 402 responses and payment verification.

Real-Time Transactions – Settle API and app usage instantly with on-chain transparency.

Developer-First Design – Simple REST endpoints and SDK-ready response formats.

Scalable Monetization – Monetize any digital resource, from API calls to AI model access.

⚙️ Key Endpoints
Method	Endpoint	Description
POST	/payments/create	Create a new payment request.
GET	/payments/:id	Retrieve the status of a payment.
POST	/payments/:id/fulfill	Confirm and finalize payment fulfillment.
GET	/protected/resource	Access a 402-gated resource after payment verification.
GET	/health	Health check endpoint.
🚀 Quick Start
git clone https://github.com/<your-username>/payloop-x402-api
cd payloop-x402-api
npm install
npm start


Server runs at http://localhost:3000.

📄 License

Released under the MIT License.
