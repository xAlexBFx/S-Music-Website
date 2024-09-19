import { Router } from 'express';
import { register, login, logout, verifyAccessToken, deleteAuth, verifyEmail, validEmailRequired } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validate.schema.js';
import { registerSchema, loginSchema, emailCodeSchema } from '../schemas/auth.schema.js';
import { authRequired } from '../middlewares/validate.token.js';
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

const registerLimiter = rateLimit({
    windowMs: 35 * 60 * 1000,
    max: 2,
    message: 'Too many register attempts from this IP, please try again after 30 minutes'
});

const router = Router();

router.post('/register', registerLimiter, validateSchema(registerSchema), register);
router.post('/login', loginLimiter, validateSchema(loginSchema), login);
router.post('/validate-email', authRequired, validateSchema(emailCodeSchema), verifyEmail);

router.post('/logout', authRequired, validEmailRequired, logout);
router.delete('/delete-auth', authRequired, validEmailRequired, deleteAuth);
router.get('/verify', authRequired, validEmailRequired, verifyAccessToken);

export default router;