// ============================================================
// lib/templates.js — HTML email templates for Vela Shootz
// All templates return a complete HTML string ready to send.
// ============================================================

const ADMIN_EMAIL   = process.env.ADMIN_EMAIL || 'ganeshthummala48@gmail.com';
const CONTACT_PHONE = process.env.CONTACT_PHONE || '+91 89782 70208';
const YEAR          = new Date().getFullYear();

/* ─── Shared styles ─────────────────────────────────────── */
const BASE_BODY   = 'margin:0;padding:0;background:#0D0208;font-family:\'Segoe UI\',Arial,sans-serif;';
const BASE_WRAP   = 'max-width:600px;margin:0 auto;background:linear-gradient(180deg,#1A0A10 0%,#0D0208 100%);border:1px solid rgba(229,173,54,0.25);border-radius:16px;overflow:hidden;';
const GOLD_HEADER = 'background:linear-gradient(135deg,#E5AD36 0%,#F7CA64 50%,#E5AD36 100%);padding:28px 32px;text-align:center;';

/* ─── Booking Confirmation (Customer) ───────────────────── */
export function buildCustomerConfirmationHtml(booking) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="${BASE_BODY}">
  <div style="${BASE_WRAP}">

    <!-- Header -->
    <div style="${GOLD_HEADER}">
      <h1 style="margin:0;font-size:28px;font-weight:900;color:#1A0008;letter-spacing:1px;">VELA SHOOTZ</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#1A0008;opacity:0.8;letter-spacing:2px;">PREMIUM IPHONE CINEMATOGRAPHY</p>
    </div>

    <!-- Success Badge -->
    <div style="text-align:center;padding:32px 24px 8px;">
      <div style="display:inline-block;background:rgba(46,204,113,0.15);border:2px solid #2ECC71;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;">&#10003;</div>
      <h2 style="color:#FFFFFF;font-size:24px;margin:16px 0 8px;font-weight:800;">Booking Confirmed!</h2>
      <p style="color:#B8A080;font-size:14px;margin:0 0 24px;line-height:1.6;">
        Hey <strong style="color:#FFF;">${booking.customerName}</strong>, your shoot slot has been locked! Here are your booking details:
      </p>
    </div>

    <!-- Booking Details Card -->
    <div style="margin:0 24px 24px;background:rgba(229,173,54,0.06);border:1px solid rgba(229,173,54,0.2);border-radius:12px;padding:24px;">

      <!-- Reference ID -->
      <div style="text-align:center;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(229,173,54,0.15);">
        <div style="font-size:11px;color:#8B7355;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Booking Reference</div>
        <div style="font-size:28px;font-weight:900;color:#E5AD36;letter-spacing:3px;font-family:'Courier New',monospace;">${booking.bookingReference || 'VS-NEW'}</div>
      </div>

      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:40%;">Client</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${booking.customerName}</td></tr>
        <tr><td style="padding:8px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Package</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${booking.packageName}</td></tr>
        <tr><td style="padding:8px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event Type</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${booking.eventType || 'Event Shoot'}</td></tr>
        <tr><td style="padding:8px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Date</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${booking.date}</td></tr>
        <tr><td style="padding:8px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Time Slot</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${booking.startTime}</td></tr>
        <tr><td style="padding:8px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Venue</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${booking.location}</td></tr>
        <tr><td style="padding:8px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Total Amount</td><td style="padding:8px 0;color:#2ECC71;font-size:16px;font-weight:800;">&#8377;${Number(booking.totalAmount || 0).toLocaleString('en-IN')}</td></tr>
      </table>
    </div>

    <!-- Next Steps -->
    <div style="margin:0 24px 24px;background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.2);border-radius:12px;padding:20px 24px;">
      <h3 style="color:#2ECC71;font-size:14px;margin:0 0 12px;font-weight:700;">What happens next?</h3>
      <ul style="color:#B8A080;font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
        <li>Our team will review your booking and reach out shortly</li>
        <li>You'll receive updates via WhatsApp and email</li>
        <li>Track your booking status anytime using your reference ID on our website</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 24px 28px;border-top:1px solid rgba(229,173,54,0.1);">
      <p style="color:#8B7355;font-size:12px;margin:0 0 8px;">Have questions? Reach us at</p>
      <p style="margin:0;">
        <a href="mailto:${ADMIN_EMAIL}" style="color:#E5AD36;text-decoration:none;font-size:13px;font-weight:600;">${ADMIN_EMAIL}</a>
        <span style="color:#4A3A2A;margin:0 8px;">|</span>
        <a href="tel:+918978270208" style="color:#E5AD36;text-decoration:none;font-size:13px;font-weight:600;">${CONTACT_PHONE}</a>
      </p>
      <p style="color:#4A3A2A;font-size:11px;margin:16px 0 0;">&copy; ${YEAR} Vela Shootz &middot; Premium iPhone Cinematography</p>
    </div>
  </div>
