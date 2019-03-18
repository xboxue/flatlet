import * as express from 'express';
import * as next from 'next';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.get('/new-listing/:id', (req, res) => {
      return app.render(req, res, '/new-listing', { id: req.params.id });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.error(error.message);
  }
})();
