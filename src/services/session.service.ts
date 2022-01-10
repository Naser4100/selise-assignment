import SessionModel from '../models/session.model';

export const createSessionService = async (userId: string) => {
  const session = await SessionModel.create({ user: userId });

  return session;
};

export const findSessionService = async (userId: string) => {
  const session = await SessionModel.findOne({ user: userId });

  return session;
};

export const updateSessionService = async (userId: string, query: object) => {
  const session = await SessionModel.findOneAndUpdate({ user: userId }, query, {
    new: true,
  });

  return session;
};
