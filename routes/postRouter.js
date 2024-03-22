import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addLikeToPost,
  deleteLike
} from "../services/postService.js";
import {
  getPostValidator,
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
  addLikeToPostValidator,
  deleteLikeValidator
} from "../utils/validators/postServiceValidator.js";
import commentRoutes from "./commentRouter.js";
const router = express.Router({ mergeParams: true });
router.use("/:post_id/comment", commentRoutes);
router.route("/").get(getPosts).post(createPostValidator, createPost);
router
  .route("/:post_id")
  .get(getPostValidator, getPost)
  .put(updatePostValidator, updatePost)
  .delete(deletePostValidator, deletePost);
router.route("/:post_id/likes").post(addLikeToPostValidator, addLikeToPost);
router
  .route("/:post_id/likes/:like_id")
  .delete(deleteLikeValidator, deleteLike);

export default router;
