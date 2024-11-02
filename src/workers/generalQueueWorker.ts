/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Worker } from "bullmq";
import sendWelcomeEmail from "../services/sendWelcomeEmail";
import logger from "../utils/logger";
import deadLetterQueue from "../queues/deadLetterQueue";
import { generalQueueName, sendAccountConfirmationJobName, sendPasswordChangedJobName, sendWelcomeEmailJobName } from "../constant";
import redisConfig from "../config/redisConfig";
import sendPasswordChangedEmail from "../services/sendPasswordChangedEmail";

const generalQueueWorker = new Worker(
  generalQueueName,
  async (job) => {
    const { name } = job;
    logger.info("Job received in General Queue", { meta: job.data });
    try {
      if (name === sendPasswordChangedJobName) {
        const { email, name } = job.data;
        // Send account confirmation email

        await sendPasswordChangedEmail(name, email);
      } else if (name === sendWelcomeEmailJobName) {
        const { email, name } = job.data;
        // Send welcome email
        await sendWelcomeEmail(name, email);
      }
    } catch (error) {
      logger.error(`Error processing job ${job.id} with ${job.name} property:`, error);
    }
  },
  { connection: redisConfig }
);

generalQueueWorker.on("completed", (job) => {
  logger.info(`Job ${job.data.name} with job id ${job.data.id} successful sent to ${job.data.email}`);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
generalQueueWorker.on("failed", async (job, err) => {
  if (job) {
    if (job.name === sendPasswordChangedJobName) {
      await deadLetterQueue.add(sendPasswordChangedJobName, {
        email: job.data.email,
        name: job.data.name
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
