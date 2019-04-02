import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) return next(new Error('No session found'));
    if (!req.session.userId) return next();

    const user = await User.findOne(req.session.userId);

    if (!user) return next();

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
