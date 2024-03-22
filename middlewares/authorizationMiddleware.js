import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
export default asyncHandler(async function (req, res, next) {
  if (!req.headers.authorization)
    return res
      .status(401)
      .json({ message: "You're not authorized, Please Login 1" });
  const token = req.headers.authorization.split(" ")[1];
  const user = await jwt.verify(token, process.env.SECRET_KEY);

  const isAvilableUser = await User.findOne({ _id: user.uid });
  if (!isAvilableUser) {
    return res
      .status(401)
      .json({ message: "You're not authorized, Please Login " });
  }

  next();
});
