import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../../../entities/User';

@InputType()
export class PasswordInput implements Partial<User> {
  @Field()
  @MinLength(8)
  password: string;
}
