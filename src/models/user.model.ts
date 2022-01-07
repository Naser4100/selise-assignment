import mongoose from 'mongoose';

import IUser from '../interfaces/user.interface';

const UserSchema = new mongoose.Schema<IUser>(
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

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('user', UserSchema);

export default UserModel;
