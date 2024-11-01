import transporter from "../config/nodemailerConfig";
import logger from "../utils/logger";

const sendPasswordChangedEmail = async (name: string, to: string) => {
  try {
    // Confirm the name and email values are defined
    if (!to || !/\S+@\S+\.\S+/.test(to)) {
      throw new Error("Invalid recipient email address");
    }

    // Log the name and email to troubleshoot further if needed

    const info = await transporter.sendMail({
      from: `MLOGS <${process.env.EMAIL_USER}>`, // Ensure EMAIL_USER is defined correctly
      to,
      subject: "Your Password Has Been Changed",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Changed Successfully</title>
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
                      <h1>Password Changed Successfully</h1>
                  </div>
                  <div class="content">
                      <p>Hello, ${name}</p>
                      <p>
                          This is a confirmation that your password has been changed successfully. If you did not initiate this change, please contact our support team immediately.
                      </p>
                      <p>Thank you for keeping your account secure!</p>
                      <p>Best regards,<br>The MLOGS Team</p>
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

    logger.info("Password change confirmation email sent successfully", { meta: info });
  } catch (error) {
    logger.error(`Error sending password change confirmation email to ${to}`, error);
  }
};

export default sendPasswordChangedEmail;
