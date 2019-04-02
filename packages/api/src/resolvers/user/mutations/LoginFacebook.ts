import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';
import {
  createFacebookUser,
  getFacebookProfile,
  getFacebookToken
} from '../../../utils/auth/facebook';
import { findOrCreateUser } from '../../../utils/auth/findOrCreateUser';

@Resolver()
export class LoginFacebook {
  @Mutation(returns => User, { nullable: true })
  async loginFacebook(
    @Arg('code') code: string,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    try {
      const { access_token } = await getFacebookToken(code);
      req.body.access_token = access_token;

      const profile = await getFacebookProfile(access_token);
      const profileUser = createFacebookUser(profile);

      const user = await findOrCreateUser(profileUser, 'facebookId');

      if (req.session) req.session.userId = user.id;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
