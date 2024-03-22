import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    
    type: mongoose.Schema.ObjectId,
    required: true,
  ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ],

  images: [{ String }]
},{ timestamps: true });

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