</body>
</html>`;
}

/* ─── New Booking Alert (Admin) ─────────────────────────── */
export function buildAdminAlertHtml(booking) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="${BASE_BODY}">
  <div style="${BASE_WRAP}">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#E5AD36 0%,#F7CA64 50%,#E5AD36 100%);padding:24px 32px;text-align:center;">
      <h1 style="margin:0;font-size:22px;font-weight:900;color:#1A0008;">NEW BOOKING ALERT</h1>
      <p style="margin:4px 0 0;font-size:12px;color:#1A0008;opacity:0.7;">Vela Shootz Studio Portal</p>
    </div>

    <!-- Booking Details -->
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);width:35%;">Ref ID</td><td style="padding:10px 0;color:#E5AD36;font-size:16px;font-weight:900;border-bottom:1px solid rgba(229,173,54,0.1);font-family:'Courier New',monospace;">${booking.bookingReference || 'VS-NEW'}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Client Name</td><td style="padding:10px 0;color:#FFF;font-size:14px;font-weight:600;border-bottom:1px solid rgba(229,173,54,0.1);">${booking.customerName}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Phone</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${booking.phone}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Email</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${booking.email || 'N/A'}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Package</td><td style="padding:10px 0;color:#FFF;font-size:14px;font-weight:600;border-bottom:1px solid rgba(229,173,54,0.1);">${booking.packageName}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Event</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${booking.eventType || 'Event Shoot'}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Date &amp; Time</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${booking.date} at ${booking.startTime}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Venue</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${booking.location}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Total</td><td style="padding:10px 0;color:#2ECC71;font-size:18px;font-weight:800;">&#8377;${Number(booking.totalAmount || 0).toLocaleString('en-IN')}</td></tr>
      </table>
      ${booking.requirements ? `<div style="margin-top:16px;background:rgba(229,173,54,0.06);border:1px solid rgba(229,173,54,0.15);border-radius:8px;padding:12px 16px;"><div style="font-size:11px;color:#8B7355;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Special Requirements</div><div style="color:#B8A080;font-size:13px;">${booking.requirements}</div></div>` : ''}
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:16px 24px 24px;border-top:1px solid rgba(229,173,54,0.1);">
      <p style="color:#8B7355;font-size:12px;margin:0;">Log in to the Studio Portal to assign crew and manage this booking.</p>
    </div>
  </div>
