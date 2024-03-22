import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser
} from "../services/userService.js";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/:user_id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
