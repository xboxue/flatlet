import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';

@Resolver()
export class Login {
  @Mutation(returns => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: Context
  ): Promise<User> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .addSelect('user.password')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid || !user.confirmed) {
      throw new Error('Incorrect email or password');
    }

    req.session!.userId = user.id;
    return user;
  }
}
