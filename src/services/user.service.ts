import {
  DocumentDefinition,
  ObjectId,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import UserModel, { UserDocument } from '../models/user.model';

export const createUserService = async (newUser: DocumentDefinition<IUser>) => {
  try {
    return await UserModel.create(newUser);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUserByIdService = async (userId: ObjectId) => {
  try {
    return await UserModel.findById(userId);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUserByEmailService = async (email: string) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUserByIdAndUpdateService = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) => {
  try {
    return await UserModel.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    throw new Error(error);
  }
};
