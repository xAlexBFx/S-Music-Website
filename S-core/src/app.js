import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import interfaceRoutes from './routes/interface.routes.js'
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import publicationsRoutes from './routes/publications.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 's-client')))


app.use(interfaceRoutes);
app.use('/api', authRoutes);
app.use('/user', userRoutes);
app.use('/upload', publicationsRoutes);

app.use((req, res)=>res.redirect('/feed'))

export {
    __dirname as coreDirName,
    app
}