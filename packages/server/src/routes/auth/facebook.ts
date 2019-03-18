import { Router } from 'express';
import passport from 'passport';

const router = Router();
router.get(
  '/',
  passport.authenticate('facebook', {
    display: 'popup',
    scope: ['email']
  } as any)
);

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/login-redirect?success=true',
    failureRedirect: 'http://localhost:3000/login-redirect?success=false'
  })
);

export default router;
