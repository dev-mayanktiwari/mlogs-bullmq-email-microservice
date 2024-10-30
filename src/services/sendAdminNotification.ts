import transporter from "../config/nodemailerConfig";
import logger from "../utils/logger";

const sendAdminNotification = async (to: string, failedEmail: string, errorMessage: string) => {
  try {
    const info = await transporter.sendMail({
      from: `MLOGS <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Failed Email Notification",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Failed Email Notification</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      color: #333;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 20px auto;
                      background-color: #ffffff;
                      padding: 30px;
                      border-radius: 8px;
                      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      text-align: center;
                      margin-bottom: 30px;
                  }
                  .header h1 {
                      color: #4caf50;
                      margin: 0;
                  }
                  .content {
                      font-size: 16px;
                      color: #555;
                  }
                  .footer {
                      text-align: center;
                      margin-top: 30px;
                      font-size: 12px;
                      color: #888;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>Failed Email Notification</h1>
                  </div>
                  <div class="content">
                      <p>Dear Admin,</p>
                      <p>
                          We encountered an issue while trying to send an email to <strong>${failedEmail}</strong>.
                      </p>
                      <p>
                          <strong>Error Message:</strong> ${errorMessage}
                      </p>
                      <p>
                          Please check the email logs or the email service to resolve the issue.
                      </p>
                      <p>Best regards,<br>The MLOGS System</p>
                  </div>
                  <div class="footer">
                      <p>&copy; 2024 MLOGS. All rights reserved.</p>
                      <p>Delhi, India</p>
                  </div>
              </div>
          </body>
          </html>
      `
    });
    logger.info("Admin notification email sent successfully", { meta: info });
  } catch (error) {
    logger.error(`Error sending account admin Notification email to ${to}`, error);
  }
};

export default sendAdminNotification;
