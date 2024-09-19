import multer from 'multer';

const storage = multer.memoryStorage();
export const uploadImages = multer({ storage });

export const uploadSongs = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, //50MB max
});