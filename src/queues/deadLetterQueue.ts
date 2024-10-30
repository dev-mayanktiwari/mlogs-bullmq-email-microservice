import { Queue } from "bullmq";
import redisConfig from "../config/redisConfig";

const deadLetterQueueName = "dead-letter-queue";

const deadLetterQueue = new Queue(deadLetterQueueName, { connection: redisConfig });
export default deadLetterQueue;
