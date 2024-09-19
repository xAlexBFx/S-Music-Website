import User from '../models/User.js';

export const updateProfile = async (req, res) => {
    if(req.body.username || req.body.role || req.body.description || req.files) {
        try {
            const user = await User.findById(req.user._id);
            if(!user) return res.status(404).json({
                'message': 'User not found!',
                'errorStatus': true
            });
            const updateData = req.body;

            Object.keys(updateData).forEach(key => {
                user[key] = updateData[key];
            });

            if (req.files['profileImage']) {
                const file = req.files['profileImage'][0];
                const base64String = file.buffer.toString('base64');

                user.profileImage = {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    imageUrl: `data:${file.mimetype};base64,${base64String}`
                };
            }

            if (req.files['presentationImage']) {
                const file = req.files['presentationImage'][0];
                const base64String = file.buffer.toString('base64');

                user.presentationImage = {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    imageUrl: `data:${file.mimetype};base64,${base64String}`
                };
            }

            const updatedUser = await user.save();

            if(!updatedUser) return res.status(404).json({
                'message': 'Internal server error updating user data',
                'errorStatus': true
            });
            return res.json({
                'updatedProfileData': {
                    username: updatedUser.username,
                    role: updatedUser.role,
                    description: updatedUser.description,
                    profileImage: updatedUser.profileImage,
                    presentationImage: updatedUser.presentationImage
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
            'message': 'Empty Request, no data given!',
            'errorStatus': true
        });
    }
};

export const getSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({
            'message': 'User not found!',
            'errorStatus': true
        });

        res.json({
            'settings': user.settings,
            errorStatus: false
        })
    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
};

export const updateSettings = async (req, res) => {
    if(req.body.settings) {
        try {
            const newSettings = await User.findByIdAndUpdate(req.user.id, {settings: req.body.settings}, {new: true});
            res.json({
                'settings': newSettings.settings,
                errorStatus: false
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


