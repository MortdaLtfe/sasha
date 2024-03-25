import Reply from "../models/Reply.js";
import asyncHandler from "express-async-handler";
export const getReplies = asyncHandler(async (req, res) => {
  const page = req.query.page <= 0 ? 1 : req.query.page;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const { comment_id } = req.params;
  const results = await Reply.find({ commentId: comment_id })
    .skip(skip)
    .limit(limit);
  return res.json({
    page: parseInt(page) || 1,
    length: results.length,
    results
  });
});
export const getReply = asyncHandler(async (req, res) => {
  const { reply_id, comment_id } = req.params;
  const results = await Reply.findOne({ _id: reply_id });
  return res.json({ results });
});
export const createReply = asyncHandler(async (req, res) => {
  const { comment_id } = req.params;
  const data = req.body;
  const reply = await Reply.create({
    content: data.content,
    author: req.token.userInfo.uid,
    commentId: comment_id
  });
  return res.status(201).json({ reply });
});
export const updateReply = asyncHandler(async (req, res) => {
  const { reply_id } = req.params;
  const { content } = req.body;
  const reply = await Reply.findOneAndUpdate(
    { _id: reply_id },
    { content },
    { new: true }
  );
  return res.json(reply);
});
export const deleteReply = asyncHandler(async (req, res) => {
  const { reply_id } = req.params;
  const reply = await Reply.findOneAndDelete({ _id: reply_id });
  return res.json({ reply });
});
