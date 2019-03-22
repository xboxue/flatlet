import axios from 'axios';
import { User } from '../../entities/User';

export interface GoogleProfile {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}

export interface GoogleData {
  access_token: string;
  token_type: string;
  expires_in: string;
  id_token: string;
  refresh_token?: string;
}

export const createGoogleUser = (id: GoogleProfile) =>
  User.create({
    name: id.name ? id.name : '',
    firstName: id.given_name ? id.given_name : '',
    lastName: id.family_name ? id.family_name : '',
    googleId: id.sub,
    email: id.email ? id.email : '',
    photoUrl: id.picture ? id.picture : undefined
  });

export const getGoogleToken = async (code: string): Promise<GoogleData> => {
  const { data } = await axios.post<GoogleData>(
    'https://www.googleapis.com/oauth2/v4/token',
    {
      client_id:
        '274846110399-8sgac0nv65j86018iscmd97p34mmdgs3.apps.googleusercontent.com',
      client_secret: 'TDe5BJ9zy0x1SboJMen555Q_',
      redirect_uri: 'http://localhost:3000/oauth-callback',
      grant_type: 'authorization_code',
      code
    }
  );

  return data;
};
