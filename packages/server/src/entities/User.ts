import { Field, ID, ObjectType, Root } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Listing } from './Listing';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(type => [Listing])
  @OneToMany(type => Listing, listing => listing.user)
  listings: Listing[];

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  confirmed: boolean;
}
