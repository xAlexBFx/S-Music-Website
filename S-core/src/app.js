import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import https from 'https';
// import fs from 'fs';
import cookieParser from 'cookie-parser';
import interfaceRoutes from './routes/interface.routes.js'
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 's-client')))


// app.use((req, res, next) => {
//     if (!req.secure) {
//         return res.redirect(`https://${req.headers.host}${req.url}`);
//     }
//     next();
// });
app.use(interfaceRoutes);
app.use('/api', authRoutes);
app.use('/user', userRoutes);

app.use((req, res)=>res.redirect('/feed'))


// const privateKey = fs.readFileSync('server.key', 'utf8');
// const certificate = fs.readFileSync('server.cert', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
// const httpsServer = https.createServer(credentials, app);


export {
    __dirname as coreDirName,
    app
}