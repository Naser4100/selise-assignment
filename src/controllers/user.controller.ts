import { NextFunction, Request, Response } from 'express';

import { createUserService } from '../services/user.service';
import asyncHandler from '../middleware/asyncHandler.middleware';
import { HttpException } from '../exceptions/HttpException';

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await createUserService(req.body);
    res.json({ newUser });
  }
);
