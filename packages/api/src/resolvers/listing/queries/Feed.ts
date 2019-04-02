import { Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Listing } from '../../../entities/Listing';

@Resolver()
export class Feed {
  @Query(returns => [Listing])
  feed(): Promise<Listing[]> {
    return getConnection()
      .createQueryBuilder()
      .select('listing')
      .from(Listing, 'listing')
      .leftJoinAndSelect('listing.amenities', 'amenity')
      .innerJoinAndSelect('listing.photos', 'photo')
      .getMany();
  }
}
