import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Listing extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  imageUrl: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  price: number;

  @Field(type => User)
  @ManyToOne(type => User, user => user.listings)
  user: User;
}
