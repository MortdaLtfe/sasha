import express from "express";
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} from "../services/commentService.js";
import {
  getReplies,
  getReply,
  createReply,
  updateReply,
  deleteReply
} from "../services/replyService.js";
import {
  getCommentsValidator,
  getCommentValidator,
  createCommentValidator,
  updateCommentValidator,
  deleteCommentValidator
} from "../utils/validators/commentServiceValidator.js";
import {
  getRepliesValidator,
  getReplyValidator,
  createReplyValidator,
  updateReplyValidator,
  deleteReplyValidator
} from "../utils/validators/replyServiceValidator.js";
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getCommentsValidator, getComments)
  .post(createCommentValidator, createComment);
router
  .route("/:comment_id")
  .get(getCommentValidator, getComment)
  .delete(deleteCommentValidator, deleteComment)
  .put(updateCommentValidator, updateComment);

router.route("/:comment_id/reply").get(getRepliesValidator,getReplies).post(createReplyValidator,createReply);
router
  .route("/:comment_id/reply/:reply_id")
  .get(getReplyValidator,getReply)
  .put(updateReplyValidator,updateReply)
  .delete(deleteReplyValidator,deleteReply);
export default router;
