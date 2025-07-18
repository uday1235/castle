// /lib/dbConnect.js
import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!DATABASE_URL) throw new Error('DATABASE_URL is missing');

  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URL, {
      dbName: 'sparts',
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
  console.log('database connected')
}

//export default connectToDatabase;
