import { Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../../types/Context';

@Resolver()
export class Logout {
  @Mutation(returns => Boolean)
  logout(@Ctx() { req }: Context): Promise<boolean> {
    return new Promise((resolve, reject) =>
      req.session!.destroy(err => {
        if (err) {
          reject(false);
        }
        resolve(true);
      })
    );
  }
}
