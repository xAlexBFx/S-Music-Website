import Mongoose from "mongoose";

const SongSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fromUser: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    file: {
        type: Buffer,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    size: {
        type: Number,  
        required: true,
    },
    profileImage: {
        filename: String,
        contentType: String,
        imageUrl: String
    },
},{
    timestamps: true,
})

export default Mongoose.model('Song', SongSchema);