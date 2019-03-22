import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';
import {
  createFacebookUser,
  findOrCreateUser,
  getFacebookToken,
  passportAuthenticate,
  passportLogin
} from '../../../utils/passport';

@Resolver()
export class LoginFacebook {
  @Mutation(returns => User, { nullable: true })
  async loginFacebook(
    @Arg('code') code: string,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    try {
      const accessToken = await getFacebookToken(code);
      req.body.access_token = accessToken;

      const { profile, info } = await passportAuthenticate(
        'facebook-token',
        req
      );

      const profileUser = createFacebookUser(profile);
      const user = await findOrCreateUser(profileUser, 'facebookId');

      await passportLogin(req, user);

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
