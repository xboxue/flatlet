import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { redis } from '../../../shared/redis';

@Resolver()
export class ConfirmUser {
  @Mutation(returns => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(token);

    if (userId) {
      const user = await User.findOne(userId);

      if (user) {
        user.confirmed = true;
        user.save();
        redis.del(token);
        return true;
      }
    }
    return false;
  }
}
