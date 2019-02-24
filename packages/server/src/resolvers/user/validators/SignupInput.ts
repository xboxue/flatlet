import { IsAlpha, IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../../../entities/User';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';
import { PasswordInput } from './PasswordInput';

@InputType()
export class SignupInput extends PasswordInput implements Partial<User> {
  @Field()
  @IsAlpha()
  @Length(2, 255)
  firstName: string;

  @Field()
  @IsAlpha()
  @Length(2, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already exists' })
  email: string;
}
