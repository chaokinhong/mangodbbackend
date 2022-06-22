import mongoose from "mongoose";

// schema = specific each post request is going to have this things
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String], // an array of string,
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage