import mongoose from "mongoose";

/**
 * Connect to MongoDB using the URI from env.
 * Exits the process on failure — fine for a hackathon MVP.
 */
export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/hackoblast";
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
