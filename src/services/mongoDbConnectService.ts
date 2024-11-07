/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose from "mongoose";
import { AppConfig } from "../config";

export default {
  connect: async () => {
    try {
      // Connect to MongoDB
      await mongoose.connect(String(AppConfig.get("MONGO_URL")));
      return mongoose.connection;
    } catch (error) {
      throw error;
    }
  }
};

