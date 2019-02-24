import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Listing } from '../../../entities/Listing';
import { isAuth } from '../../../middleware/isAuth';
import { Context } from '../../../types/Context';
import { CreateListingInput } from '../validators/CreateListingInput';

@Resolver()
export class CreateListing {
  @Mutation(returns => Listing)
  @UseMiddleware(isAuth)
  async createListing(
    @Arg('data') createListingInput: CreateListingInput,
    @Ctx() { user }: Context
  ): Promise<Listing> {
    const listing = Listing.create({
      ...createListingInput,
      user
    });

    await listing.save();

    return listing;
  }
}
