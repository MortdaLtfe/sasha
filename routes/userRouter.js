import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser
} from "../services/userService.js";
import {getUserValidator, updateUserValidator, deleteUserValidator} from '../utils/validators/userServiceValidator.js'
const router = express.Router();

router.route("/").get(getUsers);
router.route("/:user_id").get(getUserValidator,getUser).put(updateUserValidator,updateUser).delete(deleteUserValidator,deleteUser);

export default router;
