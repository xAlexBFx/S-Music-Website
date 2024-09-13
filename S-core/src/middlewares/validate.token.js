import jwt from 'jsonwebtoken';
import Config from '../config.js';

export const authRequired = (req, res, next) => {
    const { accessToken } = req.cookies;
    if(!accessToken) return res.redirect('/login');

    jwt.verify(accessToken, Config.secretWebToken, (err, decoded_user) => {
        if(err) return res.redirect('/login'); 
        req.user = decoded_user;
        return next();
    })
};

export const notValidated = (req, res, next) => {
    const { accessToken } = req.cookies;
    if(!accessToken) return next();

    jwt.verify(accessToken, Config.secretWebToken, (err, decoded_user) => {
        if(err){
            res.cookie('accessToken', '', {
                httpOnly: true,
                secure: false,
                expires: new Date(0),
                path: '/'
            });
            return res.redirect('/login');
        }
        req.user = decoded_user
        return res.redirect('/validation');
    })
};