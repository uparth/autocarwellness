import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes.js';
import carsRouter from '../modules/cars/cars.routes.js';
import dealersRouter from '../modules/dealers/dealers.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'autocarwellness-backend', timestamp: new Date().toISOString() });
});

router.use('/auth', authRouter);
router.use('/cars', carsRouter);
router.use('/dealers', dealersRouter);

export default router;
