import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';
import {
  createGoogleUser,
  findOrCreateUser,
  getGoogleToken,
  passportAuthenticate,
  passportLogin
} from '../../../utils/passport';

@Resolver()
export class LoginGoogle {
  @Mutation(returns => User, { nullable: true })
  async loginGoogle(
    @Arg('code') code: string,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    try {
      const accessToken = await getGoogleToken(code);
      req.body.access_token = accessToken;

      const { profile, info } = await passportAuthenticate('google-token', req);

      const profileUser = createGoogleUser(profile);
      const user = await findOrCreateUser(profileUser, 'googleId');

      await passportLogin(req, user);

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
