import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Comment from "../../models/Comment.js";
import Reply from "../../models/Reply.js";
export const getRepliesValidator = [
  check("comment_id")
    .isMongoId()
    .withMessage("Invalid Comment ID")
    .custom(async commentId => {
      const comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        throw new Error("There's no Comment with this ID ?");
      }
    }),
  validatorMiddleware
];
export const getReplyValidator = [
  check("comment_id")
    .isMongoId()
    .withMessage("Invalid Comment ID")
    .custom(async commentId => {
      const comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        throw new Error("There's no Comment with this ID ?");
      }
    }),
  check("reply_id").isMongoId().withMessage("Invalid Reply ID"),
  validatorMiddleware
];

export const createReplyValidator = [
  check("content").notEmpty().withMessage("Content is required"),
  check("comment_id")
    .notEmpty()
    .withMessage("Comment id is required")
    .isMongoId()
    .withMessage("Invalid Posr ID")
    .custom(async commentId => {
      const comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        throw new Error("There's no Comment with this ID ?");
      }
    }),

  validatorMiddleware
];
export const updateReplyValidator = [
  check("content").notEmpty().withMessage("Content is required"),

  check("reply_id").custom(async (val, { req }) => {
    const reply = await Reply.findOne({ _id: val });
    console.log(Reply);
    console.log(req.token.userInfo.uid);
    if (req.token.userInfo.uid != Reply.author) {
      throw new Error("You're not allow to this route");
    }
  }),
  check("comment_id")
    .notEmpty()
    .withMessage("Comment id is required")
    .isMongoId()
    .withMessage("Invalid Posr ID")
    .custom(async commentId => {
      const comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        throw new Error("There's no Comment with this ID ?");
      }
    }),
  validatorMiddleware
];
export const deleteReplyValidator = [
  check("reply_id").isMongoId().withMessage("Invalid Reply id").custom(async (val, { req }) => {
      if (req.token.userInfo.uid != val && req.token.userInfo.role != "admin") {
        throw new Error("You're not allow to this route");
      }
    }),
  check("comment_id").custom(async commentId => {
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      throw new Error("There's no Comment with this ID ?");
    }
  }),
  validatorMiddleware
];
