
export const template = (tokenedEmail)=>{
    return ` 
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirm Your Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:'DM Sans',sans-serif;">

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f0f0f;">
  <tr>
    <td align="center" style="padding:40px 20px;">

      <table width="520" border="0" cellspacing="0" cellpadding="0" style="max-width:520px;">

        <!-- TOP GOLD LINE -->
        <tr>
          <td style="background:linear-gradient(90deg,#c9a96e,#f0d9a8,#c9a96e);height:2px;"></td>
        </tr>

        <!-- HEADER / BRAND -->
        <tr>
          <td style="background-color:#161616;padding:40px 50px 30px;text-align:center;">
            <div style="font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:6px;color:#c9a96e;text-transform:uppercase;margin-bottom:14px;">Welcome</div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:300;color:#f5f0e8;letter-spacing:4px;line-height:1;">LUXE</div>
            <div style="font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:8px;color:#444;text-transform:uppercase;margin-top:4px;">STORE</div>
          </td>
        </tr>

        <!-- HERO -->
        <tr>
          <td style="background-color:#161616;padding:10px 50px 45px;text-align:center;border-bottom:1px solid #222;">

            <!-- big icon area -->
            <div style="width:70px;height:70px;border:1px solid #c9a96e;border-radius:50%;margin:0 auto 28px;display:flex;align-items:center;justify-content:center;line-height:70px;font-size:28px;">
              ✉
            </div>

            <h1 style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;color:#f5f0e8;margin:0 0 14px;letter-spacing:1px;">
              Confirm Your Email
            </h1>
            <p style="font-size:13px;color:#666;margin:0;line-height:1.9;letter-spacing:0.3px;">
              Hi <span style="color:#c9a96e;font-weight:500;">{{name}}</span>, you're almost there!<br/>
              Click the button below to verify your email address<br/>and activate your account.
            </p>
          </td>
        </tr>

        <!-- ACCOUNT INFO -->
        <tr>
          <td style="background-color:#1a1a1a;padding:32px 50px;">
            <div style="font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:5px;color:#c9a96e;text-transform:uppercase;margin-bottom:18px;">Your Account</div>

            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="font-size:10px;letter-spacing:2px;color:#444;text-transform:uppercase;">Name</span>
                </td>
                <td align="right" style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="font-size:13px;color:#f5f0e8;">{{name}}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="font-size:10px;letter-spacing:2px;color:#444;text-transform:uppercase;">Email</span>
                </td>
                <td align="right" style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="font-size:13px;color:#f5f0e8;">{{email}}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:11px 0;">
                  <span style="font-size:10px;letter-spacing:2px;color:#444;text-transform:uppercase;">Account Type</span>
                </td>
                <td align="right" style="padding:11px 0;">
                  <span style="display:inline-block;font-size:9px;letter-spacing:2px;color:#0f0f0f;background:#c9a96e;padding:4px 12px;text-transform:uppercase;">{{role}}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA BUTTON -->
        <tr>
          <td style="background-color:#161616;padding:45px 50px;text-align:center;">
            <p style="font-size:12px;color:#555;margin:0 0 28px;line-height:1.8;letter-spacing:0.3px;">
              This verification link will expire in <span style="color:#c9a96e;">24 hours</span>.<br/>
              Please confirm your email to start shopping.
            </p>

            <a href="http://localhost:3000/verify/${tokenedEmail}"
              target="_blank"
              style="display:inline-block;
                     font-family:'DM Sans',sans-serif;
                     font-size:11px;
                     letter-spacing:4px;
                     text-transform:uppercase;
                     color:#0f0f0f;
                     background:linear-gradient(135deg,#c9a96e,#f0d9a8);
                     text-decoration:none;
                     padding:18px 48px;
                     font-weight:500;">
              Verify My Account
            </a>

            <p style="font-size:11px;color:#333;margin:24px 0 0;letter-spacing:0.3px;">
              Or copy this link into your browser:<br/>
              <span style="color:#555;word-break:break-all;">localhost:3000/auth/verify/{{token}}</span>
            </p>
          </td>
        </tr>

        <!-- SECURITY NOTE -->
        <tr>
          <td style="background-color:#141414;padding:24px 50px;border-top:1px solid #222;border-bottom:1px solid #222;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="28" valign="top" style="padding-top:1px;">
                  <span style="font-size:16px;">🔒</span>
                </td>
                <td style="padding-left:12px;">
                  <p style="font-size:11px;color:#444;margin:0;line-height:1.8;letter-spacing:0.3px;">
                    If you did not create an account with <span style="color:#c9a96e;">Luxe Store</span>, you can safely ignore this email. Someone may have entered your email address by mistake.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- BOTTOM GOLD LINE -->
        <tr>
          <td style="background:linear-gradient(90deg,#c9a96e,#f0d9a8,#c9a96e);height:2px;"></td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background-color:#0f0f0f;padding:28px 50px;text-align:center;">
            <div style="font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:5px;color:#2a2a2a;text-transform:uppercase;margin-bottom:10px;">LUXE STORE</div>
            <p style="font-size:11px;color:#333;margin:0 0 6px;line-height:1.8;">
              Need help?
              <a href="mailto:support@luxestore.com" style="color:#c9a96e;text-decoration:none;">support@luxestore.com</a>
            </p>
            <p style="font-size:10px;color:#2a2a2a;margin:0;letter-spacing:0.3px;">
              © 2026 Luxe Store · 
              <a href="#" style="color:#2a2a2a;text-decoration:none;">Privacy Policy</a> · 
              <a href="#" style="color:#2a2a2a;text-decoration:none;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
    `
    
}