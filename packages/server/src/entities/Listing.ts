import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Amenities } from './Amenities';
import { User } from './User';

@ObjectType()
@Entity()
export class Listing extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  homeType: string;

  @Field()
  @Column()
  ownerType: string;

  @Field()
  @Column()
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  unit?: string;

  @Field()
  @Column()
  bedrooms: number;

  @Field()
  @Column()
  bathrooms: number;

  @Field()
  @Column()
  sqft: number;

  @Field()
  @Column()
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @ManyToOne(type => User, user => user.listings)
  user: User;

  @OneToOne(type => Amenities)
  @JoinColumn()
  amenities: Amenities;
}
