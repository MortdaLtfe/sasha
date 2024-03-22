import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
