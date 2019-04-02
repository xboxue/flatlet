import connectRedis from 'connect-redis';
import session from 'express-session';
import { redis } from '../shared/redis';

const RedisStore = connectRedis(session);

export default session({
  name: 'sessionId',
  secret: 'fixme',
  store: new RedisStore({
    client: redis as any
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000
  }
});
