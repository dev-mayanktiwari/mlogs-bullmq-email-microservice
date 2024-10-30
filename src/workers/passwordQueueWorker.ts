/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {Worker} from "bullmq";

import logger from "../utils/logger";
import {passwordQueueName, sendAccountConfirmationJobName, sendPasswordResetJobName} from "../constant";
import sendPasswordResetEmail from "../services/sendPasswordReset";
import sendAccountConfirmationEmail from "../services/sendAccountConfirmationEmail";
import deadLetterQueue from "../queues/deadLetterQueue";
import redisConfig from "../config/redisConfig";

const passwordQueueWorker = new Worker(
  passwordQueueName,
  async (job) => {
    const { name } = job;

    logger.info("Job received in Password Queue", { meta: job.data });
    try {
      if (name === sendPasswordResetJobName) {
        const { email, name, token } = job.data;

        const res = await sendPasswordResetEmail(email, name, token);
        logger.info(res);
      } else if (name === sendAccountConfirmationJobName) {
        const { email, name, token, code } = job.data;
        // Send account confirmation email

        await sendAccountConfirmationEmail(email, name, token, code);
      }
    } catch (error) {
      logger.error(`Error processing job ${job.id} with ${job.name} property:`, error);
    }
  },
  { connection: redisConfig }
);

passwordQueueWorker.on("completed", (job) => {
  logger.info(`Job ${job.data.name} with job id ${job.data.id} successful sent to ${job.data.email}`);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
passwordQueueWorker.on("failed", async (job, err) => {
  if (job) {
    if (job.name === sendAccountConfirmationJobName) {
      await deadLetterQueue.add(sendAccountConfirmationJobName, {
        email: job.data.email,
        name: job.data.name,
        token: job.data.token,
        code: job.data.code
      });
    } else if (job.name === sendPasswordResetJobName) {
      await deadLetterQueue.add(sendPasswordResetJobName, {
        email: job.data.email,
        name: job.data.name,
        token: job.data.token
      });
    }
    logger.error(`Job ${job.data.name} with job id ${job.data.id} failed to send to ${job.data.email} with error: ${err.message}`);
  } else {
    logger.error(`Job failed with error: ${err.message}`);
  }
});

export default passwordQueueWorker;
