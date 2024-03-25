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
    .withMessage("Author Required")
    .custom(async (val, { req }) => {
      if (req.token.userInfo.uid != val) {
        throw new Error("You're not allow to this route");
      }
    }),
  // .isMongoId()
  // .withMessage("Invalidat ID")
  validatorMiddleware
];
export const updatePostValidator = [
  check("post_id")
    .notEmpty()
    .withMessage("post_id Required")
    .isMongoId()
    .withMessage("Invalid Id")
    .custom(async (val, { req }) => {
      const user = await Post.findOne({ _id: val });
      
      if (
        req.token.userInfo.uid != user.author &&
        req.token.userInfo.role != "admin"
      ) {
        throw new Error("You're not allow to this route");
      }
    }),
  validatorMiddleware
];
export const deletePostValidator = [
  check("post_id")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (val, { req }) => {
      const user = await Post.findOne({ _id: val });

      if (
        req.token.userInfo.uid != user.author &&
        req.token.userInfo.role != "admin"
      ) {
        throw new Error("You're not allow to this route");
      }
    }),
  validatorMiddleware
];
export const addLikeToPostValidator = [
  check("like")
    .notEmpty()
    .withMessage("like Is required ")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (val, { req }) => {
      if (req.token.userInfo.uid != val) {
        throw new Error("You're not allow to this route");
      }
    })
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
  check("like_id")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (val, { req }) => {
      const user = await Post.findOne({ _id: val }).likes.includes(
        req.token.userId
      );
      if (
        req.token.userInfo.uid != user.author &&
        req.token.userInfo.role != "admin"
      ) {
        throw new Error("You're not allow to this route");
      }
    }),
  validatorMiddleware
];
