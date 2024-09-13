import User from '../models/User.js';

export const updateProfile = async (req, res) => {
    if(req.body.username || req.body.role || req.body.description) {
        try {
            const user = await User.findById(req.user.id);
            if(!user) return res.status(404).json({
                'message': 'User not found!',
                'errorStatus': true
            });

            const newSettings = { ...user.settings, ...req.body };
            console.log(newSettings)
            return res.json({
                'newSettings':`${newSettings}`,
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


