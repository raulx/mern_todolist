import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const addListItem = asyncHandler(async (req, res) => {
  let user = req.user;
  const itemToadd = { id: req.body.id, item: req.body.item };
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $push: { list: itemToadd } },
    { new: true }
  );

  res.json({
    name: updatedUser.name,
    id: updatedUser.id,
    list: updatedUser.list,
  });
});

const deleteItem = asyncHandler(async (req, res) => {
  let user = req.user;
  const itemToDelete = req.body.id;
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { list: { id: itemToDelete } } },
    { new: true }
  );
  res.json({
    name: updatedUser.name,
    id: updatedUser.id,
    list: updatedUser.list,
  });
});

export { addListItem, deleteItem };
