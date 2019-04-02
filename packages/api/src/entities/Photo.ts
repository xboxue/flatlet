import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Listing } from './Listing';

@ObjectType()
@Entity()
export class Photo extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field(type => Listing)
  @ManyToOne(type => Listing, listing => listing.photos)
  listing: Listing;
}
