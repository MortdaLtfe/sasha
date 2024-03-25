import express from "express";
import {
  signIn,
  signUp,
  changePassword,
  changeEmail,
  protect
} from "../services/authService.js";
import {
  signUpValidator,
  signInValidator,
  changeEmailValidator,
  changePasswordValidator
} from "../utils/validators/authServiceValidator.js";
const router = express.Router();
router.route("/sign-in").post(signInValidator, signIn);
router.route("/sign-up").post(signUpValidator, signUp);
router.route("/change-password").post(protect, changePasswordValidator,changePassword);
router.route("/change-email").post(protect,changeEmailValidator, changeEmail);
export default router;
