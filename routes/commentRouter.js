import express from "express";
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} from "../services/commentService.js";
import {
  getCommentsValidator,
  getCommentValidator,
  createCommentValidator,
  updateCommentValidator,
  deleteCommentValidator
} from "../utils/validators/commentServiceValidator.js";
const router = express.Router({ mergeParams: true });

router.route("/").get(getCommentsValidator,getComments).post(createCommentValidator,createComment);
router
  .route("/:comment_id")
  .get(getCommentValidator,getComment)
  .delete(deleteCommentValidator,deleteComment)
  .put(updateCommentValidator,updateComment);

export default router;
