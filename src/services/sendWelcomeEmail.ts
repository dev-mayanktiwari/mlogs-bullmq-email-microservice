import transporter from "../config/nodemailerConfig";
import logger from "../utils/logger";
import dotenv from "dotenv";
dotenv.config();

const sendWelcomeEmail = async (name: string, email: string) => {
  try {
    const info = await transporter.sendMail({
      from: `MLOGS <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to MLOGS!",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to MLOGS</title>
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
                      <h1>Welcome to MLOGS!</h1>
                  </div>
                  <div class="content">
                      <p>Hello, ${name}</p>
                      <p>
                          Congratulations! Your account has been successfully confirmed. We're thrilled to have you as part of our community.
                      </p>
                      <p>
                          Feel free to explore, share your thoughts, and enjoy our platform.
                      </p>
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
    logger.info("Welcome email sent successfully", { meta: info });
  } catch (error) {
    logger.error(`Error sending account confirmation email to ${email}`, error);
  }
};

export default sendWelcomeEmail;
