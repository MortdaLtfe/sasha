import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import User from "../../models/User.js";
export const getUserValidator = [
  check("user_id").isMongoId().withMessage("Invalid MongoId"),
  validatorMiddleware
];

export const updateUserValidator = [
  check("user_id").isMongoId().withMessage("Invalid MongoId"),
  check("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Min length must be 3 or more")
    .custom(async username => {
      const isUsed = await User.findOne({ username });
      if (isUsed) {
        throw new Error("Username not aviliable");
      }
    }),
  check("name").optional().isLength({ min: 2 }).withMessage("Name too short"),
  check("bio").optional().isLength({ max: 330 }).withMessage("Max length 330"),
  validatorMiddleware
];

export const deleteUserValidator = [
  check("user_id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware
];
