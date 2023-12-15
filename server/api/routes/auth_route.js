const router = require('express').Router();

const { signupController, loginController, logoutController } = require('../controller/auth_controller');
const login_validation = require('../validation/login_validation');
const signup_validation = require('../validation/signup_validation');
const { isLoggedIn, isNotLoggedin } = require('../../middleware/authentication');

router.post('/signup', isNotLoggedin, signup_validation, signupController);
router.post('/login', isNotLoggedin, login_validation, loginController);
router.post('/logout', isLoggedIn, logoutController);

module.exports = router;