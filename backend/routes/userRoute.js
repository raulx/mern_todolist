import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/userController.js";
import { addListItem, deleteItem } from "../controllers/listControllers.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/profile").get(protect, getUser).put(protect, updateUser);
router.route("/profile/logout").post(protect, logoutUser);
router.route("/profile/add").post(protect, addListItem);
router.route("/profile/delete").delete(protect, deleteItem);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
