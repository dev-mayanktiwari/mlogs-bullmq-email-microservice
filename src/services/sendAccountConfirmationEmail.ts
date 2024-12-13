import transporter from "../config/nodemailerConfig";
import logger from "../utils/logger";
import dotenv from "dotenv";
dotenv.config();

const sendAccountConfirmationEmail = async (to: string, name: string, token: string, code: string) => {
  try {
    const info = await transporter.sendMail({
      from: "MLOGS <${process.env.EMAIL_USER}>",
      to: to,
      subject: "Account Confirmation",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to MLOGS - Confirm Your Account</title>
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
                .button {
                    display: inline-block;
                    background-color: #4caf50;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    margin: 20px 0;
                    text-align: center;
        
                }
                .button:hover {
                    background-color: #45a049;
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
                        We're excited to have you on board! Please confirm your account by
                        clicking the button below:
                    </p>
                    <a href="${process.env.FRONTEND_URL}/verify/${token}?code=${code}" class="button">
                        Confirm Account
                    </a>
                    <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
                    <p>${process.env.FRONTEND_URL}/verify/${token}?code=${code}</p>
                    <p>If you didn't create an account, please disregard this email.</p>
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
    logger.info("Account confirmation email sent successfully", { meta: info });
  } catch (error) {
    logger.error(`Error sending account confirmation email to ${to}`, error);
  }
};

export default sendAccountConfirmationEmail;
