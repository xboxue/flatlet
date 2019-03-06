import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Amenities extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  ac: boolean;

  @Field()
  @Column()
  balcony: boolean;

  @Field()
  @Column()
  furnished: boolean;

  @Field()
  @Column()
  parking: boolean;

  @Field()
  @Column()
  laundry: boolean;
}
