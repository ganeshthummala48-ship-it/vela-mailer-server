// ============================================================
// routes/jira.js — JiraCraft Enterprise Mailer Endpoints
// Handles official work assignment and developer onboarding emails.
// ============================================================

import express from 'express';
import { sendBrevoEmail } from '../lib/brevo.js';
import {
  buildAssignmentEmailHtml,
  buildMemberWelcomeEmailHtml,
} from '../lib/templates.js';

const router = express.Router();

/**
 * POST /api/send-assignment-email
 * Triggered whenever a developer / employee is assigned or reassigned to a work item.
 */
router.post('/send-assignment-email', async (req, res) => {
  try {
    const {
      to,
      toName,
      empId,
      issueKey,
      summary,
      issueType = 'story',
      priority = 'medium',
      points = null,
      epicName = null,
      sprintName = null,
      status = 'to-do',
      description = '',
      acceptanceCriteria = [],
      assignedBy = 'Sarah Connor (Scrum Master)',
      projectKey = 'PAY',
      projectName = 'PayFlow - Mobile Wallet & Checkout',
      dashboardUrl = 'http://localhost:3000',
    } = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Recipient email ("to") is required.' });
    }
    if (!issueKey || !summary) {
      return res.status(400).json({ error: 'Issue key and summary are required.' });
    }

    const subject = `[JiraCraft] Work Assigned: [${issueKey}] ${summary}`;
    const htmlContent = buildAssignmentEmailHtml({
      toName: toName || to,
      empId,
      issueKey,
      summary,
      issueType,
      priority,
      points,
      epicName,
      sprintName,
      status,
      description,
      acceptanceCriteria,
      assignedBy,
      projectKey,
      projectName,
      dashboardUrl,
    });

    console.log(`[Mailer] Dispatching assignment email for ${issueKey} to ${toName || to} <${to}>...`);

    let brevoResult = null;
    let fallbackMode = false;

    try {
      brevoResult = await sendBrevoEmail({
        to,
        toName: toName || to,
        subject,
        htmlContent,
      });
      console.log(`[Mailer] ✅ Successfully dispatched via Brevo (MessageId: ${brevoResult.messageId})`);
    } catch (brevoErr) {
      console.warn(`[Mailer] ⚠️ Brevo API call issue: ${brevoErr.message}`);
      // If Brevo has quota or auth restriction on testing domains, return structured info
      fallbackMode = true;
    }

    return res.status(200).json({
      success: true,
      delivered: !fallbackMode,
      provider: fallbackMode ? 'simulated-fallback' : 'brevo',
      messageId: brevoResult?.messageId || `sim_${Date.now()}`,
      sentTo: to,
      recipientName: toName || to,
      issueKey,
      summary,
      timestamp: new Date().toISOString(),
      note: fallbackMode
        ? 'Brevo returned an error or quota alert; simulated delivery logged for development.'
        : 'Official transactional email delivered via Brevo API.',
    });
  } catch (error) {
    console.error('[Mailer Error] Assignment email failure:', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch assignment email.' });
  }
});

/**
 * POST /api/send-member-welcome-email
 * Triggered when a new developer / team member is registered in the workspace.
 */
router.post('/send-member-welcome-email', async (req, res) => {
  try {
    const {
      to,
      toName,
      empId,
      role = 'DevOps Engineer',
      projectKey = 'PAY',
      projectName = 'PayFlow - Mobile Wallet & Checkout',
      leadName = 'Sarah Connor (Scrum Master)',
      assignedIssue = null,
      dashboardUrl = 'http://localhost:3000',
    } = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Recipient email ("to") is required.' });
    }

    const subject = `[JiraCraft] Welcome to ${projectName} Team!`;
    const htmlContent = buildMemberWelcomeEmailHtml({
      toName: toName || to,
      empId,
      email: to,
      role,
      projectKey,
      projectName,
      leadName,
      assignedIssue,
      dashboardUrl,
    });

    console.log(`[Mailer] Dispatching welcome email to ${toName || to} <${to}>...`);

    let brevoResult = null;
    let fallbackMode = false;

    try {
      brevoResult = await sendBrevoEmail({
        to,
        toName: toName || to,
        subject,
        htmlContent,
      });
      console.log(`[Mailer] ✅ Successfully dispatched welcome email (MessageId: ${brevoResult.messageId})`);
    } catch (brevoErr) {
      console.warn(`[Mailer] ⚠️ Brevo API call issue: ${brevoErr.message}`);
      fallbackMode = true;
    }

    return res.status(200).json({
      success: true,
      delivered: !fallbackMode,
      provider: fallbackMode ? 'simulated-fallback' : 'brevo',
      messageId: brevoResult?.messageId || `sim_${Date.now()}`,
      sentTo: to,
      recipientName: toName || to,
      role,
      timestamp: new Date().toISOString(),
      note: fallbackMode
        ? 'Brevo alert; simulated delivery logged for development.'
        : 'Official onboarding email delivered via Brevo API.',
    });
  } catch (error) {
    console.error('[Mailer Error] Welcome email failure:', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch welcome email.' });
  }
});

/**
 * POST /api/send-test-email
 * Quick diagnostic endpoint to verify mail server delivery.
 */
router.post('/send-test-email', async (req, res) => {
  try {
    const { to = 'ganeshthummala48@gmail.com', toName = 'DevOps Admin' } = req.body;

    const subject = `[JiraCraft] Mail Server Diagnostic Test - ${new Date().toLocaleTimeString()}`;
    const htmlContent = `
      <div style="font-family:sans-serif;padding:24px;background:#f4f5f7;">
        <div style="max-width:500px;margin:0 auto;background:#fff;padding:24px;border-radius:8px;border:1px solid #dfe1e6;">
          <h2 style="color:#0052cc;margin-top:0;">⚡ JiraCraft Mail Server Diagnostic</h2>
          <p>This confirms that your <strong>vela-mailer-server</strong> is properly configured and successfully transmitting emails for JiraCraft.</p>
          <ul style="color:#5e6c84;font-size:13px;">
            <li>Status: Connected & Operational</li>
            <li>Sender: ${process.env.SENDER_NAME || 'JiraCraft DevOps Platform'} &lt;${process.env.SENDER_EMAIL || 'ganeshthummala000@gmail.com'}&gt;</li>
            <li>Timestamp: ${new Date().toISOString()}</li>
          </ul>
        </div>
      </div>
    `;

    const result = await sendBrevoEmail({
      to,
      toName,
      subject,
      htmlContent,
    });

    return res.status(200).json({
      success: true,
      delivered: true,
      messageId: result.messageId,
      sentTo: to,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/mailer-info
 * Returns server health and configuration metadata.
 */
router.get('/mailer-info', (_req, res) => {
  res.json({
    status: 'online',
    service: 'JiraCraft Enterprise Mailer',
    senderEmail: process.env.SENDER_EMAIL || 'ganeshthummala000@gmail.com',
    senderName: process.env.SENDER_NAME || 'JiraCraft DevOps Platform',
    brevoKeyConfigured: Boolean(process.env.BREVO_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

export default router;
