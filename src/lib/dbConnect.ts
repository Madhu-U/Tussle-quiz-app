import mongoose from "mongoose";

const DB_URI = process.env.MONGO_URI;

if (!DB_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DB_URI, opts).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
