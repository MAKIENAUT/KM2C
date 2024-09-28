import mongoose from "mongoose";

const connectDB = async (): Promise<boolean> => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB Connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
}

export default connectDB;