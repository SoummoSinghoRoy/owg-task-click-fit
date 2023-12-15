const {jwtDecode} = require('jwt-decode');
const db = require('../config/db_config');
const User = db.user;

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers['auth_token'];
    if (token) {
      const decode = jwtDecode(token)
      const valid_user = await User.findOne({where: {id: decode.id}})
      if (valid_user) next()
    } else {
      return res.status(401).json({
        message: `Unauthorized user`
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal server error`
    })
  }
}

exports.isNotLoggedin = (req, res, next) => {
  const token = req.headers['auth_token'];
  if (!token) {
    next()
  } else {
    return res.status(403).json({
      message: `Already loggedin`
    })
  }
}