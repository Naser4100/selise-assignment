import mongoose from 'mongoose';

import { IClient } from '../interfaces/client.interface';

export interface ClientDocument extends IClient, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

const ClientModel = mongoose.model<ClientDocument>('client', ClientSchema);

export default ClientModel;
