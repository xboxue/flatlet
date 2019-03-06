import { Field, InputType } from 'type-graphql';
import { Listing } from '../../../entities/Listing';

@InputType()
export class CreateListingInput implements Partial<Listing> {
  @Field()
  homeType: string;

  @Field()
  ownerType: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  unit?: string;

  @Field()
  bedrooms: number;

  @Field()
  bathrooms: number;

  @Field()
  sqft: number;

  @Field()
  price: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  // @Field()
  // amenities: Amenities;
}
