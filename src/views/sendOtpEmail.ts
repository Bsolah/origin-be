export const emailOtpHtml: (link: string) => string = (link: string) => {
  return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
            color: #333333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #0A2540;
            padding-bottom: 10px;
        }
        .header h1 {
            color: #0A2540;
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #0A2540;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
            border-top: 1px solid #dddddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Tapp</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to verify your email address</p>
            <a href="${link}" class="button">Verify</a>
            <p>If you didn’t request this, please ignore this email or contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>Thank you for choosing Tapp!</p>
            <p>&copy; 2025 Tapp Inc. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
