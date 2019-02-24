import { Query, Resolver } from 'type-graphql';
import { Listing } from '../../../entities/Listing';

@Resolver()
export class GetListings {
  @Query(returns => [Listing])
  listings(): Promise<Listing[]> {
    return Listing.find({ relations: ['user'] });
  }
}
