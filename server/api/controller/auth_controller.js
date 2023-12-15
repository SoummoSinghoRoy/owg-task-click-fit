const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../../config/db_config');
const User = db.user;
const env_variable = require('../../config/custom-env-variable');

exports.signupController = async (req, res) => {
  const validation_result = validationResult(req).formatWith(err => err.msg)
  if (!validation_result.isEmpty()) {
    return res.status(400).json({
      errors: validation_result.mapped()
    })
  }
  try {
    const { email, password, type } = req.body;
    const user = await User.findOne({where: { email }})
    if (!user) {
      const hashedpassword = await bcrypt.hash(password, 10);
      const valid_user = await User.create({ email, password: hashedpassword, type })
      res.status(200).json({
        message: `User added successfully`,
        user: {
          email: valid_user.email,
          type: valid_user.type
        }
      })
    } else {
      console.log(`User already exist`);
      res.status(409).json({
        message: `User already exist`
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`
    })
  }
}

exports.loginController = async (req, res) => {
  const validation_result = validationResult(req).formatWith(err => err.msg)
  if (!validation_result.isEmpty()) {
    return res.status(400).json({
      errors: validation_result.mapped()
    })
  }
  try {
    const { email, password } = req.body;
    const valid_user = await User.findOne({where: {email}})
    if (valid_user) {
      const match = await bcrypt.compare(password, valid_user.password);
      if (match) {
        const token = jwt.sign({
          id: valid_user.id,
          username: valid_user.username,
          email: valid_user.email,
          type: valid_user.type
        }, env_variable.secret_key, {expiresIn: '12h'})
        res.cookie('auth_token', 'Bearer ' + token, {expires: new Date(Date.now() + 12 * 3600000)})
        res.status(200).json({
          message: `Loggedin successfully`,
          authorization: true,
          token
        })
      } else {
        return res.status(404).json({
          message: `Password doesn't correct`
        }) 
      }
    } else {
      return res.status(404).json({
        message: `User not found`
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`
    })
  } 
}

exports.logoutController = (req, res) => {
  try {
    res.clearCookie('auth_token')
    return res.status(200).json({
      message: `Loggedout successfully`,
      authorization: false
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`
    })
  }
}