</body>
</html>`;
}

/* ─── Enquiry Confirmation (Customer) ───────────────────── */
export function buildEnquiryCustomerHtml(enquiry) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="${BASE_BODY}">
  <div style="${BASE_WRAP}">

    <!-- Header -->
    <div style="${GOLD_HEADER}">
      <h1 style="margin:0;font-size:28px;font-weight:900;color:#1A0008;letter-spacing:1px;">VELA SHOOTZ</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#1A0008;opacity:0.8;letter-spacing:2px;">PREMIUM IPHONE CINEMATOGRAPHY</p>
    </div>

    <!-- Success Badge -->
    <div style="text-align:center;padding:32px 24px 8px;">
      <div style="display:inline-block;background:rgba(46,204,113,0.15);border:2px solid #2ECC71;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;">&#10003;</div>
      <h2 style="color:#FFFFFF;font-size:24px;margin:16px 0 8px;font-weight:800;">Enquiry Received!</h2>
      <p style="color:#B8A080;font-size:14px;margin:0 0 24px;line-height:1.6;">
        Hey <strong style="color:#FFF;">${enquiry.name}</strong>, thanks for reaching out. We've received your custom package enquiry and our team will get back to you shortly!
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 24px 28px;border-top:1px solid rgba(229,173,54,0.1);">
      <p style="color:#8B7355;font-size:12px;margin:0 0 8px;">Have questions? Reach us at</p>
      <p style="margin:0;">
        <a href="mailto:${ADMIN_EMAIL}" style="color:#E5AD36;text-decoration:none;font-size:13px;font-weight:600;">${ADMIN_EMAIL}</a>
        <span style="color:#4A3A2A;margin:0 8px;">|</span>
        <a href="tel:+918978270208" style="color:#E5AD36;text-decoration:none;font-size:13px;font-weight:600;">${CONTACT_PHONE}</a>
      </p>
      <p style="color:#4A3A2A;font-size:11px;margin:16px 0 0;">&copy; ${YEAR} Vela Shootz &middot; Premium iPhone Cinematography</p>
    </div>
  </div>
</body>
</html>`;
}

/* ─── New Enquiry Alert (Admin) ─────────────────────────── */
export function buildEnquiryAdminAlertHtml(enquiry) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="${BASE_BODY}">
  <div style="${BASE_WRAP}">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#E5AD36 0%,#F7CA64 50%,#E5AD36 100%);padding:24px 32px;text-align:center;">
      <h1 style="margin:0;font-size:22px;font-weight:900;color:#1A0008;">NEW ENQUIRY ALERT</h1>
      <p style="margin:4px 0 0;font-size:12px;color:#1A0008;opacity:0.7;">Vela Shootz Studio Portal</p>
    </div>

    <!-- Enquiry Details -->
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);width:35%;">Client Name</td><td style="padding:10px 0;color:#FFF;font-size:14px;font-weight:600;border-bottom:1px solid rgba(229,173,54,0.1);">${enquiry.name}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Phone</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${enquiry.phone}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Email</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${enquiry.email || 'N/A'}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Event Type</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${enquiry.event_type || 'Custom Enquiry'}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Date</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${enquiry.event_date || 'TBD'}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Location</td><td style="padding:10px 0;color:#FFF;font-size:14px;border-bottom:1px solid rgba(229,173,54,0.1);">${enquiry.location}</td></tr>
        <tr><td style="padding:10px 0;color:#8B7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(229,173,54,0.1);">Budget</td><td style="padding:10px 0;color:#2ECC71;font-size:16px;font-weight:800;border-bottom:1px solid rgba(229,173,54,0.1);">${enquiry.budget_range}</td></tr>
      </table>
      ${enquiry.special_requirements ? `<div style="margin-top:16px;background:rgba(229,173,54,0.06);border:1px solid rgba(229,173,54,0.15);border-radius:8px;padding:12px 16px;"><div style="font-size:11px;color:#8B7355;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Special Requirements</div><div style="color:#B8A080;font-size:13px;">${enquiry.special_requirements}</div></div>` : ''}
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:16px 24px 24px;border-top:1px solid rgba(229,173,54,0.1);">
      <p style="color:#8B7355;font-size:12px;margin:0;">Log in to the Studio Portal to follow up on this enquiry.</p>
    </div>
  </div>
