const db = require('../../config/db_config');
const Image = db.image;

exports.fileUploadController = async (req, res) => {
  try {
    if (req.file) {
      const picUpload = `/upload_images/${req.file.filename}`;
      const attachment = await Image.create({img: picUpload})
      return res.status(200).json({
        message: `Image attached successfully`,
        img: attachment.img
      })
    } else {
      return res.status(409).json({
        message: `Image attachment not processed`,
        img: null
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`
    })
  }
}

exports.filesFetchController = async (req, res) => {
  try {
    const images = await Image.findAll();
    if (images.length !== 0) {
      return res.status(200).json({
        message: `Images successfully fetched`,
        images
      })
    } else {
      return res.status(404).json({
        message: `Images not found`,
        images: null
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal server error`
    })
  }
}