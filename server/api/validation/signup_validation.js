const { body } = require('express-validator');

const db = require('../../config/db_config');
const User = db.user;

module.exports = [
  body('email')
    .not().isEmpty().withMessage(`Email can't be empty`)
    .isEmail().withMessage("Email must be valid")
    .normalizeEmail()
    .custom(async email => {
      const user = await User.findOne({ where: { email } })
      if(user) {
        return Promise.reject("Email already exist")
      }
    })
  ,
  body('password')
    .not().isEmpty().withMessage(`Password can't be empty`)
    .isLength({min: 5, max: 10}).withMessage(`Password length should be between 5 to 10 characters`)
  ,
  body('type')
    .not().isEmpty().withMessage(`Type can't be empty`)
];