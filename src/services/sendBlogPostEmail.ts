import transporter from "../config/nodemailerConfig";
import logger from "../utils/logger";
import dotenv from "dotenv";
dotenv.config();

const sendBlogPostEmail = async (emails: string[], blogId: string, blogTitle: string, blogHeadline: string) => {
  try {
    const mailOptions = {
      from: "MLOGS <${process.env.EMAIL_USER}>",
      bcc: emails,
      subject: `New Blog Post: ${blogTitle}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Blog Post on MLOGS</title>
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
                    border-bottom: 2px solid #4caf50;
                    padding-bottom: 20px;
                }
                .header h1 {
                    color: #4caf50;
                    margin: 0;
                }
                .content {
                    font-size: 16px;
                    color: #555;
                    padding: 20px 0;
                }
                .blog-title {
                    font-size: 24px;
                    color: #2c3e50;
                    margin: 20px 0;
                }
                .blog-headline {
                    font-size: 18px;
                    color: #666;
                    font-style: italic;
                    margin-bottom: 25px;
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
                    border-top: 1px solid #ddd;
                    padding-top: 20px;
                }
                .unsubscribe {
                    color: #888;
                    text-decoration: underline;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Blog Post on MLOGS</h1>
                </div>
                <div class="content">
                    <h2 class="blog-title">${blogTitle}</h2>
                    <p class="blog-headline">${blogHeadline}</p>
                    
                    <p>A new blog post has just been published that might interest you!</p>
                    
                    <a href="${process.env.FRONTEND_URL}/post/${blogId}" class="button">
                        Read Full Post
                    </a>
                    
                    <p>Don't want to miss out on future posts? Bookmark our blog or follow us on social media!</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 MLOGS. All rights reserved.</p>
                    <p>Delhi, India</p>
                </div>
            </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info("Blog notification emails sent successfully", {
      meta: {
        ...info,
        recipientCount: emails.length,
        blogId,
        blogTitle
      }
    });
  } catch (error) {
    logger.error("Error sending blog notification emails", {
      error,
      meta: {
        recipientCount: emails.length,
        blogId,
        blogTitle
      }
    });
  }
};

export default sendBlogPostEmail;

