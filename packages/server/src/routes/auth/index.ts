import { Router } from 'express';
import facebookAuthRoutes from './facebook';
import googleAuthRoutes from './google';

const router = Router();

router.use('/facebook', facebookAuthRoutes);
router.use('/google', googleAuthRoutes);

export default router;
