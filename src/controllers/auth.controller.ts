import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.middleware';
import { findUserByEmailService } from '../services/user.service';

import { HttpException, NotFound } from '../exceptions/HttpException';
import {
  signAccessTokenService,
  signRefreshTokenService,
} from '../services/auth.service';

import {
  createSessionService,
  findSessionService,
  updateSessionService,
} from '../services/session.service';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUserByEmailService(email);

  if (!user) {
    throw new NotFound(404, 'User does not exist');
  }

  const isMatch = await bcrypt.compare(password, user.password as string);

  if (!isMatch) {
    throw new HttpException(400, 'Invalid credentials');
  }

  const accessToken = await signAccessTokenService(user._id);
  const refreshToken = await signRefreshTokenService(user._id);

  const session = await findSessionService(user._id);

  if (session) {
    await updateSessionService(user._id, { $set: { valid: true } });
  } else {
    await createSessionService(user._id);
  }

  res.cookie('accessToken', accessToken);
  res.cookie('refreshToken', refreshToken);
  res
    .status(200)
    .json({ success: true, message: 'Access and Refresh token has been sent' });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await updateSessionService(req?.user?._id as string, {
    $set: { valid: false },
  });

  res.status(200).json({ success: true, message: 'Successfully logout' });
});
