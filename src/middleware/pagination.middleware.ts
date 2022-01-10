import { Request, NextFunction } from 'express';
import { Model } from 'mongoose';
import { IPaginateResponse } from '../interfaces/customResponse.interface';
import { ProductDocument } from '../models/product.model';

export const paginatedResults = (model: Model<ProductDocument, {}, {}, {}>) => {
  return async (
    req: Request<
      {},
      {},
      { page: number; total: number; sortBy: string; sortType: string },
      {}
    >,
    res: IPaginateResponse,
    next: NextFunction
  ) => {
    const { page, total, sortType, sortBy } = req.body;

    const startIndex = (page - 1) * total;
    const endIndex = page * total;

    let sortObject: any = {};

    sortObject[sortBy] = sortType === 'asc' ? 1 : -1;

    const totalDocsCount = await model.countDocuments({ user: req?.user?._id });

    interface IResult {
      next?: object;
      previous?: object;
      totalDocument?: number;
      results?: Array<{}>;
    }

    const results: IResult = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        total: total,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        total: total,
      };
    }
    try {
      const result = await model
        .find()
        .limit(total)
        .skip(startIndex)
        .sort(sortObject)
        .exec();
      res.paginatedResults = result;
      res.totalDocument = totalDocsCount;
      next();
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
};
