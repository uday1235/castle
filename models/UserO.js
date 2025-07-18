// lib/models/User.js
{/*import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.hashedPassword);
};

export default mongoose.models.User || mongoose.model('User', userSchema);

*/}

import { Schema, model, models } from "mongoose";

// Define the User schema
const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

// Check if the model already exists to avoid overwriting it
const User = models.User || model('User', UserSchema);

export default User;

