import { Arg, ID, Mutation, Resolver } from 'type-graphql';
import { Listing } from '../../../entities/Listing';
import { Photo } from '../../../entities/Photo';

@Resolver()
export class UploadPhoto {
  @Mutation(returns => Photo, { nullable: true })
  async uploadPhoto(
    @Arg('id', type => ID) id: number,
    @Arg('url') url: string
  ): Promise<Photo | null> {
    const listing = await Listing.findOne(id);
    if (!listing) throw new Error('Something went wrong');

    const photo = Photo.create({
      url: 'https://d2980hatawpma9.cloudfront.net' + url,
      listing
    });

    await photo.save();

    return photo;
  }
}
