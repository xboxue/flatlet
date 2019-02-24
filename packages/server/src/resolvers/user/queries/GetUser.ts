import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';

@Resolver()
export class GetUser {
  @Query(returns => User, { nullable: true })
  async getUser(@Ctx() { req }: Context): Promise<User | undefined> {
    if (req.session && req.session.userId) {
      return User.findOne(req.session.userId);
    }
    return undefined;
  }
}
