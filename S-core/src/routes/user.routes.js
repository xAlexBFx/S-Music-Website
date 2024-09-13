import { Router } from 'express';
import { getSettings, updateSettings, updateProfile } from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validate.token.js';
import { validateSchema } from '../middlewares/validate.schema.js'
import { settingsSchema, profileSchema } from '../schemas/user.schema.js';

const router = Router();

router.put('/profile', authRequired, validateSchema(profileSchema), updateProfile);
router.get('/settings', authRequired, getSettings);
router.put('/settings', authRequired, validateSchema(settingsSchema), updateSettings);

export default router