import { Router } from 'express';
import passport from 'passport';

const router = Router();
router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/login-redirect?success=true',
    failureRedirect: 'http://localhost:3000/login-redirect?success=false'
  })
);

export default router;
