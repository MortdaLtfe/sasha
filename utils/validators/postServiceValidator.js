import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Post from "../../models/Post.js";
import jwt from "jsonwebtoken";
export const getPostValidator = [
  check("post_id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware
];
export const createPostValidator = [
  check("content").notEmpty().withMessage("Content Required"),
  check("author")
    .notEmpty()
    .withMessage("Author Required"),
  // .isMongoId()
  // .withMessage("Invalidat ID")
  validatorMiddleware
];
export const updatePostValidator = [
  check("post_id")
    .notEmpty()
    .withMessage("post_id Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware
];
export const deletePostValidator = [
  check("post_id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware
];
export const addLikeToPostValidator = [
  check("like")
    .notEmpty()
    .withMessage("like Is required ")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (value, { req }) => {
      const post = await Post.findOne({ _id: req.params.post_id });
      const isLiked = post.likes.find(val => val == req.body.like);
      if (isLiked) {
        throw new Error("You already Liked");
      }
    }),
  validatorMiddleware
];
export const deleteLikeValidator = [
  check("like_id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware
];
