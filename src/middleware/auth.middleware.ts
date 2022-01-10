import passportJwt from 'passport-jwt';
import JWT from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { Request } from 'express';
import config from 'config';
import { findUserByIdService } from '../services/user.service';

import { findSessionService } from '../services/session.service';

const { Strategy } = passportJwt;

const JWT_SECRET = config.get<string>('jwtSecret');

let refreshToken: string;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.accessToken;
  }

  return jwt;
};

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET,
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      try {
        const user = await findUserByIdService(payload.id);
        if (user) {
          const isSessionValid = await findSessionService(user._id);
          if (isSessionValid?.valid) {
            return done(null, user);
          }
        }

        return done(null, false);
      } catch (error) {
        console.log(error);
        done(null, false);
      }
    })
  );
};
