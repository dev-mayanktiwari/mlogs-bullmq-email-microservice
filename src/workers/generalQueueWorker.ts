/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {Worker} from "bullmq";
import sendWelcomeEmail from "../services/sendWelcomeEmail";
import logger from "../utils/logger";
import deadLetterQueue from "../queues/deadLetterQueue";
import {generalQueueName, sendAccountConfirmationJobName, sendWelcomeEmailJobName} from "../constant";
import sendAccountConfirmationEmail from "../services/sendAccountConfirmationEmail";

const generalQueueWorker = new Worker(generalQueueName, async (job) => {
  const { name } = job.data;

  try {
    if (name === sendAccountConfirmationJobName) {
      const { email, name, token, code } = job.data;
      // Send account confirmation email

      await sendAccountConfirmationEmail(email, name, token, code);
    } else if (name === sendWelcomeEmailJobName) {
      const { email, name } = job.data;
      // Send welcome email
      await sendWelcomeEmail(email, name);
    }
  } catch (error) {
    logger.error(`Error processing job ${job.id} with ${job.name} property:`, error);
  }
});

generalQueueWorker.on("completed", (job) => {
  logger.info(`Job ${job.data.name} with job id ${job.data.id} successful sent to ${job.data.email}`);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
generalQueueWorker.on("failed", async (job, err) => {
  if (job) {
    if (job.name === sendAccountConfirmationJobName) {
      await deadLetterQueue.add(sendAccountConfirmationJobName, {
        email: job.data.email,
        name: job.data.name,
        token: job.data.token,
        code: job.data.code
      });
    }
    if (job.name === sendAccountConfirmationJobName) {
      await deadLetterQueue.add(sendAccountConfirmationJobName, {
        email: job.data.email,
        name: job.data.name
      });
    }
    logger.error(`Job ${job.data.name} with job id ${job.data.id} failed to send to ${job.data.email} with error: ${err.message}`);
  } else {
    logger.error(`Job failed with error: ${err.message}`);
  }
});

export default generalQueueWorker;
