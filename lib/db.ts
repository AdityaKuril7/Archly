import mongoose from "mongoose";
import "@/models/blog.model";
import "@/models/comment.model";
import "@/models/user.model";

interface connectionObj {
  isConnected?: number;
}

const connection: connectionObj = {};

const connectDb = async () => {
  try {
    if (connection.isConnected) {
      return;
    }

    if (!process.env.MONGO_URI) return;
    const conn = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = conn.connections[0].readyState;
  } catch (e) {
    console.log("Error: MongoDB Connected error", e);
  }
};

export default connectDb;
