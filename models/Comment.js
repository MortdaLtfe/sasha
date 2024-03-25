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
    ],
    edited: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

CommentSchema.pre("findOneAndUpdate", async function (next) {
  this.set({ edited: true });

  next();
});
const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
