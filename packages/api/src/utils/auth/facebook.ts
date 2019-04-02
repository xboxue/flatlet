import axios from 'axios';
import { User } from '../../entities/User';

export interface FacebookProfile {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: {
    data: {
      is_silhouette: boolean;
      url: string;
    };
  };
}

export interface FacebookData {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export const createFacebookUser = (profile: FacebookProfile) =>
  User.create({
    name: profile.name ? profile.name : '',
    firstName: profile.first_name ? profile.first_name : '',
    lastName: profile.last_name ? profile.last_name : '',
    facebookId: profile.id,
    email: profile.email ? profile.email : '',
    photoUrl: !profile.picture.data.is_silhouette
      ? profile.picture.data.url
      : undefined
  });

export const getFacebookToken = async (code: string): Promise<FacebookData> => {
  const { data } = await axios.get<FacebookData>(
    'https://graph.facebook.com/v3.2/oauth/access_token',
    {
      params: {
        client_id: '396342057862074',
        client_secret: 'a6c2047fce2d4131f633775e73f4a2c1',
        redirect_uri: 'http://localhost:3000/oauth-callback',
        code
      }
    }
  );

  return data;
};

export const getFacebookProfile = async (
  token: string
): Promise<FacebookProfile> => {
  const fields = [
    'id',
    'name',
    'email',
    'picture.type(large){is_silhouette,url}',
    'first_name',
    'last_name'
  ];

  const { data } = await axios.get<FacebookProfile>(
    'https://graph.facebook.com/me',
    {
      params: {
        fields: fields.join(','),
        access_token: token
      }
    }
  );

  return data;
};
