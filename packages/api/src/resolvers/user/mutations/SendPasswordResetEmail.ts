import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { createToken } from '../../../utils/createToken';
import { sendEmail } from '../../../utils/sendEmail';

@Resolver()
export class SendPasswordResetEmail {
  @Mutation(returns => Boolean)
  async sendPasswordResetEmail(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const token = await createToken(user.id);
    sendEmail(email, `http://localhost:3000/user/forgot/${token}`);
    return true;
  }
}
