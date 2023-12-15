const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload_images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 500
  },
  fileFilter: (req, file, cb) => {
    const imgType = /jpeg|jpg|png/
    const extName = imgType.test(path.extname(file.originalname).toLowerCase())
    const mimeType = imgType.test(file.mimetype)

    if(extName && mimeType) {
      cb(null, true)
    } else {
      cb(new Error('Only accept images & types: jpeg, jpg or png'))
    }
  } 
})

module.exports = upload;