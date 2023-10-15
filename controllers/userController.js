const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const sendToken = require("../utils/sendToken");
const {
    BadRequest,
    Unauthorized,
    NotFound,
    CustomAPIError,
  } = require("../errors");

const signInUser = async(req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequest(`Please enter the email and password`);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized(`Invalid email or password`);
    }
    const checkPassword = await user.isPasswordCorrect(password);
    if (!checkPassword) {
      throw new Unauthorized(`Invalid email or passwords`);
    }
    sendToken(user, StatusCodes.OK, res);
}

const signUpUser = async(req,res) => {
    const { email, name, password } = req.body;
    const user = await User.create({
      email,
      name,
      password,
    });
    sendToken(user, StatusCodes.CREATED, res);
}

const showUser = async(req,res) => {
    const user = await User.findById(req.user._id);
    res.status(StatusCodes.OK).json({
      status: true,
      content: {
        data: user
      } 
    });
}

module.exports = {signInUser,signUpUser,showUser}