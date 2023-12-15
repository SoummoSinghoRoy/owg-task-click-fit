const router = require('express').Router();

const { isLoggedIn } = require('../../middleware/authentication');
const fileUpload = require('../../middleware/fileUploadHandle');
const upload = fileUpload.single('demoImg');
const { fileUploadController, filesFetchController } = require('../controller/image_controller');

const imgUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(409).json({
        message: `Attachment must be less than 500kb`
      })
    } else {
      next()
    }
  })
}

router.post('/upload', isLoggedIn, imgUpload, fileUploadController);
router.get('/fetch', isLoggedIn, filesFetchController);

module.exports = router;