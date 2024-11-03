import { AppConfig } from ".";

/** @type {import("bullmq").RedisOptions} */
const redisConfig = {
  password: String(AppConfig.get("REDIS_PASSWORD")),
  host: String(AppConfig.get("REDIS_HOST")),
  port: Number(AppConfig.get("REDIS_PORT"))
};

export default redisConfig;

