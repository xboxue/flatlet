import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { User } from '../entities/User';

export const initPassport = () => {
  passport.serializeUser<User, number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<User, number>(async (id, done) => {
    const user = await User.findOne(id);
    done(null, user);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: '396342057862074',
        clientSecret: 'a6c2047fce2d4131f633775e73f4a2c1',
        callbackURL: '/auth/facebook/callback',
        profileFields: [
          'id',
          'email',
          'displayName',
          'name',
          'picture.type(large)'
        ]
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = User.create({
          name: profile.displayName ? profile.displayName : '',
          firstName:
            profile.name && profile.name.givenName
              ? profile.name.givenName
              : '',
          lastName:
            profile.name && profile.name.familyName
              ? profile.name.familyName
              : '',
          facebookId: profile.id,
          email: profile.emails ? profile.emails[0].value : '',
          emailVerified: true,
          photoUrl: profile.photos ? profile.photos[0].value : undefined
        });

        try {
          return done(null, await findOrCreateUser(user, 'facebookId'));
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '274846110399-8sgac0nv65j86018iscmd97p34mmdgs3.apps.googleusercontent.com',
        clientSecret: 'TDe5BJ9zy0x1SboJMen555Q_',
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = User.create({
          name: profile.displayName ? profile.displayName : '',
          firstName:
            profile.name && profile.name.givenName
              ? profile.name.givenName
              : '',
          lastName:
            profile.name && profile.name.familyName
              ? profile.name.familyName
              : '',
          googleId: profile.id,
          email: profile.emails ? profile.emails[0].value : '',
          emailVerified: true,
          photoUrl: profile.photos ? profile.photos[0].value : undefined
        });

        try {
          return done(null, await findOrCreateUser(user, 'googleId'));
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const findOrCreateUser = async (user: User, providerId: keyof User) => {
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
