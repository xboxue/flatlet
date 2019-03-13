import * as express from 'express';
import app from '../nextapp';

const router = express.Router();

router.get('/location', (req, res) => {
  return app.render(req, res, '/new-listing', { id: 'location' });
});

router.get('/amenities', (req, res) => {
  return app.render(req, res, '/new-listing', { id: 'amenities' });
});

router.get('/beds-and-baths', (req, res) => {
  return app.render(req, res, '/new-listing', { id: 'beds-and-baths' });
});

router.get('/property', (req, res) => {
  return app.render(req, res, '/new-listing', { id: 'property' });
});

router.get('/', (req, res) => {
  res.redirect('/new-listing/property');
});

export default router;
