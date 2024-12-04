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

