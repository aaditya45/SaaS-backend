const express = require('express');
const router = express.Router();

const {
    signInUser,
    signUpUser,
    showUser,
} = require('../controllers/userController');
const {
    authMiddleware,
} = require("../middleware/authentication");

router.route('/signin').post(signInUser);
router.route('/signup').post(signUpUser);
router.route('/me').get(authMiddleware, showUser);

module.exports = router;