import bcrypt from 'bcrypt';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entities/User';
import { createToken } from '../../../utils/createToken';
import { sendEmail } from '../../../utils/sendEmail';
import { SignupInput } from '../validators/SignupInput';

@Resolver()
export class Signup {
  @Mutation(returns => User)
  async signup(@Arg('data')
  {
    password,
    ...signupInput
  }: SignupInput): Promise<User> {
    const hash = await bcrypt.hash(password, 12);

    const user = User.create({
      ...signupInput,
      password: hash
    });

    await user.save();

    const token = await createToken(user.id);
    sendEmail(user.email, `http://localhost:3000/confirm-user?token=${token}`);

    return user;
  }
}
