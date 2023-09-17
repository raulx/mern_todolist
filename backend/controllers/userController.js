import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

function getUser(req, res) {
  res.json({
    name: req.user.name,
    email: req.user.email,
    pendingTasks: req.user.list,
  });
}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      name: user.name,
      id: user._id,
      list: user.list,
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized ! either password or email is incorrect.");
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      status: res.statusCode,
      message: "user already exists,login to access!",
    });
  } else {
    const newUser = await User.create({ name, email, password });
    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        name: newUser.name,
        id: newUser._id,
        list: newUser.list,
      });
    }
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out succesfully" });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      list: updatedUser.list,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUser, registerUser, loginUser, logoutUser, updateUser };
