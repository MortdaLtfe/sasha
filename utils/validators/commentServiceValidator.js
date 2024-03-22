import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Comment from "../../models/Post.js";
export const getCommentsValidator = [
  check("post_id")
    .isMongoId()
    .withMessage("Invalid Post ID")
    .custom(async postId => {
      const post = await Comment.findOne({ _id: postId });
      if (!post) {
        throw new Error("There's no Post with this ID ?");
      }
    }),
  validatorMiddleware
];
export const getCommentValidator = [
  check("post_id")
    .isMongoId()
    .withMessage("Invalid Post ID")
    .custom(async postId => {
      const post = await Comment.findOne({ _id: postId });
      if (!post) {
        throw new Error("There's no Post with this ID ?");
      }
    }),
  check("comment_id").isMongoId().withMessage("Invalid comment ID"),
  validatorMiddleware
];

export const createCommentValidator = [
  check("content").notEmpty().withMessage("Content is required"),
  check("author")
    .notEmpty()
    .withMessage("Author is required")
    .isMongoId()
    .withMessage("Invalid Author ID "),
  check("post_id")
    .notEmpty()
    .withMessage("Post id is required")
    .isMongoId()
    .withMessage("Invalid Posr ID")
    .custom(async postId => {
      const post = await Comment.findOne({ _id: postId });
      if (!post) {
        throw new Error("There's no Post with this ID ?");
      }
    }),

  validatorMiddleware
];
export const updateCommentValidator = [
  check("content").notEmpty().withMessage("Content is required"),

  check("post_id")
    .notEmpty()
    .withMessage("Post id is required")
    .isMongoId()
    .withMessage("Invalid Posr ID")
    .custom(async postId => {
      const post = await Comment.findOne({ _id: postId });
      if (!post) {
        throw new Error("There's no Post with this ID ?");
      }
    }),
  validatorMiddleware
];
export const deleteCommentValidator = [
  check("comment_id").isMongoId().withMessage("Invalid comment id"),
  check("post_id").custom(async postId => {
    const post = await Comment.findOne({ _id: postId });
    if (!post) {
      throw new Error("There's no Post with this ID ?");
    }
  }),
  validatorMiddleware
];
