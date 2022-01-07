import { DocumentDefinition, ObjectId } from 'mongoose';
import IUser from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import { GeneralError, NotFound } from '../utils/error';

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
