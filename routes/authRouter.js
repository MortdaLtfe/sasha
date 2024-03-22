import express from "express";
import { signIn, signUp } from "../services/authService.js";
import {
  signUpValidator,
  signInValidator
} from "../utils/validators/authServiceValidator.js";
const router = express.Router();
router.route("/sign-in").post(signInValidator, signIn);
router.route("/sign-up").post(signUpValidator, signUp);
export default router;
