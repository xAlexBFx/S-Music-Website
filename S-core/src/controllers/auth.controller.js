import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import Config from '../config.js';
import sgMail from '@sendgrid/mail';

export const register = async (req, res) => {
    if(req.body.username && req.body.password && req.body.email) {
        const { username, password, email } = req.body;
        try {
            const foundUserByUsername = await User.findOne({username});
            if(foundUserByUsername) return res.status(401).json({
                'message': 'This username is already in use!',
                'errorStatus': true
            });

            const foundUserByEmail = await User.findOne({email});
            if(foundUserByEmail) return res.status(401).json({
                'message': 'This email is already in use!',
                'errorStatus': true
            });

            const verificationCode = Math.floor(100000 + Math.random() * 900000);

            const passwordHash = await bcrypt.hash(password, 10);
            const verificationCodeHash = await bcrypt.hash(verificationCode.toString(), 10);
            const newUser = new User({
                username,
                password: passwordHash,
                email,
                verificationCode: verificationCodeHash
            });
            const savedUser = await newUser.save();
            const accessToken = await createAccessToken({ _id: savedUser._id });
            res.cookie('accessToken', accessToken)
            res.status(201).json({
                'message': 'New user created successfully!',
                'user': {
                    'username': savedUser.username,
                    'email': savedUser.email,
                    'description': foundUser.description,
                    'role': foundUser.role,
                    'id': savedUser._id,
                    'settings': savedUser.settings,
                    'createdAt': savedUser.createdAt,
                    'updatedAt': savedUser.updatedAt
                },
                'errorStatus': false
            });

            sgMail.setApiKey(Config.MailApiKey)
            const mailMessage = {
                to: `${email}`,
                from: 'alexbetancesx@gmail.com',
                subject: 'S Verification Code',
                html: `<p>Your Verification Code is <strong>${verificationCode}</strong></p>`,
            }
            sgMail.send(mailMessage)
                .catch((err) => {
                    console.log('This is the system:' + err)
                    return;
                })

        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const login = async (req, res) => {
    if(req.body.identification && req.body.password) {
        const { password, identification } = req.body;
        try {
            const foundUserByEmail = await User.findOne({ email: identification });
            const foundUserByUsername = await User.findOne({ username: identification });
            if(!foundUserByEmail && !foundUserByUsername) return res.status(401).json({
                'message' : 'User not found!',
                'errorStatus' : true
            });

            const foundUser = foundUserByEmail? foundUserByEmail : foundUserByUsername;
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if(!isMatch) return res.status(401).json({
                'message' : 'Incorrect Password!',
                'errorStatus' : true
            });

            const accessToken = await createAccessToken({ _id: foundUser._id });
            res.cookie('accessToken', accessToken)
            res.json({
                'message': 'Logged In',
                'user': {
                    'username': foundUser.username,
                    'email': foundUser.email,
                    'description': foundUser.description,
                    'role': foundUser.role,
                    'profileImage': foundUser.profileImage,
                    'presentationImage': foundUser.presentationImage,
                    'id': foundUser._id,
                    'settings': foundUser.settings,
                    'createdAt': foundUser.createdAt,
                    'updatedAt': foundUser.updatedAt
                },
                'errorStatus': false
            });
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('accessToken', '',{
            expires: new Date(0)
        });
        res.json({
            'message' : 'Logged out',
            'errorStatus' : false
        });
    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
};

export const deleteAuth = async (req, res) => {
    try {
            res.cookie('accessToken', '', {
                httpOnly: true,
                secure: false,
                expires: new Date(0),
                path: '/'
            });
            await User.findByIdAndDelete(req.user.id)
                .then(user => {
                    if(!user) return res.status(404).json({
                        message: 'Internal server error',
                        errorStatus : true
                    })
                });
        res.status(202).json();
    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
};

export const verifyAccessToken = async (req, res) => {
    try {
        const { accessToken } = req.cookies;
        if(!accessToken) return res.status(401).json({
            'message' : 'Unauthorized',
            'errorStatus' : true
        });
        jwt.verify(accessToken, Config.secretWebToken, async (err, decoded_user) => {
            if(err) return res.status(401).json({
                'message' : 'Unauthorized',
                'errorStatus' : true
            });
            const foundUser = await User.findById(decoded_user.id);
            if(!foundUser) return res.status(401).json({
                'message' : 'Unauthorized',
                'errorStatus' : true
            });
            res.json({
                'username': foundUser.username,
                'email': foundUser.email,
                'description': foundUser.description,
                'id': foundUser.id,
                'birthday': foundUser.birthday,
                'gender': foundUser.gender,
                'settings': foundUser.settings,
                'nationality': foundUser.nationality,
                'createdAt': foundUser.createdAt,
                'updatedAt': foundUser.updatedAt
            });
        })
    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
}

export const validEmailRequired = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).lean();
        if(user.emailValidated == true) return next();
        return res.redirect('/validation')

    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
};

export const notValidEmailRequired = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).lean();
        if(user.emailValidated === true) return res.redirect('/feed');
        return next();

    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
};

export const verifyEmail = async (req, res) => {
    if(req.body.code) {
        try {
            const { code } = req.body;
            let user = await User.findById(req.user._id);

            const isMatch = bcrypt.compare(code, user.verificationCode);
            if(!isMatch) return res.status(401).json({
                'message' : 'Incorrect Verification Code',
                'errorStatus' : true
            });

            user.emailValidated = true
            user.verificationCode = ''
            await user.save();
            
            res.json({
                'message': 'Email Verified Successfully',
                'errorStatus': false
            });
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'Missing the code',
            'errorStatus': true
        });
    }
};