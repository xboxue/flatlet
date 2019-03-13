import * as express from 'express';
import app from './nextapp';
import listingRoute from './routes/listing';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const handle = app.getRequestHandler();

const server = express();
server.use('/new-listing', listingRoute);

(async () => {
  try {
    await app.prepare();

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.error(error.message);
  }
})();
