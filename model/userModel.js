const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:[true, "Please Enter Email"],
    unique: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: Object,
  },

  profiles: {
    type: Object,
  },
});

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY);
  return token;
};

module.exports = mongoose.model("User", userSchema);
