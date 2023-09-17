import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } else {
    res.status(409);
    throw new Error("Not Authorized !");
  }
});

export default protect;
