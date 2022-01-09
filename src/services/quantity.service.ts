import {
  DocumentDefinition,
  ObjectId,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { IQuantity } from '../interfaces/quantity.interface';
import QuantityModel, { QuantityDocument } from '../models/quantity.model';

export const addNewQuantityService = async (
  newQuantity: DocumentDefinition<IQuantity>
) => {
  try {
    return await QuantityModel.create(newQuantity);
  } catch (error: any) {
    throw new Error(error);
  }
};
