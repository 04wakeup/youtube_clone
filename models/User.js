import mongoose from "mongoose";
import passportLocalMonoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, // put the id of comment
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId, // put the id of comment
      ref: "Video",
    },
  ],
});

UserSchema.plugin(passportLocalMonoose, { usernameField: "email" });
const model = mongoose.model("User", UserSchema);

export default model;
