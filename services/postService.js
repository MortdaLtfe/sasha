import Post from "../models/Post.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "express-async-handler";
/**
 * @desc   Get all Posts
 * @route  @GET /api/v1/post
 * @accses @Public
 **/
export const getPosts = asyncHandler(async (req, res) => {
  const page = req.query.page <= 0 ? 1 : req.query.page;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  const results = await Post.find().skip(skip).limit(limit);
  return res.json({
    page: parseInt(page) || 1,
    length: results.length,
    results
  });
});

/**
 * @desc   Get Spcefic Post
 * @route  @GET /api/v1/post/:post_id
 * @accses @Public
 **/

export const getPost = asyncHandler(async (req, res, next) => {
  const { post_id } = req.params;
  const results = await Post.findOne({ _id: post_id });
  return res.json(results);
});
/**
 * @desc   Create Post
 * @route  @POST /api/v1/post/
 * @accses @Public
 **/
export const createPost = asyncHandler(async (req, res, next) => {
  const { content, images } = req.body;
  const post = await Post.create({
    content,
    images,
    author: req.token.userInfo.uid
  });
  if (!post) return next(new ApiError("Cannot create This Post", 400));
  return res.status(201).json(post);
});

/**
 * @desc   Update Post
 * @route  @PUT /api/v1/post/:post_id
 * @accses @Public
 **/

export const updatePost = asyncHandler(async (req, res, next) => {
  const { post_id } = req.params;
  const { content, like } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id: post_id },
    {
      content
    },
    { new: true }
  );
  return res.json(post);
});

/**
 * @desc   Delete Post
 * @route  @PUT /api/v1/post/:post_id
 * @accses @Private [User, Admin]
 **/
export const deletePost = asyncHandler(async (req, res, next) => {
  const { post_id } = req.params;
  const post = await Post.findOneAndDelete({ _id: post_id });
  return res.json(post);
});
/**
 * @desc   Add Like to post
 * @route  @POST /api/v1/post/:post_id/likes
 * @accses @Public
 **/
export const addLikeToPost = asyncHandler(async (req, res, next) => {
  const { like } = req.body;
  const { post_id } = req.params;
  const post = await Post.findOneAndUpdate(
    { _id: post_id },
    { $push: { likes: like } },
    { new: true }
  );
  if (!post) return next(new ApiError("unable to like this post", 404));
  return res.status(201).json(post);
});

/**
 * @desc   Delete Like
 * @route  @POST /api/v1/post/:post_id/likes/:like_id
 * @accses @Private [User]
 **/
export const deleteLike = asyncHandler(async (req, res, next) => {
  const { post_id, like_id } = req.params;

  const post = await Post.findOneAndUpdate(
    { _id: post_id },
    { $pull: { likes: like_id } },
    { new: true }
  );
  return res.json(post);
});
