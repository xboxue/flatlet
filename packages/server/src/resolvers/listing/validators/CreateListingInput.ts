import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateListingInput {
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

  @Field(type => [String])
  amenities: string[];
}
