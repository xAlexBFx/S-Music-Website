import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
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
    profileImage: {
        filename: String,
        contentType: String,
        imageUrl: String
    },
    presentationImage: {
        filename: String,
        contentType: String,
        imageUrl: String
    },
    songs: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Song',
    }],
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

export default Mongoose.model('User', UserSchema);