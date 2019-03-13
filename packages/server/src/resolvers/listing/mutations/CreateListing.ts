import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Amenity } from '../../../entities/Amenity';
import { Listing } from '../../../entities/Listing';
import { isAuth } from '../../../middleware/isAuth';
import { Context } from '../../../types/Context';
import { CreateListingInput } from '../validators/CreateListingInput';

@Resolver()
export class CreateListing {
  @Mutation(returns => Listing)
  @UseMiddleware(isAuth)
  async createListing(
    @Arg('input') { amenities, ...createListingInput }: CreateListingInput,
    @Ctx() { user }: Context
  ): Promise<Listing> {
    const listing = Listing.create({
      ...createListingInput,
      user
    });

    listing.amenities = await Promise.all(
      amenities.map(amenity => Amenity.create({ name: amenity }).save())
    );

    await listing.save();

    return listing;
  }
}
