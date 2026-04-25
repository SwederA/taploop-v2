export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, keychainId, destinationUrl, platformType } = req.body;

  if (!email || !keychainId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updateUrl = `https://taploop-v2.vercel.app/update?id=${keychainId}`;

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your TapLoop is active</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- HEADER -->
        <tr>
          <td style="padding-bottom:32px;border-bottom:1px solid #C9A96E;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:28px;height:28px;border:1.5px solid #2A1F1C;text-align:center;vertical-align:middle;font-family:Georgia,serif;font-size:14px;font-weight:700;color:#2A1F1C;">S</td>
                      <td style="padding-left:10px;">
                        <div style="font-family:Georgia,serif;font-size:16px;font-weight:500;color:#2A1F1C;letter-spacing:.02em;">TapLoop™</div>
                        <div style="font-size:9px;font-weight:500;color:#2A1F1C;opacity:.45;letter-spacing:.15em;text-transform:uppercase;margin-top:2px;">by Sweder Design Co.</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td align="right" style="font-size:9px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#8C6A2F;border:1px solid #C9A96E;padding:5px 10px;">Activated</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- HERO -->
        <tr>
          <td style="padding:40px 0 32px;">
            <div style="font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#2A1F1C;margin-bottom:12px;display:flex;align-items:center;gap:8px;">YOUR TAPLOOP IS LIVE</div>
            <h1 style="font-family:Georgia,serif;font-size:36px;font-weight:500;color:#2A1F1C;margin:0 0 14px;line-height:1.15;letter-spacing:-.02em;">You're all set.<br><em style="color:#8C6A2F;">Start sharing.</em></h1>
            <p style="font-size:15px;color:#2A1F1C;opacity:.65;line-height:1.7;margin:0;">Your TapLoop keychain is fully activated. Anyone who taps or scans it will go directly to your link — no app needed, no friction.</p>
          </td>
        </tr>

        <!-- DETAILS CARD -->
        <tr>
          <td style="background:#F5F0E8;border:1px solid #C9A96E;border-radius:12px;padding:20px;margin-bottom:8px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:14px;border-bottom:1px solid #C9A96E;">
                  <div style="font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#2A1F1C;opacity:.5;margin-bottom:4px;">Currently pointing to</div>
                  <div style="font-size:14px;font-weight:400;color:#2A1F1C;word-break:break-all;">${destinationUrl || '—'}</div>
                </td>
              </tr>
              <tr>
                <td style="padding-top:14px;">
                  <div style="font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#2A1F1C;opacity:.5;margin-bottom:4px;">Keychain ID</div>
                  <div style="font-family:Georgia,serif;font-size:18px;font-weight:500;color:#2A1F1C;letter-spacing:.1em;">${keychainId}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SPACER -->
        <tr><td style="height:8px;"></td></tr>

        <!-- UPDATE CTA -->
        <tr>
          <td style="background:white;border:1px solid #C9A96E;border-radius:12px;padding:24px;">
            <div style="font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#2A1F1C;margin-bottom:8px;">Want to change your destination?</div>
            <p style="font-size:14px;color:#2A1F1C;opacity:.65;line-height:1.6;margin:0 0 20px;">Update where your TapLoop takes people anytime — no password, no app, no hassle. Just click the link below.</p>
            <a href="${updateUrl}" style="display:block;background:#2A1F1C;color:#FAF7F2;text-decoration:none;text-align:center;padding:15px;border-radius:4px;font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;">Update My TapLoop →</a>
            <p style="font-size:11px;color:#2A1F1C;opacity:.4;margin:12px 0 0;word-break:break-all;text-align:center;">${updateUrl}</p>
          </td>
        </tr>

        <!-- HOW IT WORKS -->
        <tr>
          <td style="padding:32px 0 0;">
            <div style="font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#2A1F1C;opacity:.4;margin-bottom:16px;">How it works</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:12px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:24px;height:24px;background:#2A1F1C;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:500;color:#FAF7F2;">1</td>
                      <td style="padding-left:12px;font-size:13px;color:#2A1F1C;opacity:.7;line-height:1.5;">Someone taps your keychain or scans the QR code</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:12px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:24px;height:24px;background:#2A1F1C;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:500;color:#FAF7F2;">2</td>
                      <td style="padding-left:12px;font-size:13px;color:#2A1F1C;opacity:.7;line-height:1.5;">They go directly to your link — no app needed</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:24px;height:24px;background:#2A1F1C;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:500;color:#FAF7F2;">3</td>
                      <td style="padding-left:12px;font-size:13px;color:#2A1F1C;opacity:.7;line-height:1.5;">Update your destination anytime using the link above</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:32px 0 0;border-top:1px solid #C9A96E;margin-top:32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:11px;color:#2A1F1C;opacity:.35;letter-spacing:.04em;">TapLoop™ · Sweder Design Co.</td>
                <td align="right"><a href="https://swederdesignco.com" style="font-size:11px;font-weight:500;color:#8C6A2F;text-decoration:none;letter-spacing:.08em;text-transform:uppercase;">swederdesignco.com</a></td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'TapLoop™ <hello@swederdesignco.com>',
        to: email,
        subject: 'Your TapLoop is live — here\'s your update link',
        html: emailHtml
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Email failed to send' });
    }
  } catch (e) {
    console.error('Email error:', e);
    return res.status(500).json({ error: 'Email failed to send' });
  }
}
