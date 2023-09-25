const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const isAuthentication = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new Error("login first"));
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

  const findUser = await User.findById(decodedToken.id);
  req.user = findUser;
  next();
});

module.exports = { isAuthentication };
