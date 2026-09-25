// ============================================================
// routes/enquiry.js — POST /api/send-enquiry-email
// Sends enquiry confirmation to the customer + alert to admin.
// ============================================================

import express from 'express';
import { sendBrevoEmail } from '../lib/brevo.js';
import { buildEnquiryCustomerHtml, buildEnquiryAdminAlertHtml } from '../lib/templates.js';

const router = express.Router();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ganeshthummala48@gmail.com';

/**
 * POST /api/send-enquiry-email
 * Body: enquiry object (see emailService.js for shape)
 */
router.post('/send-enquiry-email', async (req, res) => {
  const enquiry = req.body;

  // Basic validation
  if (!enquiry || !enquiry.name || !enquiry.phone) {
    return res.status(400).json({
      error: 'Missing required enquiry fields: name, phone',
    });
  }

  const results = { customerEmail: null, adminEmail: null };

  // 1. Send confirmation to the CUSTOMER (optional — only if email provided)
  if (enquiry.email) {
    try {
      await sendBrevoEmail({
        to:          enquiry.email,
        toName:      enquiry.name || 'Customer',
        subject:     `✅ Enquiry Received — Vela Shootz`,
        htmlContent: buildEnquiryCustomerHtml(enquiry),
      });
      results.customerEmail = { success: true };
      console.log('[Mailer] Enquiry confirmation sent to customer:', enquiry.email);
    } catch (err) {
      results.customerEmail = { success: false, error: err.message };
      console.warn('[Mailer] Customer enquiry email failed:', err.message);
    }
  }

  // 2. Always send NEW ENQUIRY alert to the ADMIN
  try {
    await sendBrevoEmail({
      to:          ADMIN_EMAIL,
      toName:      'Vela Shootz Admin',
      subject:     `📩 New Enquiry: ${enquiry.name} — ${enquiry.event_type || 'Custom'}`,
      htmlContent: buildEnquiryAdminAlertHtml(enquiry),
    });
    results.adminEmail = { success: true };
    console.log('[Mailer] Admin enquiry alert sent to:', ADMIN_EMAIL);
  } catch (err) {
    results.adminEmail = { success: false, error: err.message };
    console.warn('[Mailer] Admin enquiry email failed:', err.message);
  }

  return res.status(200).json({ ok: true, results });
});

export default router;
