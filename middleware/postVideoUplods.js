const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/public/assets/VideoContent");
    },
    filename: (req, file, cb) => {
        cb(null, "posVideoUploads" + Date.now() + "-" + file.originalname)
    }
})
 
module.exports = multer({storage})