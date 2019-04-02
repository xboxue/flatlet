import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Amenity } from './Amenity';
import { Photo } from './Photo';
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

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(type => [Photo])
  @OneToMany(type => Photo, photo => photo.listing)
  photos: Photo[];

  @Field(type => [Amenity])
  @ManyToMany(type => Amenity)
  @JoinTable()
  amenities: Amenity[];

  @ManyToOne(type => User, user => user.listings)
  user: User;
}
