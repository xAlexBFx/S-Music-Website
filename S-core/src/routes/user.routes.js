import { Router } from 'express';
import { getSettings, updateSettings, updateProfile } from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validate.token.js';
import { validateSchema } from '../middlewares/validate.schema.js'
import { settingsSchema, profileSchema } from '../schemas/user.schema.js';
import { uploadImages } from '../middlewares/multerUpload.js';
import rateLimit from 'express-rate-limit';

const profileDataLimiter = rateLimit({
    windowMs: 60 * 60 * 1000 * 24 * 14,
    max: 1,
    message: 'You can only change your data each 14 days.'
});

const settingsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

const router = Router();

router.put('/profile', profileDataLimiter, authRequired, validateSchema(profileSchema), uploadImages.fields([{name: 'profileImage', maxCount: 1},{name: 'presentationImage', maxCount: 1}]), updateProfile);
router.get('/settings', settingsLimiter, authRequired, getSettings);
router.put('/settings', settingsLimiter, authRequired, validateSchema(settingsSchema), updateSettings);

export default router