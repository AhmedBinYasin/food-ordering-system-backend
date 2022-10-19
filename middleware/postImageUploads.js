const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/public/assets/ImageContent");
    },
    filename: (req, file, cb) => {
        cb(null, "postImageUploads" + Date.now() + "-" + file.originalname)
    }
})
 
module.exports = multer({storage})