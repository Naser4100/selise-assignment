import JWT from 'jsonwebtoken';
import config from 'config';

export const signAccessTokenService = async (userId: string) => {
  const JWT_SECRET = config.get<string>('jwtSecret');
  try {
    const token = JWT.sign({ id: userId }, JWT_SECRET, {
      expiresIn: config.get<string>('accessTokenTTL'),
    });
    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signRefreshTokenService = async (userId: string) => {
  const JWT_SECRET = config.get<string>('jwtSecret');
  try {
    const token = JWT.sign({ id: userId }, JWT_SECRET, {
      expiresIn: config.get<string>('refreshTokenTTL'),
    });
    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};
