import { Field, InputType } from 'type-graphql';
import { User } from '../../../entities/User';
import { PasswordInput } from './PasswordInput';

@InputType()
export class ResetPasswordInput extends PasswordInput implements Partial<User> {
  @Field()
  token: string;
}
