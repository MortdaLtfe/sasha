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
  edited:{
    type: Boolean,
    default: false
  },

  images: [{ String }]
},{ timestamps: true });
PostSchema.pre("findOneAndUpdate", async function (next) {
  this.set({ edited: true });

  next();
});
const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
