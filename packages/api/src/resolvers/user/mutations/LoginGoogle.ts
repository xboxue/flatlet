import { decode } from 'jsonwebtoken';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';
import { findOrCreateUser } from '../../../utils/auth/findOrCreateUser';
import {
  createGoogleUser,
  getGoogleToken,
  GoogleProfile
} from '../../../utils/auth/google';

@Resolver()
export class LoginGoogle {
  @Mutation(returns => User, { nullable: true })
  async loginGoogle(
    @Arg('code') code: string,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    try {
      const { id_token, access_token } = await getGoogleToken(code);
      req.body.access_token = access_token;

      const profile = decode(id_token) as GoogleProfile;
      const profileUser = createGoogleUser(profile);

      const user = await findOrCreateUser(profileUser, 'googleId');

      if (req.session) req.session.userId = user.id;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
