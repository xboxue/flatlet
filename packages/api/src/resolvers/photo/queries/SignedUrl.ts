import AWS from 'aws-sdk';
import { Query, Resolver } from 'type-graphql';
import uuidv4 from 'uuid/v4';

@Resolver()
export class SignedUrl {
  @Query()
  signedUrl(): string {
    const s3 = new AWS.S3({
      accessKeyId: 'AKIA2VMIOIUDGESZQJOC',
      secretAccessKey: '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',
      region: 'ca-central-1',
      signatureVersion: 'v4'
    });

    const key = uuidv4();
    const params = {
      Bucket: 'flatlet',
      Key: key,
      ACL: 'public-read'
    };

    const url = s3.getSignedUrl('putObject', params);

    return url;
  }
}
