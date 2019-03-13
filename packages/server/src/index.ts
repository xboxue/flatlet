import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { redis } from './shared/redis';
import { Context } from './types/Context';

async function bootstrap() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.ts'],
    authChecker: ({ context: { req } }) => {
      return !!req.session!.userId;
    }
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }: Context) => ({ req })
  });

  const app = express();
  const redisStore = connectRedis(session);

  app.use(
    session({
      name: 'sessionId',
      secret: 'fixme',
      store: new redisStore({
        client: redis as any
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000
      }
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost:3000'
    }
  });

  app.listen({ port: 4000 }, () =>
    console.log(`Server read at http://localhost:4000${server.graphqlPath}`)
  );
}

bootstrap();
