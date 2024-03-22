import User from "../models/User.js";
import asyncHandler from "express-async-handler";
/**
 * @desc    Get All Users
 * @route   @GET /api/v1/user/
 * @acsess  @Public
 */
export const getUsers = async (req, res) => {
  const results = await User.find();
  return res.json({ results });
};
/**
 * @desc    Get Specific User
 * @route   @GET /api/v1/user/:user_id
 * @acsess  @Public
 */
export const getUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const results = await User.findOne({ _id: user_id });
  return res.json({ results });
});
/**
 * @desc    Uodate The Account
 * @route   @PUT /api/v1/user/:user_id
 * @acsess  @Private
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  const user = await User.findOneAndUpdate({ _id: user_id }, data, {
    new: true
  });
  return res.json({ user });
});
/**
 * @desc    Delete The Account
 * @route   @DELETE /api/v1/user/:user_id
 * @acsess  @Private
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findOneAndDelete({ _id: user_id });
  return res.json({ user });
});

// To Create User you have to Sign-Up in /api/v1/auth/sign-up
