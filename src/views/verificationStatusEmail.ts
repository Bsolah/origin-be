const verificationRejectEmail = (firstName: string, lastName: string) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Rejection Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #0a2540;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content p {
      line-height: 1.6;
      margin: 16px 0;
    }
    .button {
      display: block;
      width: fit-content;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: #0a2540;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #666666;
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Document Not Approved
    </div>
    <div class="content">
      <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
      <p>We regret to inform you that the document you submitted for verification on <strong>Tapp</strong> did not meet our requirements.</p>
      <p><strong>Reason for Rejection:</strong></p>
      <p>[Provide a brief reason, e.g., "The document was blurry," or "The document type is incorrect."]</p>
      <p>To proceed, please re-upload a valid document on the <strong>Tapp</strong> app by following these steps:</p>
      <ol>
        <li>Open the <strong>Tapp</strong> app.</li>
        <li>Navigate to the <strong>Verification</strong> section.</li>
        <li>Upload a clear and valid copy of your required document.</li>
      </ol>
      <p><strong>Tips for a Successful Submission:</strong></p>
      <ul>
        <li>Ensure the document is clearly visible and all text is readable.</li>
        <li>Avoid glare or shadows on the document.</li>
        <li>Double-check that the document matches the requested type.</li>
      </ul>
      <p>If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:support@tapp.com">support@tapp.com</a> or visit our <a href="https://tapp.com/help">Help Center</a>.</p>
      <a href="https://tapp.com/re-upload" class="button">Re-upload Document</a>
    </div>
    <div class="footer">
      Thank you for using Tapp.  
      <br>© 2025 Tapp. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};

const verificationAcceptedEmail = (firstName: string, lastName: string) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Verified Successfully</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #28a745;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content p {
      line-height: 1.6;
      margin: 16px 0;
    }
    .button {
      display: block;
      width: fit-content;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: #28a745;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #666666;
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Document Verified Successfully
    </div>
    <div class="content">
      <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
      <p>We are pleased to inform you that the document you submitted for verification on <strong>Tapp</strong> has been successfully verified!</p>
      <p>Your account is now fully verified, and you can enjoy uninterrupted access to all features on the <strong>Tapp</strong> platform.</p>
      <p>If you have any further questions or need assistance, feel free to contact our support team at <a href="mailto:support@tapp.com">support@tapp.com</a> or visit our <a href="https://tapp.com/help">Help Center</a>.</p>
      <a href="https://tapp.com/dashboard" class="button">Go to Dashboard</a>
    </div>
    <div class="footer">
      Thank you for using Tapp.  
      <br>© 2025 Tapp. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};
