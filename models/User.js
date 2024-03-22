import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  name: {
    type: String,
    required: true,
    maxLength: 30
  },
  bio: {
    type: String,
    maxLength: 300,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
