import { Router } from "express"
import path from "path";
import { coreDirName } from "../app.js";
import { authRequired, notValidated} from '../middlewares/validate.token.js';
import { validEmailRequired, notValidEmailRequired } from '../controllers/auth.controller.js';

const router = Router();

router.get('/login', notValidated, (req, res) => { res.sendFile(path.join(coreDirName, 's-client', 'login', 'login.html')) })
router.get('/register', notValidated, (req, res) => { res.sendFile(path.join(coreDirName, 's-client', 'register', 'register.html')) })

router.get('/validation', authRequired, notValidEmailRequired, (req, res) => { res.sendFile(path.join(coreDirName, 's-client', 'validation', 'validation.html')) })

router.get('/feed', authRequired , validEmailRequired, (req, res) => { res.sendFile(path.join(coreDirName, 's-client', 'feed', 'feed.html')) })

router.get('/profile', authRequired , validEmailRequired, (req, res) => { res.sendFile(path.join(coreDirName, 's-client', 'profile', 'profile.html')) })
router.get('/settings', authRequired , validEmailRequired, (req, res) => { res.sendFile(path.join(coreDirName, 's-client', 'settings', 'settings.html')) })
router.get('/create', authRequired , validEmailRequired, (req, res) => { res.sendFile(path.join(coreDirName, 's-client', 'create', 'create.html')) })

export default router;