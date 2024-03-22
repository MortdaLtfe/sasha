import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import User from "../../models/User.js";
export const signInValidator = [
  check("email").isEmail().withMessage("Invalid Email"),
  check("password")
    .notEmpty()
    .withMessage("Password is reqired")
    .isLength({ min: 7 })
    .withMessage("min Password lengrh is 7"),
  validatorMiddleware
];
export const signUpValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async email => {
      const isUsed = await User.findOne({ email });
      if (isUsed) {
        throw new Error("Email Already Used");
      }
    }),
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Min length must be 3 or more")
    .custom(async username => {
      const isUsed = await User.findOne({ username });
      if (isUsed) {
        throw new Error("Username not aviliable");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is reqired")
    .isLength({ min: 7 })
    .withMessage("min Password lengrh is 7"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name too short"),
  check("bio").isLength({ max: 330 }).withMessage("Max length 330"),
  validatorMiddleware
];
