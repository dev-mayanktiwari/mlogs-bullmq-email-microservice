import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { AppConfig } from ".";
import logger from "../utils/logger";

const MAILER_PORT = Number(AppConfig.get("MAILER_PORT"));

const transporter = nodemailer.createTransport({
  host: AppConfig.get("MAILER_HOST"),
  service: AppConfig.get("MAILER_SERVICE"),
  port: MAILER_PORT,
  secure: MAILER_PORT === 465, // true for 465, false for other ports like 587
  auth: {
    user: AppConfig.get("EMAIL_USER"),
    pass: AppConfig.get("EMAIL_PASS")
  }
} as SMTPTransport.Options);

transporter.verify((error, success) => {
  if (error) {
    logger.error("Error setting up Nodemailer:", error);
  } else {
    logger.info("Nodemailer setup successful and ready to send emails", { meta: success });
  }
});
export default transporter;
