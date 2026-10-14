// ============================================================
// server.js — Vela Mailer Server (Express)
// Middleware server that proxies email sending via Brevo API.
// Your Vela Shootz frontend calls this instead of Brevo directly,
// keeping the API key safe on the server.
//
// Endpoints:
//   GET  /health                   → Server health check
//   POST /api/send-booking-email   → Booking confirmation + admin alert
//   POST /api/send-enquiry-email   → Enquiry confirmation + admin alert
// ============================================================

import dns from 'node:dns';
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (_) {}

import 'dotenv/config'; // Load .env variables
import express from 'express';
import cors from 'cors';

import bookingRouter from './routes/booking.js';
import enquiryRouter from './routes/enquiry.js';
import jiraRouter from './routes/jira.js';

const app  = express();
const PORT = process.env.PORT || 3001;

// ── CORS ─────────────────────────────────────────────────────
// Parse ALLOWED_ORIGINS from env (comma-separated) or fall back
// to localhost defaults for local development.
const rawOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173';
const allowedOrigins = rawOrigins.split(',').map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, file://, server-to-server)
    if (!origin) return callback(null, true);
    // Allow if exact match
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow any localhost / 127.0.0.1 origins in development
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS: Origin "${origin}" is not allowed.`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '256kb' }));

// ── Health Check ──────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'JiraCraft Enterprise Mail Server',
    sender: process.env.SENDER_NAME || 'JiraCraft DevOps Platform',
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────────────
app.use('/api', jiraRouter);
app.use('/api', bookingRouter);
app.use('/api', enquiryRouter);

// ── 404 handler ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Global error handler ──────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 JiraCraft Mail Server running on http://localhost:${PORT}`);
  console.log(`   Health     : http://localhost:${PORT}/health`);
  console.log(`   Mailer Info: http://localhost:${PORT}/api/mailer-info`);
  console.log(`   Assignment : POST http://localhost:${PORT}/api/send-assignment-email`);
  console.log(`   Welcome    : POST http://localhost:${PORT}/api/send-member-welcome-email`);
  console.log(`   Test Email : POST http://localhost:${PORT}/api/send-test-email`);
  console.log(`   CORS       : ${allowedOrigins.join(', ')}\n`);
});
