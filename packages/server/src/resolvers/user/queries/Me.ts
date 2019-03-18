import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';

@Resolver()
export class Me {
  @Query(returns => User, { nullable: true })
  me(@Ctx() { user }: Context): User | undefined {
    return user;
  }
}
