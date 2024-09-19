import { Router } from 'express';
// import { uploadSong } from '../controllers/publications.controller.js'
// import { authRequired } from '../middlewares/validate.token.js';
// import { validateSchema } from '../middlewares/validate.schema.js'
// import { uploadSongSchema } from '../schemas/publications.schema.js';
// import { uploadSongs } from '../middlewares/multerUpload.js';
// import rateLimit from 'express-rate-limit';

// const updateSongLimiter = rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 2,
//     message: 'Too many login attempts from this IP, please try again after 10 minutes'
// });

const router = Router();

// router.post('/song', updateSongLimiter, authRequired, validateSchema(uploadSongSchema), uploadSongs.single('audio'), uploadSong);

export default router