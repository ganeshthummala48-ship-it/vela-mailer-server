# 📧 Vela Mailer Server

Secure middleware email server for **Vela Shootz** — proxies transactional emails via the [Brevo](https://www.brevo.com/) API, keeping the API key safely on the server side instead of exposed in browser code.

## Live URL
```
https://vela-shortz-gky.vercel.app
```

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/health` | Server health check |
| `POST` | `/api/send-booking-email` | Booking confirmation (customer) + alert (admin) |
| `POST` | `/api/send-enquiry-email` | Enquiry confirmation (customer) + alert (admin) |

## Stack
- **Node.js** + **Express**
- Deployed on **Vercel** (serverless)
- Emails via **Brevo SMTP API**

## Local Development

```bash
# 1. Clone & install
git clone https://github.com/ganeshthummala48-ship-it/vela-mailer-server.git
cd vela-mailer-server
npm install

# 2. Set up env vars
cp .env.example .env
# Edit .env and fill in BREVO_API_KEY and other values

# 3. Run dev server
npm run dev
# → http://localhost:3001
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `BREVO_API_KEY` | Brevo API key (from app.brevo.com) |
| `SENDER_EMAIL` | Verified sender email in Brevo |
| `SENDER_NAME` | Display name for outgoing emails |
| `ADMIN_EMAIL` | Admin inbox for booking/enquiry alerts |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |
| `PORT` | Server port (local only, default: 3001) |

## Deploy to Vercel

```bash
vercel --prod
# Set env vars:
vercel env add BREVO_API_KEY production
vercel env add SENDER_EMAIL production
vercel env add SENDER_NAME production
vercel env add ADMIN_EMAIL production
vercel env add ALLOWED_ORIGINS production
# Redeploy to pick up env vars:
vercel --prod
```

## Frontend Integration

In your Vite frontend, set:
```env
VITE_MAILER_URL=https://vela-shortz-gky.vercel.app
```

The `emailService.js` will call this server automatically.
