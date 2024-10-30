/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-misused-promises */
import generalQueueWorker from "./workers/generalQueueWorker";
import passwordQueueWorker from "./workers/passwordQueueWorker";
import deadLetterQueueWorker from "./workers/deadLetterQueueWorker";
import logger from "./utils/logger";

(() => {
  try {
    // Initialize Workers
    const workers = [
      { worker: generalQueueWorker, name: "General Queue Worker" },
      { worker: passwordQueueWorker, name: "Password Queue Worker" },
      { worker: deadLetterQueueWorker, name: "Dead Letter Queue Worker" }
    ];

    workers.forEach(({ worker, name }) => {
      worker.on("error", (error: never) => {
        logger.error(`${name} encountered an error`, { meta: { error } });
      });
      logger.info(`${name} started successfully`);
    });

    // Graceful Shutdown
    const shutdown = async () => {
      try {
        logger.info("Shutting down gracefully...");

        // Close all workers
        for (const { worker, name } of workers) {
          await worker.close();
          logger.info(`${name} shut down gracefully`);
        }

        process.exit(0);
      } catch (shutdownError) {
        logger.error("Error during shutdown", { meta: { shutdownError } });
        process.exit(1);
      }
    };

    // Handle termination signals
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("Error starting microservice", {
      meta: { error }
    });
    process.exit(1); // Exit with failure
  }
})();
