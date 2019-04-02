import bcrypt from 'bcrypt';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { redis } from '../../../shared/redis';
import { ResetPasswordInput } from '../validators/ResetPasswordInput';

@Resolver()
export class ResetPassword {
  @Mutation(returns => User, { nullable: true })
  async resetPassword(@Arg('input')
  {
    token,
    password
  }: ResetPasswordInput): Promise<User> {
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

    return user;
  }
}
