import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    verificationCode: {
        type: String,
        required: false,
        unique: true,
        default: ''
    },
    emailValidated: {
        type: Boolean,
        required: true,
        unique: false,
        default: false
    },
    description: {
        type: String,
    },
    role: {
        type: String,
    },
    settings: {
        language: {
            type: String,
            required: true,
            default: 'english'
        }
    },
},{
    timestamps: true,
})

export default mongoose.model('User', UserSchema);