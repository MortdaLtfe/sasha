import mongoose from "mongoose";
const ReplySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    commentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    edited: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

ReplySchema.pre("findOneAndUpdate", async function (next) {
  this.set({ edited: true });

  next();
});
const ReplyModel = mongoose.model("Reply", ReplySchema);

export default ReplyModel;
