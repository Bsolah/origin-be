const verificationEmailTemplate = (name: string, link: string) => { 
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f9fc;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
      }
      .footer {
        font-size: 12px;
        color: #888888;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2>Verify Your Email Address</h2>
      <p>Hi ${name},</p>
      <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>

      <a href=${link} class="button">Verify Email</a>

      <p>This link will expire in <strong>1 hour</strong>.</p>

      <p>If the button above doesn’t work, you can copy and paste the following link into your browser:</p>
      <p><a href=${link}>Click</a></p>

      <p>If you didn’t create an account, you can safely ignore this email.</p>

      <div class="footer">
        &copy; 2025 Origin Inc. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
}

export default verificationEmailTemplate