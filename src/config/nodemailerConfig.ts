import { AppConfig } from ".";
import nodemailer from "nodemailer";

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

export default transporter;

