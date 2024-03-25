import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import ApiError from "../utils/apiError.js";

const createToken = user => {
  return jwt.sign(
    { userInfo: { uid: user._id, role: user.role } },
    process.env.SECRET_KEY
  );
};
/**
 * @desc    Create An Account in website
 * @route   @POST /api/v1/auth/sign-up
 * @acsess  @Public
 */
export const signUp = asyncHandler(async (req, res) => {
  const data = req.body;
  const user = await User.create(data);
  const token = createToken(user);
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
  const token = createToken(user);
  return res.json({ user, token });
});
/**
 * @desc    Validate the Token and send it inside request
 */
export const protect = async (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .json({ message: "You're not authorized, Please Login 1" });

  const token = req.headers.authorization.split(" ")[1];
  
  // 1)  Check if token is valid
  const user = await jwt.verify(token, process.env.SECRET_KEY);

  // 2) Check if the user inside the token is Active or avilable
  const isAvilableUser = await User.findOne({ _id: user.userInfo.uid });
  if (!isAvilableUser) {
    return res
      .status(401)
      .json({ message: "You're not authorized, Please Login " });
  }
  // send the token through request
  req.token = user;
  console.log(user);
  next();
};
