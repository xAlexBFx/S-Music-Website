// import Song from '../models/Song.js';

// export const uploadSong = async (req, res) => {
//     if(req.file) {
//         try {
//             const newSong = new Song({
//                 title: req.body.title,
//                 fromUser: req.user._id,
//                 file: req.file.buffer,
//                 format: req.file.mimetype,
//                 size: req.file.size,
//             });
//             console.log(newSong)
//             // await newSong.save();

//         } catch (err) {
//             console.log(err);
//             res.json({
//                 'message': 'Internal server error',
//                 'errorStatus': true
//             });
//         }
//     } else {
//         res.json({
//             'message': 'Empty Request, no file given!',
//             'errorStatus': true
//         });
//     }
// };
