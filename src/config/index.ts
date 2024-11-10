import dotenv from "dotenv";

dotenv.config();

type ConfigKeys =
  | "DATABASE_URL"
  | "EMAIL_USER"
  | "EMAIL_PASS"
  | "FRONTEND_URL"
  | "ADMIN_EMAIL"
  | "ENV"
  | "MAILER_PORT"
  | "REDIS_URL"
  | "REDIS_PASSWORD"
  | "REDIS_HOST"
  | "REDIS_PORT"
  | "MONGO_URL"
  | "MAILER_HOST"
  | "MAILER_SERVICE";

const _config: Record<ConfigKeys, string | undefined> = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  FRONTEND_URL: process.env.FRONTEND_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ENV: process.env.ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  MAILER_PORT: process.env.MAILER_PORT,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  MONGO_URL: process.env.MONGO_URL,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_SERVICE: process.env.MAILER_SERVICE
};

export const AppConfig = {
  get(key: ConfigKeys): string | number {
    const value = _config[key];
    if (value === undefined) {
      process.exit(1);
    }

    if (key === "MAILER_PORT") {
      return Number(value);
    }

    return value;
  }
};
