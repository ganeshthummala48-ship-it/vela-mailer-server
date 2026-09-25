// ============================================================
// lib/templates.js — HTML email templates for Vela Shootz
// All templates return a complete HTML string ready to send.
// ============================================================

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ganeshthummala48@gmail.com';
const YEAR        = new Date().getFullYear();

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
        <a href="tel:+917095891554" style="color:#E5AD36;text-decoration:none;font-size:13px;font-weight:600;">+91 70958 91554</a>
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
        <a href="tel:+917095891554" style="color:#E5AD36;text-decoration:none;font-size:13px;font-weight:600;">+91 70958 91554</a>
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
