import { Router } from 'express';
import { login, signup, verifyToken, logout } from './auth.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', authenticateToken, verifyToken);
router.post('/logout', logout);

export default router;
