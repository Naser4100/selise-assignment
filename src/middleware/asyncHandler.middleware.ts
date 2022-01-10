import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error);
      console.log(error);
    });

export default asyncHandler;
