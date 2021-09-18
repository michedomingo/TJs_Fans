// import mongoose, { Schema } from 'mongoose';
import mongoose from 'mongoose';
import pkg from 'mongoose';
const { Schema } = pkg;

const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'publisher', 'admin'],
    default: 'user',
  },
});

export const UserModel = mongoose.model('User', UserSchema);
