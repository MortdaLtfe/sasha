import Comment from "../models/Comment.js";
import asyncHandler from "express-async-handler";
export const getComments = asyncHandler(async (req, res) => {
  const page = req.query.page <= 0 ? 1 : req.query.page;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const { post_id } = req.params;
  const results = await Comment.find({ postId: post_id })
    .skip(skip)
    .limit(limit);
  return res.json({
    page: parseInt(page) || 1,
    length: results.length,
    results
  });
});
export const getComment = asyncHandler(async (req, res) => {
  const { comment_id, post_id } = req.params;
  const results = await Comment.findOne({ _id: comment_id, postId: post_id });
  return res.json({ results });
});
export const createComment = asyncHandler(async (req, res) => {
  const { post_id } = req.params;
  const data = req.body;
  const comment = await Comment.create({
    content: data.content,
    author: data.author,
    postId: post_id
  });
  return res.status(201).json({ comment });
});
export const updateComment = asyncHandler(async (req, res) => {
  const { comment_id } = req.params;
  const { content } = req.body;
  const comment = await Comment.findOneAndUpdate(
    { _id: comment_id },
    { content },
    { new: true }
  );
  return res.json(post);
});
export const deleteComment = asyncHandler(async (req, res) => {
  const { comment_id } = req.params;
  const comment = await Comment.findOneAndDelete({ _id: comment_id });
  return res.json({ comment });
});
