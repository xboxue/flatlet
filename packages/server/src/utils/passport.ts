import { objectToParams } from '@flatlet/common';
import axios from 'axios';
import { Request } from 'express';
import passport from 'passport';
import FacebookTokenStrategy, { Profile } from 'passport-facebook-token';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import { User } from '../entities/User';

interface AuthResult {
  profile: Profile;
  info: any;
}

export const initPassport = () => {
  passport.serializeUser<User, number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<User, number>(async (id, done) => {
    const user = await User.findOne(id);
    done(null, user);
  });

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: '396342057862074',
        clientSecret: 'a6c2047fce2d4131f633775e73f4a2c1',
        profileFields: [
          'id',
          'email',
          'displayName',
          'name',
          'picture.type(large)'
        ]
      },
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  );

  passport.use(
    new GoogleTokenStrategy(
      {
        clientID:
          '274846110399-8sgac0nv65j86018iscmd97p34mmdgs3.apps.googleusercontent.com',
        clientSecret: 'TDe5BJ9zy0x1SboJMen555Q_'
      },
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  );
};

export const createFacebookUser = (profile: Profile) =>
  User.create({
    name: profile.displayName ? profile.displayName : '',
    firstName:
      profile.name && profile.name.givenName ? profile.name.givenName : '',
    lastName:
      profile.name && profile.name.familyName ? profile.name.familyName : '',
    facebookId: profile.id,
    email: profile._json.email ? profile._json.email : '',
    emailVerified: true,
    photoUrl:
      profile._json.picture.url && !profile._json.picture.data.is_silhouette
        ? profile._json.picture.url
        : undefined
  });

export const createGoogleUser = (profile: Profile) =>
  User.create({
    name: profile.displayName ? profile.displayName : '',
    firstName:
      profile.name && profile.name.givenName ? profile.name.givenName : '',
    lastName:
      profile.name && profile.name.familyName ? profile.name.familyName : '',
    googleId: profile.id,
    email: profile._json.email ? profile._json.email : '',
    emailVerified: true,
    photoUrl: profile._json.picture ? profile._json.picture : undefined
  });

export const findOrCreateUser = async (user: User, providerId: keyof User) => {
  const providerUser = await User.findOne({ [providerId]: user[providerId] });
  if (providerUser) return providerUser;

  // Link accounts
  const emailUser = await User.findOne({ email: user.email });
  if (emailUser) {
    emailUser[providerId] = user[providerId];
    return emailUser.save();
  }

  return user.save();
};

export const getFacebookToken = (code: string) => {
  const params = {
    client_id: '396342057862074',
    client_secret: 'a6c2047fce2d4131f633775e73f4a2c1',
    redirect_uri: 'http://localhost:3000/oauth-callback',
    code
  };

  const url = `https://graph.facebook.com/v3.2/oauth/access_token?${objectToParams(
    params
  )}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        resolve(response.data.access_token);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

export const getGoogleToken = (code: string) => {
  const params = {
    client_id:
      '274846110399-8sgac0nv65j86018iscmd97p34mmdgs3.apps.googleusercontent.com',
    client_secret: 'TDe5BJ9zy0x1SboJMen555Q_',
    redirect_uri: 'http://localhost:3000/oauth-callback',
    grant_type: 'authorization_code',
    code
  };

  const url = `https://www.googleapis.com/oauth2/v4/token?${objectToParams(
    params
  )}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url)
      .then(response => {
        resolve(response.data.access_token);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

export const passportAuthenticate = (
  strategy: string,
  req: Request
): Promise<AuthResult> =>
  new Promise((resolve, reject) => {
    // res object not needed
    passport.authenticate(strategy, (err, profile, info) => {
      if (err) reject(err);
      resolve({ profile, info });
    })(req, {});
  });

export const passportLogin = (req: Request, user: User): Promise<User> =>
  new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) reject(err);
    });
    resolve(user);
  });
