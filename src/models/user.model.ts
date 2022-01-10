import mongoose from 'mongoose';

import { IUser } from '../interfaces/user.interface';

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    phone: {
      type: String,
    },

    occupation: {
      type: String,
    },

    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>('user', UserSchema);

export default UserModel;
