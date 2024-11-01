/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Worker } from "bullmq";
import sendAccountConfirmationEmail from "../services/sendAccountConfirmationEmail";
import sendWelcomeEmail from "../services/sendWelcomeEmail";
import logger from "../utils/logger";
import sendAdminNotification from "../services/sendAdminNotification";
import { AppConfig } from "../config";
import {
  deadLetterQueueName,
  sendAccountConfirmationJobName,
  sendPasswordChangedJobName,
  sendPasswordResetJobName,
  sendWelcomeEmailJobName
} from "../constant";
import redisConfig from "../config/redisConfig";
import sendPasswordChangedEmail from "../services/sendPasswordChangedEmail";
import sendPasswordResetEmail from "../services/sendPasswordReset";

const deadLetterQueueWorker = new Worker(
  deadLetterQueueName,
  async (job) => {
    const { name } = job;
    logger.info("Job received in Dead Letter Queue", { meta: job.data });
    try {
      if (name === sendAccountConfirmationJobName) {
        const { email, name, token, code } = job.data;
        // Send account confirmation email
        await sendAccountConfirmationEmail(email, name, token, code);
      } else if (name === sendWelcomeEmailJobName) {
        const { email, name } = job.data;
        // Send welcome email
        await sendWelcomeEmail(email, name);
      } else if (name === sendPasswordResetJobName) {
        const { email, name, token } = job.data;
        await sendPasswordResetEmail(email, name, token);
      } else if (name === sendPasswordChangedJobName) {
        const { email, name } = job.data;
        await sendPasswordChangedEmail(email, name);
      } else {
        logger.warn(`Unknown job name: ${name}`);
      }
    } catch (error) {
      logger.error(`Error processing job ${job.id} with name ${name}:`, error);
    }
  },
  { connection: redisConfig }
);

deadLetterQueueWorker.on("completed", (job) => {
  logger.info(`Job ${job.data.name} with job id ${job.id} successfully sent to ${job.data.email}`);
});

// Make this event handler async
deadLetterQueueWorker.on("failed", async (job, err) => {
  if (job) {
    logger.error(`Job ${job.data.name} with job id ${job.id} failed to send to ${job.data.email} with error: ${err.message}`);

    // Sending email to admin about the failed job
    await sendAdminNotification(AppConfig.get("ADMIN_EMAIL") as string, job.data.email, err.message);
  } else {
    logger.error(`Job failed with with error: ${err.message}`);
  }
});

export default deadLetterQueueWorker;
