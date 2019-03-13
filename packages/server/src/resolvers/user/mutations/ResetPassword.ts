import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { redis } from '../../../shared/redis';
import { Context } from '../../../types/Context';
import { ResetPasswordInput } from '../validators/ResetPasswordInput';

@Resolver()
export class ResetPassword {
  @Mutation(returns => User, { nullable: true })
  async resetPassword(
    @Arg('input')
    { token, password }: ResetPasswordInput,
    @Ctx() { req }: Context
  ): Promise<User> {
    const userId = await redis.get(token);
    if (!userId) {
      throw new Error('Something went wrong');
    }

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error('Something went wrong');
    }

    const hash = await bcrypt.hash(password, 12);
    user.password = hash;
    user.save();

    redis.del(token);
    req.session!.sessionId = user.id;

    return user;
  }
}
