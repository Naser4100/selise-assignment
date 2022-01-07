import { Request, Response, NextFunction } from 'express';

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error);
      console.log(error);
    });

export default asyncHandler;
