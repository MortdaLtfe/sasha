import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import ApiError from "../utils/apiError.js";

/**
 * @desc    Create An Account in website
 * @route   @POST /api/v1/auth/sign-up
 * @acsess  @Public
 */
export const signUp = asyncHandler(async (req, res) => {
  const data = req.body;
  const user = await User.create(data);
  const token = jwt.sign({ uid: user._id }, process.env.SECRET_KEY);
  return res.status(201).json({ user, token });
});

/**
 * @desc    Login to The website
 * @route   @POST /api/v1/auth/sign-in
 * @acsess  @Public
 */
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Email or Password is Incorrect", 400));
  }
  const token = jwt.sign({ uid: user._id }, process.env.SECRET_KEY);
  return res.json({ user, token });
});


