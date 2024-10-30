import { AppConfig } from ".";
import nodemailer from "nodemailer";
import logger from "../utils/logger";

const MAILER_PORT = Number(AppConfig.get("MAILER_PORT"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: MAILER_PORT,
  secure: MAILER_PORT === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection configuration and log a success message
transporter.verify((error) => {
  if (error) {
    logger.error("Nodemailer setup failed:", { meta: { error } });
  } else {
    logger.info("Nodemailer setup successful");
  }
});

export default transporter;
