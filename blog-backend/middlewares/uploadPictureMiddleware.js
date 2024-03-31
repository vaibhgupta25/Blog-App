const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024    // not more than 5mb
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            cb(new Error("Only images are allowed"))
        }
        cb(null, true);
    }
})

