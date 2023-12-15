const { body } = require('express-validator');

const db = require('../../config/db_config');
const User = db.user;

module.exports = [
  body('email')
    .not().isEmpty().withMessage(`Email can't be empty`)
    .isEmail().withMessage(`Email must be valid`)
    .custom(async email => {
      const user = await User.findOne({ where: { email } })
      if(!user) {
        return Promise.reject(`Email doesn't correct`)
      }
    })
  ,
  body('password')
    .not().isEmpty().withMessage(`Password can't be empty`)
];