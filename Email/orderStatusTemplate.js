export const orderStatusTemplate = (orderData) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Order Status Update</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:'DM Sans',sans-serif;">

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f0f0f;">
  <tr>
    <td align="center" style="padding:40px 20px;">
      <table width="520" border="0" cellspacing="0" cellpadding="0" style="max-width:520px;">

        <tr>
          <td style="background:linear-gradient(90deg,#c9a96e,#f0d9a8,#c9a96e);height:2px;"></td>
        </tr>

        <tr>
          <td style="background-color:#161616;padding:40px 50px 30px;text-align:center;">
            <div style="font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:300;color:#f5f0e8;letter-spacing:4px;">LUXE</div>
            <div style="font-size:9px;letter-spacing:8px;color:#444;text-transform:uppercase;margin-top:4px;">STORE</div>
          </td>
        </tr>

        <tr>
          <td style="background-color:#161616;padding:10px 50px 45px;text-align:center;border-bottom:1px solid #222;">
            <div style="width:70px;height:70px;border:1px solid #c9a96e;border-radius:50%;margin:0 auto 28px;line-height:70px;font-size:28px;">
              📦
            </div>
            <h1 style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;color:#f5f0e8;margin:0 0 14px;">
              Order Status Updated
            </h1>
            <p style="font-size:13px;color:#666;margin:0;line-height:1.9;">
              Hi <span style="color:#c9a96e;font-weight:500;">${orderData.userName}</span>,<br/>
              your order status has been updated to<br/>
              <span style="color:#c9a96e;font-weight:500;text-transform:uppercase;">${orderData.status}</span>
            </p>
          </td>
        </tr>

        <tr>
          <td style="background-color:#1a1a1a;padding:32px 50px;">
            <div style="font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:5px;color:#c9a96e;text-transform:uppercase;margin-bottom:18px;">Order Details</div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="font-size:10px;letter-spacing:2px;color:#444;text-transform:uppercase;">Order ID</span>
                </td>
                <td align="right" style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="font-size:13px;color:#f5f0e8;">${orderData.orderId}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="font-size:10px;letter-spacing:2px;color:#444;text-transform:uppercase;">Status</span>
                </td>
                <td align="right" style="padding:11px 0;border-bottom:1px solid #242424;">
                  <span style="display:inline-block;font-size:9px;letter-spacing:2px;color:#0f0f0f;background:#c9a96e;padding:4px 12px;text-transform:uppercase;">${orderData.status}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:11px 0;">
                  <span style="font-size:10px;letter-spacing:2px;color:#444;text-transform:uppercase;">Total</span>
                </td>
                <td align="right" style="padding:11px 0;">
                  <span style="font-size:13px;color:#f5f0e8;">$${orderData.total}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:linear-gradient(90deg,#c9a96e,#f0d9a8,#c9a96e);height:2px;"></td>
        </tr>

        <tr>
          <td style="background-color:#0f0f0f;padding:28px 50px;text-align:center;">
            <p style="font-size:11px;color:#333;margin:0 0 6px;line-height:1.8;">
              Need help?
              <a href="mailto:support@luxestore.com" style="color:#c9a96e;text-decoration:none;">support@luxestore.com</a>
            </p>
            <p style="font-size:10px;color:#2a2a2a;margin:0;">© 2026 Luxe Store</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
    `;
};