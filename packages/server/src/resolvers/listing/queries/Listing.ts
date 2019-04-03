import { Arg, ID, Query, Resolver } from 'type-graphql';
import { Listing } from '../../../entities/Listing';

@Resolver()
export class ListingResolver {
  @Query(returns => Listing, { nullable: true })
  listing(@Arg('id', type => ID) id: number): Promise<Listing | undefined> {
    return Listing.findOne(id, {
      relations: ['photos', 'amenities']
    });
  }
}
