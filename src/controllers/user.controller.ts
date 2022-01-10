import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import config from 'config';

import {
  createUserService,
  findUserByIdAndUpdateService,
} from '../services/user.service';
import asyncHandler from '../middleware/asyncHandler.middleware';
import { HttpException } from '../exceptions/HttpException';
import sendEmail from '../utils/sendEmail';
import { IUser } from '../interfaces/user.interface';

export const createUser = asyncHandler(
  async (
    req: Request<{}, {}, IUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const newUser = await createUserService(req.body);

    const JWT_SECRET = config.get<string>('jwtSecret');
    const setPasswordTokenExp = config.get<string>('setPasswordTokenExp');
    const senderFromEmail = config.get<string>('senderFromEmail');

    console.log(senderFromEmail);

    const setPasswordToken = JWT.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: setPasswordTokenExp,
    });

    await sendEmail({
      to: newUser.email,
      from: senderFromEmail,
      subject: 'Set password',
      text: `Your token for set a password: \n${setPasswordToken}`,
    });

    res.status(201).json({
      success: true,
      message: 'User created and verification token has been sent to the email',
    });
  }
);

export const setPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const token = req.headers.authorization || '';

    if (!token) {
      throw new HttpException(
        400,
        'A verification token is required for set password'
      );
    }

    const JWT_SECRET = config.get<string>('jwtSecret');
    const saltWorkFactor = config.get<string>('saltWorkFactor');

    try {
      const decoded: any = JWT.verify(token, JWT_SECRET);
      const hashedPassword = await bcrypt.hash(password, saltWorkFactor);
      await findUserByIdAndUpdateService(
        { _id: decoded._id },
        { password: hashedPassword },
        {
          new: true,
        }
      );
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid or expired token' });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully password set',
    });
  }
);
