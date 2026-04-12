import multer from 'multer'

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'temp/upload');
    },
    filename : function (req , file , cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.originalname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });
export default upload;