</body>
</html>`;
}

/* ─── JiraCraft Professional Agile Templates ─────────────── */

export function buildAssignmentEmailHtml(assignment) {
  const {
    toName = 'Team Member',
    empId = null,
    issueKey = 'PAY-101',
    summary = 'Assigned Work Item',
    issueType = 'story',
    priority = 'medium',
    points = null,
    epicName = null,
    sprintName = null,
    description = '',
    acceptanceCriteria = [],
    assignedBy = 'Scrum Master',
    projectName = 'PayFlow - Mobile Wallet & Checkout',
    projectKey = 'PAY',
    dashboardUrl = 'http://localhost:3000'
  } = assignment;

  const typeConfig = {
    story: { label: 'Story', icon: '📗', bg: '#E3FCEF', color: '#006644', border: '#ABF5D1' },
    bug:   { label: 'Bug',   icon: '🔴', bg: '#FFEBE6', color: '#BF2600', border: '#FFBDAD' },
    task:  { label: 'Task',  icon: '☑️', bg: '#DEEBFF', color: '#0747A6', border: '#B3D4FF' },
    epic:  { label: 'Epic',  icon: '⚡', bg: '#EAE6FF', color: '#403294', border: '#C0B6F2' }
  }[issueType ? issueType.toLowerCase() : 'story'] || { label: 'Issue', icon: '📌', bg: '#DEEBFF', color: '#0747A6', border: '#B3D4FF' };

  const priorityColors = {
    highest: { bg: '#FFEBE6', color: '#DE350B', icon: '▲▲' },
    high:    { bg: '#FFF0B3', color: '#FF7452', icon: '▲' },
    medium:  { bg: '#FFF0B3', color: '#FFAB00', icon: '▬' },
    low:     { bg: '#E3FCEF', color: '#36B37E', icon: '▼' }
  }[priority ? priority.toLowerCase() : 'medium'] || { bg: '#F4F5F7', color: '#5E6C84', icon: '▬' };

  const criteriaList = Array.isArray(acceptanceCriteria) ? acceptanceCriteria : (acceptanceCriteria ? [acceptanceCriteria] : []);
  const criteriaHtml = criteriaList.length > 0
    ? `
      <div style="margin-top:16px;padding:14px;background:#F7F8FA;border-left:4px solid #0052CC;border-radius:4px;">
        <div style="font-size:12px;font-weight:700;color:#172B4D;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
          ✓ Acceptance Criteria (Definition of Done)
        </div>
        <ul style="margin:0;padding-left:20px;color:#344563;font-size:13px;line-height:1.6;">
          ${criteriaList.map(c => `<li style="margin-bottom:4px;">${c}</li>`).join('')}
        </ul>
      </div>
    `
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Work Assigned: ${issueKey}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F5F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#172B4D;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F4F5F7;padding:32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:620px;background:#FFFFFF;border-radius:8px;border:1px solid #DFE1E6;box-shadow:0 2px 8px rgba(9,30,66,0.08);overflow:hidden;">
          
          <!-- Top Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0052CC 0%,#0747A6 100%);padding:22px 28px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display:inline-block;background:#FFFFFF;color:#0052CC;font-weight:900;font-size:18px;border-radius:6px;width:34px;height:34px;line-height:34px;text-align:center;margin-right:10px;vertical-align:middle;">
                      J
                    </div>
                    <span style="color:#FFFFFF;font-size:19px;font-weight:700;letter-spacing:0.5px;vertical-align:middle;">
                      JiraCraft <span style="font-size:12px;font-weight:400;opacity:0.85;padding-left:4px;">Agile DevOps</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="background:rgba(255,255,255,0.2);color:#FFFFFF;font-size:12px;font-weight:600;padding:4px 10px;border-radius:12px;">
                      ${projectKey}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notification Sub-Banner -->
          <tr>
            <td style="background:#EBF3FF;padding:12px 28px;border-bottom:1px solid #C1DCFF;">
              <span style="font-size:13px;color:#0747A6;font-weight:600;">
                🔔 Work Assigned Notification
              </span>
              <span style="font-size:12px;color:#42526E;margin-left:8px;">
                Assigned by <strong>${assignedBy}</strong>
              </span>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding:28px 28px 20px;">
              <p style="margin:0 0 16px;font-size:15px;color:#172B4D;line-height:1.5;">
                Hello <strong>${toName}</strong> ${empId ? `<span style="background:#DEEBFF;color:#0747A6;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;font-family:monospace;letter-spacing:0.5px;margin-left:4px;">${empId}</span>` : ''},
              </p>
              <p style="margin:0 0 20px;font-size:14px;color:#42526E;line-height:1.5;">
                You have been officially assigned to the following work item in project <strong>${projectName}</strong>:
              </p>

              <!-- Ticket Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#FAFBFC;border:1px solid #DFE1E6;border-radius:6px;padding:18px;margin-bottom:20px;">
                <tr>
                  <td>
                    <!-- Key & Badges -->
                    <div style="margin-bottom:10px;">
                      <span style="background:#0052CC;color:#FFFFFF;font-weight:800;font-size:13px;padding:3px 8px;border-radius:4px;font-family:monospace;letter-spacing:0.5px;">
                        ${issueKey}
                      </span>
                      <span style="background:${typeConfig.bg};color:${typeConfig.color};border:1px solid ${typeConfig.border};font-weight:700;font-size:12px;padding:2px 8px;border-radius:4px;margin-left:6px;">
                        ${typeConfig.icon} ${typeConfig.label}
                      </span>
                      <span style="background:${priorityColors.bg};color:${priorityColors.color};font-weight:700;font-size:12px;padding:2px 8px;border-radius:4px;margin-left:6px;">
                        ${priorityColors.icon} ${priority.toUpperCase()}
                      </span>
                      ${points !== null && points !== undefined ? `
                        <span style="background:#EAE6FF;color:#403294;font-weight:700;font-size:12px;padding:2px 8px;border-radius:12px;margin-left:6px;">
                          🎲 ${points} Points
                        </span>
                      ` : ''}
                    </div>

                    <!-- Summary -->
                    <h2 style="margin:0 0 12px;font-size:17px;font-weight:700;color:#172B4D;line-height:1.4;">
                      ${summary}
                    </h2>

                    <!-- Description -->
                    ${description ? `
                      <p style="margin:0 0 14px;font-size:13px;color:#42526E;line-height:1.6;">
                        ${description}
                      </p>
                    ` : ''}

                    <!-- Metadata Grid -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:12px;color:#5E6C84;border-top:1px solid #EBECF0;padding-top:12px;">
                      <tr>
                        <td width="50%" style="padding-bottom:6px;">
                          <strong style="color:#172B4D;">Sprint:</strong> ${sprintName || 'Product Backlog'}
                        </td>
                        <td width="50%" style="padding-bottom:6px;">
                          <strong style="color:#172B4D;">Epic:</strong> ${epicName || 'General'}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong style="color:#172B4D;">Status:</strong> Ready for Development
                        </td>
                        <td>
                          <strong style="color:#172B4D;">Reporter:</strong> ${assignedBy}
                        </td>
                      </tr>
                    </table>

                    ${criteriaHtml}
                  </td>
                </tr>
              </table>

              <!-- Call To Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" target="_blank" style="display:inline-block;background:#0052CC;color:#FFFFFF;font-weight:700;font-size:14px;text-decoration:none;padding:12px 28px;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.12);">
                      🚀 Open Ticket in JiraCraft Board &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Pro-tip Box -->
              <div style="background:#FFF0B3;border:1px solid #FFE380;border-radius:4px;padding:12px 16px;font-size:12px;color:#172B4D;line-height:1.5;">
                💡 <strong>Agile Recommendation:</strong> Before moving this ticket to <em>In Progress</em>, review the acceptance criteria with the team during daily standup and ensure any dependencies are tracked.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAFBFC;border-top:1px solid #EBECF0;padding:20px 28px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#5E6C84;">
                This is an official automated dispatch from <strong>JiraCraft Enterprise Mailer</strong> for <strong>${projectName}</strong>.
              </p>
              <p style="margin:0;font-size:11px;color:#7A869A;">
                &copy; ${YEAR} JiraCraft Agile System &middot; Lead: ${assignedBy} &middot; DevOps CI/CD Pipeline
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildMemberWelcomeEmailHtml(member) {
  const {
    toName = 'Developer',
    empId = null,
    email = '',
    role = 'DevOps Engineer',
    projectName = 'PayFlow - Mobile Wallet & Checkout',
    projectKey = 'PAY',
    leadName = 'Sarah Connor (Scrum Master)',
    assignedIssue = null,
    dashboardUrl = 'http://localhost:3000'
  } = member;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Team!</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F5F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#172B4D;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F4F5F7;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:620px;background:#FFFFFF;border-radius:8px;border:1px solid #DFE1E6;box-shadow:0 2px 8px rgba(9,30,66,0.08);overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0052CC 0%,#0747A6 100%);padding:26px 28px;text-align:center;">
              <div style="display:inline-block;background:#FFFFFF;color:#0052CC;font-weight:900;font-size:22px;border-radius:8px;width:42px;height:42px;line-height:42px;text-align:center;margin-bottom:8px;">
                J
              </div>
              <h1 style="margin:0;color:#FFFFFF;font-size:22px;font-weight:800;letter-spacing:0.5px;">
                Welcome to the Engineering Team!
              </h1>
              <p style="margin:6px 0 0;color:#DEEBFF;font-size:13px;">
                ${projectName} (${projectKey})
              </p>
            </td>
          </tr>

          <!-- Welcome Body -->
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 16px;font-size:15px;color:#172B4D;">
                Hi <strong>${toName}</strong>,
              </p>
              <p style="margin:0 0 20px;font-size:14px;color:#42526E;line-height:1.6;">
                Welcome aboard! You have been officially registered in the JiraCraft workspace for <strong>${projectName}</strong>. Your account and corporate email notifications are now active.
              </p>

              <!-- Profile Details -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#FAFBFC;border:1px solid #DFE1E6;border-radius:6px;padding:16px;margin-bottom:20px;">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#5E6C84;width:35%;"><strong>Employee ID / Badge:</strong></td>
                  <td style="padding:6px 0;font-size:13px;color:#0747A6;font-weight:700;font-family:monospace;">${empId || 'EMP-NEW'}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#5E6C84;"><strong>Name:</strong></td>
                  <td style="padding:6px 0;font-size:13px;color:#172B4D;font-weight:600;">${toName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#5E6C84;"><strong>Role:</strong></td>
                  <td style="padding:6px 0;font-size:13px;color:#0052CC;font-weight:600;">${role}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#5E6C84;"><strong>Corporate Email:</strong></td>
                  <td style="padding:6px 0;font-size:13px;color:#172B4D;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#5E6C84;"><strong>Team Lead:</strong></td>
                  <td style="padding:6px 0;font-size:13px;color:#172B4D;">${leadName}</td>
                </tr>
              </table>

              ${assignedIssue ? `
                <div style="background:#EBF3FF;border:1px solid #B3D4FF;border-radius:6px;padding:14px 18px;margin-bottom:20px;">
                  <div style="font-size:12px;font-weight:700;color:#0747A6;text-transform:uppercase;margin-bottom:4px;">
                    🎯 Initial Work Assignment
                  </div>
                  <div style="font-size:14px;font-weight:700;color:#172B4D;">
                    <span style="background:#0052CC;color:#FFF;padding:2px 6px;border-radius:3px;font-family:monospace;font-size:12px;">${assignedIssue.key}</span> ${assignedIssue.summary}
                  </div>
                </div>
              ` : ''}

              <!-- Action button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" target="_blank" style="display:inline-block;background:#0052CC;color:#FFFFFF;font-weight:700;font-size:14px;text-decoration:none;padding:12px 28px;border-radius:4px;">
                      Access JiraCraft Workspace &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <div style="background:#F4F5F7;border-radius:6px;padding:12px 16px;font-size:12px;color:#42526E;">
                <strong>Next Steps:</strong> Join the daily Scrum standup, review active Sprint 1 objectives, and check your assigned issues on the Scrum board.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAFBFC;border-top:1px solid #EBECF0;padding:18px 28px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#7A869A;">
                &copy; ${YEAR} JiraCraft Agile System &middot; Automated Onboarding Notification
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

