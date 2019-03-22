import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import authenticate from './middleware/authenticate';
import session from './middleware/session';

(async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.ts'],
    authChecker: ({ context: { user } }) => {
      return !!user;
    }
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
      user: req.user
    })
  });

  const app = express();

  app.use(session);
  app.use(authenticate);

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
})();
