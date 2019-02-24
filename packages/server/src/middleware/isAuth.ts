import { MiddlewareFn } from 'type-graphql';
import { User } from '../entities/User';
import { Context } from '../types/Context';

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (context.req.session && context.req.session.userId) {
    const user = await User.findOne(context.req.session.userId);

    if (user) {
      context.user = user;
      return next();
    }
  }
  throw new Error('Log in');
};
