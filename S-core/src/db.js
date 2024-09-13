import mongoose from "mongoose";
import Config from './config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(Config.dbConfig.uri)
        console.log('>>> DB connected')
    } catch (err) {
        console.log(err)
    }
};