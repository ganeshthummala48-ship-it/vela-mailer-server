// ============================================================
// lib/brevo.js — Brevo SMTP API wrapper
// All email sends go through this single function.
// ============================================================

import dns from 'node:dns';
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (_) {}

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

/**
 * Send a transactional email via Brevo's SMTP API.
 *
 * @param {object} opts
 * @param {string} opts.to          - Recipient email address
 * @param {string} opts.toName      - Recipient display name
 * @param {string} opts.subject     - Email subject line
 * @param {string} opts.htmlContent - Full HTML email body
 * @returns {Promise<object>}       - Brevo API response JSON
 * @throws {Error}                  - If Brevo returns a non-2xx status
 */
export async function sendBrevoEmail({ to, toName, subject, htmlContent }) {
  const apiKey  = process.env.BREVO_API_KEY;
  const sender  = {
    name:  process.env.SENDER_NAME  || 'Vela Shootz',
    email: process.env.SENDER_EMAIL || 'ganeshthummala000@gmail.com',
  };

  if (!apiKey) throw new Error('BREVO_API_KEY is not set in environment variables.');

  const payload = {
    sender,
    to: [{ email: to, name: toName || to }],
    subject,
    htmlContent,
  };

  const response = await fetch(BREVO_API_URL, {
    method:  'POST',
    headers: {
      'api-key':      apiKey,
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Brevo API error (${response.status}): ${errText}`);
  }

  return response.json();
}
