const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateSnowflake } = require('../utils/snowflake_generator');
require('./snowflakeModel'); 

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.Snowflake,
    default: () => generateSnowflake(1),
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: mongoose.Schema.Types.Snowflake,
    ref: 'Role',
    select: false,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.createJWT = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

UserSchema.methods.isPasswordCorrect = async function (inputPassword) {
  const isPasswordMatch = await bcrypt.compare(inputPassword, this.password);
  return isPasswordMatch;
};

module.exports = mongoose.model('User', UserSchema);
