<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# अंकिमा - Antima

Compassionate, AI-powered post-death ritual support and ceremony assistant for Indian families. Built with Vite, React, Express, Tailwind CSS, Twilio, and Firebase.

## 🚀 Features

- **AI Ritual Guidance**: Compassionate step-by-step ceremony planning and traditions guidance.
- **Smart Notification System**: Manual contact notification flow via SMS, WhatsApp, and voice calling powered by Twilio.
- **Support Marketplace**: Access verified local funeral services, vehicles, and priests.
- **Secure Records**: Store ceremony details securely using Cloud Firestore.

## 🛠️ Tech Stack & Assets Structure

- **Client**: React 19, Vite 6, Tailwind CSS 4, Framer Motion
- **Server**: Express, Node.js, esbuild
- **AI Engine**: Gemini SDK (`@google/genai`)
- **Communications**: Twilio SDK for voice calling
- **Assets**: Static images are placed in the `public/assets/images/` directory so they are perfectly served in both development (Vite dev server) and production builds (copied to `dist/assets/images/`).

## 💻 Run Locally

### Prerequisites
- Node.js (v18+)
- Active Twilio account (optional for simulation)
- Gemini API Key

### Steps
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
   Add your keys:
   - `GEMINI_API_KEY`
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📦 Production Build & Deploy

To build the client and package the server for production:
```bash
npm run build
```
This will compile the SPA to `dist/` and bundle the Node.js server into `dist/server.cjs`.

To run the production bundle:
```bash
npm run start
```
