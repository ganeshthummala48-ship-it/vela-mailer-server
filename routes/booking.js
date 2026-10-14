// ============================================================
// routes/booking.js — POST /api/send-booking-email
// Sends booking confirmation to the customer + alert to admin.
// ============================================================

import express from 'express';
import { sendBrevoEmail } from '../lib/brevo.js';
import { buildCustomerConfirmationHtml, buildAdminAlertHtml } from '../lib/templates.js';

const router = express.Router();
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'ganeshthummala48@gmail.com').trim();

/**
 * POST /api/send-booking-email
 * Body: booking object (see emailService.js for shape)
 */
router.post('/send-booking-email', async (req, res) => {
  const booking = req.body;

  // Basic validation
  if (!booking || !booking.customerName || !booking.packageName || !booking.date) {
    return res.status(400).json({
      error: 'Missing required booking fields: customerName, packageName, date',
    });
  }

  const results = { customerEmail: null, adminEmail: null };
  const customerEmail = typeof booking.email === 'string' ? booking.email.trim() : '';

  // 1. Send confirmation to the CUSTOMER (only if email provided)
  if (customerEmail) {
    try {
      await sendBrevoEmail({
        to:          customerEmail,
        toName:      booking.customerName || 'Customer',
        subject:     `✅ Booking Confirmed — Vela Shootz (${booking.bookingReference || 'VS-NEW'})`,
        htmlContent: buildCustomerConfirmationHtml(booking),
      });
      results.customerEmail = { success: true };
      console.log('[Mailer] Booking confirmation sent to customer:', customerEmail);
    } catch (err) {
      results.customerEmail = { success: false, error: err.message };
      console.error('[Mailer] Customer booking email failed:', err.message);
    }
  }

  // 2. Always send NEW BOOKING alert to the ADMIN
  try {
    await sendBrevoEmail({
      to:          ADMIN_EMAIL,
      toName:      'Vela Shootz Admin',
      subject:     `🎬 New Booking: ${booking.customerName} — ${booking.packageName} on ${booking.date}`,
      htmlContent: buildAdminAlertHtml(booking),
    });
    results.adminEmail = { success: true };
    console.log('[Mailer] Admin booking alert sent to:', ADMIN_EMAIL);
  } catch (err) {
    results.adminEmail = { success: false, error: err.message };
    console.error('[Mailer] Admin booking email failed:', err.message);
  }

  return res.status(200).json({ ok: true, results });
});

export default router;
