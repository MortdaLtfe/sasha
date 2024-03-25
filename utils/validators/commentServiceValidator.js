import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
export const getCommentsValidator = [
  check("post_id")
    .isMongoId()
    .withMessage("Invalid Post ID")
    .custom(async postId => {
      const post = await Post.findOne({ _id: postId });
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
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        throw new Error("There's no Post with this ID ?");
      }
    }),
  check("comment_id").isMongoId().withMessage("Invalid comment ID"),
  validatorMiddleware
];

export const createCommentValidator = [
  check("content").notEmpty().withMessage("Content is required"),
  check("post_id")
    .notEmpty()
    .withMessage("Post id is required")
    .isMongoId()
    .withMessage("Invalid Posr ID")
    .custom(async postId => {
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        throw new Error("There's no Post with this ID ?");
      }
    }),

  validatorMiddleware
];
export const updateCommentValidator = [
  check("content").notEmpty().withMessage("Content is required"),

  check("comment_id").custom(async (val, { req }) => {
    const comment = await Comment.findOne({ _id: val });
    console.log(comment);
    console.log(req.token.userInfo.uid);
    if (req.token.userInfo.uid != comment.author) {
      throw new Error("You're not allow to this route");
    }
  }),
  check("post_id")
    .notEmpty()
    .withMessage("Post id is required")
    .isMongoId()
    .withMessage("Invalid Posr ID")
    .custom(async postId => {
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        throw new Error("There's no Post with this ID ?");
      }
    }),
  validatorMiddleware
];
export const deleteCommentValidator = [
  check("comment_id")
    .isMongoId()
    .withMessage("Invalid comment id")
    .custom(async (val, { req }) => {
      if (req.token.userInfo.uid != val && req.token.userInfo.role != "admin") {
        throw new Error("You're not allow to this route");
      }
    }),
  
  check("post_id").custom(async postId => {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      throw new Error("There's no Post with this ID ?");
    }
  }),
  validatorMiddleware
];
