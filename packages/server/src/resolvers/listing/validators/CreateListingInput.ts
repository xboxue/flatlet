import { Field, InputType, Int } from 'type-graphql';
import { Listing } from '../../../entities/Listing';

@InputType()
export class CreateListingInput implements Partial<Listing> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  imageUrl: string;

  @Field()
  location: string;

  @Field(type => Int)
  price: number;
}
